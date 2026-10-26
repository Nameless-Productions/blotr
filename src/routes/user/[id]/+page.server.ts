import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUser } from '$lib/users/getUser';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	if (isNaN(Number(params.id))) return error(400, { message: 'User ID is not a number' });

	const user = await getUser(Number(params.id));

	if (!user) return error(404, { message: 'User not found' });

	const userLogs = await db.orm.public.CommandLog.where((l) => l.userId.eq(user.id))
		.limit(50)
		.all();
	const logCount = (await db.orm.public.CommandLog.where((l) => l.userId.eq(user.id)).all()).length;

	return { user, logs: userLogs, logCount };
};
