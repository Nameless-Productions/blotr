import { db } from '$lib/db';
import { getUser } from './getUser';

/**
 * update the usernames (Discord + Roblox) of all users, doesn't returns anything
 */
export async function updateUsernames() {
	const userIds = await db.orm.public.User.select('id').all();

	for (const userId of userIds) {
		const user = await getUser(userId.id);
		if (!user) continue;
		await db.orm.public.User.where((u) => u.id.eq(userId.id)).update({
			robloxUsername: user.robloxUsername,
			discordUsername: user.discordUsername
		});
	}
}
