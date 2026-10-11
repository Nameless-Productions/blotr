import { createUser } from '$lib/users/createUser';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	setup: async ({ request }) => {
		const formData = await request.formData();

		const robloxId = formData.get('roblox') as string | null;
		const discordId = formData.get('discord') as string | null;
		const password = formData.get('password') as string | null;

		if (!robloxId || !discordId || !password) return fail(400, { error: 'Missing fields' });

		try {
			await createUser(password, robloxId, discordId, 'OWNER');
			return redirect(303, new URL('/login', request.url));
		} catch (err) {
			return await fail(400, { error: err });
		}
	}
};
