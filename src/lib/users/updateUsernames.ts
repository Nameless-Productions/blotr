import { db } from '$lib/db';
import { getUser } from './getUser';
import { env } from '$env/dynamic/private';

/**
 * update the usernames (Discord + Roblox) of all users, doesn't returns anything
 */
export async function updateUsernames() {
	const debug = env.DEBUG === 'true';

	const userIds = await db.orm.public.User.select('id').all();
	if (debug) console.log(`Updating usernames for ${userIds.length} users`);

	for (const userId of userIds) {
		if (debug) console.log(`Updating username for ${userId.id}`);
		const user = await getUser(userId.id);
		if (!user) continue;
		await db.orm.public.User.where((u) => u.id.eq(userId.id)).update({
			robloxUsername: user.robloxUsername,
			discordUsername: user.discordUsername
		});

		await new Promise<void>((resolve) => setTimeout(resolve, 1000));
	}
}
