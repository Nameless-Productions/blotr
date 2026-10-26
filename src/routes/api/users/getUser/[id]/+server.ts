import { getUser } from '$lib/users/getUser';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const user = await getUser(Number(params.id));
	if (!user) return json({ error: 'Error while getting user' }, { status: 400 });

	return json({ user });
};
