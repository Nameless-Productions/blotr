import { Cron } from 'croner';
import { getServerInfo } from './lib/erlc/getServerInfo';
import { db } from './lib/db';

new Cron('*/5 * * * * *', async () => {
	console.log('Running cron job');

	const logs = await getServerInfo({ CommandLogs: true, ModCalls: true, Players: true });

	if (!logs) return;

	if (!logs.CommandLogs || !logs.ModCalls || !logs.Players)
		return console.warn('API returned no command or mod call logs or players');

	for (const commandLog of logs.CommandLogs) {
		const commandDB = await db.orm.public.CommandLog.where((l) =>
			l.timestamp.eq(commandLog.Timestamp)
		).all();
		if (commandDB.length == 1) continue;

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
	for (const player of logs.Players) {
		await db.orm.public.Player.create({
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
		});
	}
});
