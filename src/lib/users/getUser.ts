import { db } from '$lib/db';
import { env } from '$env/dynamic/private';

export async function getUser(userId: number) {
	if (!env.DISCORD_TOKEN) throw new Error('No DISCORD_TOKEN in env');

	const userDB = await db.orm.public.User.where((u) => u.id.eq(userId)).first();
	if (!userDB) {
		console.warn('[getUser] User not found in DB:', userId);
		return;
	}

	const discordUrl = new URL(`/api/v10/users/${userDB.discordID}`, 'https://discord.com');

	const discordRes = await fetch(discordUrl, {
		headers: {
			Authorization: `Bot ${env.DISCORD_TOKEN}`
		}
	});
	if (!discordRes.ok) {
		console.warn('[getUser] Discord API failed:', discordRes.status, await discordRes.text());
		return;
	}
	const discordJson = await discordRes.json();
	if (!discordJson.username) {
		console.warn('[getUser] Discord user has no username:', discordJson);
		return;
	}
	const discordUsername = discordJson.username;

	const robloxUrl = new URL(`/v1/users/${userDB.robloxID}`, 'https://users.roblox.com');
	const robloxRes = await fetch(robloxUrl);

	if (!robloxRes.ok) {
		console.warn('[getUser] Roblox API failed:', robloxRes.status, await robloxRes.text());
		return;
	}
	const robloxJson = await robloxRes.json();
	if (!robloxJson.name) {
		console.warn('[getUser] Roblox user has no name:', robloxJson);
		return;
	}
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
