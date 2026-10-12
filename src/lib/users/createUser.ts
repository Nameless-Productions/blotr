import { db } from '$lib/db';
import { hash } from 'bcrypt';
import { env } from '$env/dynamic/private';

export async function createUser(
	password: string,
	robloxId: string,
	discordId: string,
	role: 'USER' | 'MODERATOR' | 'ADMINISTRATOR' | 'OWNER'
) {
	if (!env.DISCORD_TOKEN) throw new Error('No DISCORD_TOKEN in env');

	if (await db.orm.public.User.where((u) => u.robloxID.eq(robloxId)).first())
		throw new Error('User with this Roblox ID already exists');
	if (await db.orm.public.User.where((u) => u.discordID.eq(discordId)).first())
		throw new Error('User with this Discord ID already exists');

	const discordUrl = new URL(`/api/v10/users/${discordId}`, 'https://discord.com');

	const discordRes = await fetch(discordUrl, {
		headers: {
			Authorization: `Bot ${env.DISCORD_TOKEN}`
		}
	});
	if (!discordRes.ok) throw new Error("Discord user doesn't exists");

	const robloxUrl = new URL(`/v1/users/${robloxId}`, 'https://users.roblox.com');
	const robloxRes = await fetch(robloxUrl);

	if (!robloxRes.ok) throw new Error("Roblox user doesn't exists");

	await db.orm.public.User.create({
		robloxID: robloxId,
		discordID: discordId,
		role,
		passwordHash: await hash(password, 10)
	});
}
