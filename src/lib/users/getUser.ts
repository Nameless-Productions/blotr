import { db } from '$lib/db';
import { env } from '$env/dynamic/private';

export async function getUser(userId: number) {
	if (!env.DISCORD_TOKEN) throw new Error('No DISCORD_TOKEN in env');

	const userDB = await db.orm.public.User.where((u) => u.id.eq(userId)).first();
	if (!userDB) return;

	const discordUrl = new URL(`/api/v10/users/${userDB.discordID}`, 'https://discord.com');

	const discordRes = await fetch(discordUrl, {
		headers: {
			Authorization: `Bot ${env.DISCORD_TOKEN}`
		}
	});
	if (!discordRes.ok) return;
	const discordJson = await discordRes.json();
	if (!discordJson.username) return;
	const discordUsername = discordJson.username;

	const robloxUrl = new URL(`/v1/users/${userDB.robloxID}`, 'https://users.roblox.com');
	const robloxRes = await fetch(robloxUrl);

	if (!robloxRes.ok) return;
	const robloxJson = await robloxRes.json();
	if (!robloxJson.name) return;
	const robloxUsername = robloxJson.name;

	return {
		robloxId: userDB.robloxID,
		discordId: userDB.discordID,
		robloxUsername,
		discordUsername,
		id: userDB.id,
		role: userDB.role
	};
}
