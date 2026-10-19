import { Cron } from 'croner';
import { getServerInfo } from './lib/erlc/getServerInfo';
import { db } from './lib/db';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/jwt';
import { getUser } from '$lib/users/getUser';

new Cron('*/5 * * * * *', async () => {
	if (process.env.DEBUG === 'true') console.log('Running cron job');

	const logs = await getServerInfo({
		CommandLogs: true,
		ModCalls: true,
		Players: true,
		Vehicles: true
	});

	if (!logs) return;

	if (!logs.CommandLogs || !logs.ModCalls || !logs.Players || !logs.Vehicles)
		return console.warn('API responded with missing things');

	const last100Logs = logs.CommandLogs.slice(0, 100);

	for (const commandLog of last100Logs) {
		const commandDB = await db.orm.public.CommandLog.where((l) =>
			l.timestamp.eq(commandLog.Timestamp)
		).all();
		if (commandDB.length == 1) continue;

		if (process.env.DEBUG === 'true') console.log('Adding log to db: ', commandLog);

		const robloxId = commandLog.Player.split(':')[1];

		let userId: number | null = null;

		const user = await db.orm.public.User.where((u) => u.robloxID.eq(robloxId)).first();

		if (user) userId = user.id;

		await db.orm.public.CommandLog.create({
			robloxUserId: robloxId,
			timestamp: commandLog.Timestamp,
			command: commandLog.Command,
			userId
		});
	}

	await db.orm.public.Player.where({}).deleteAll();

	await db.orm.public.Player.createAll(
		logs.Players.map((player) => ({
			robloxId: player.Player.split(':')[1],
			robloxUsername: player.Player.split(':')[0],
			team: player.Team,
			Callsign: player.Callsign,
			Permissions: player.Permission,
			WantedStars: player.WantedStars,
			location: {
				X: player.Location.LocationX,
				Z: player.Location.LocationZ,
				PostalCode: player.Location.PostalCode,
				StreetName: player.Location.StreetName,
				BuildingNumber: player.Location.StreetName
			}
		}))
	);

	await db.orm.public.Vehicle.where({}).deleteAll();

	await db.orm.public.Vehicle.createAll(
		logs.Vehicles.map((vehicle) => ({
			Name: vehicle.Name,
			Owner: vehicle.Owner,
			Plate: vehicle.Plate,
			Texture: vehicle.Texture,
			ColorHex: vehicle.ColorHex,
			ColorName: vehicle.ColorName
		}))
	);
});

async function getUsr(token: string) {
	const uid = await verifyToken(token);
	if (!uid) return;

	const user = await getUser(uid);
	if (!user) return;
	return user;
}

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';

	const isPublic = pathname.startsWith('/login') || pathname === '/';
	const isModPage =
		pathname.startsWith('/dashboard/logs') ||
		pathname.startsWith('/dashboard/shifts') ||
		pathname.startsWith('/dashboard/moderation');
	const isAdminPage = pathname.startsWith('/dashboard/admin');

	let isAuthed = false;

	const token = event.cookies.get('token');
	if (token) {
		const user = await getUsr(token);
		if (user) {
			isAuthed = true;
			event.locals.user = {
				id: user.id,
				robloxId: user.robloxId,
				discordId: user.discordId,
				robloxUsername: user.robloxUsername,
				discordUsername: user.discordUsername,
				role: user.role
			};
		}
	}

	const userCount = (await db.orm.public.User.all()).length;
	if (userCount === 0) {
		if (pathname.startsWith('/setup')) return await resolve(event);

		return redirect(303, new URL('/setup', event.url));
	}
	if (pathname.startsWith('/setup')) return error(403, { message: 'Already set up' });

	if (isPublic) return await resolve(event);
	if (isModPage) {
		if (event.locals.user?.role !== 'USER') return await resolve(event);
		return error(403);
	}
	if (isAdminPage) {
		if (event.locals.user?.role === 'ADMINISTRATOR' || event.locals.user?.role === 'OWNER')
			return await resolve(event);
		return error(403);
	}

	if (!isAuthed) return redirect(303, new URL('/login', event.url));

	return await resolve(event);
};
