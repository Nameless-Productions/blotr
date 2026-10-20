import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { login } from '$lib/users/login';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();

		const userId = formData.get('id') as number | null;
		const password = formData.get('password') as string | null;

		if (!userId || !password) return fail(400, { error: 'Missing field(s)' });
		if (isNaN(userId)) return fail(400, { error: 'User ID is not a number' });

		try {
			const token = await login(userId, password);

			cookies.set('token', token, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				httpOnly: true,
				sameSite: 'lax'
			});
		} catch (err) {
			return await fail(400, {
				error: err instanceof Error ? err.message : 'Something went wrong'
			});
		}
		return redirect(303, new URL('/dashboard', request.url));
	}
};
