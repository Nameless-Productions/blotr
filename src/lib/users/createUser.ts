import { db } from '$lib/db';
import { hash } from 'bcrypt';

export async function createUser(
	password: string,
	robloxId: string,
	discordId: string,
	role: 'USER' | 'MODERATOR' | 'ADMINISTRATOR'
) {
	if (await db.orm.public.User.where((u) => u.robloxID.eq(robloxId)))
		throw new Error('User with this Roblox ID already exists');
	if (await db.orm.public.User.where((u) => u.discordID.eq(discordId)))
		throw new Error('User with this Discord ID already exists');

	await db.orm.public.User.create({
		robloxID: robloxId,
		discordID: discordId,
		role,
		passwordHash: await hash(password, 10)
	});
}
