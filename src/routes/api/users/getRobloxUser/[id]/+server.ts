import { getRobloxUser } from '$lib/users/getRobloxUser';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const username = await getRobloxUser(params.id);

	if (!username) return json({ error: 'Error while getting roblox user' }, { status: 400 });

	return json({ username });
};
