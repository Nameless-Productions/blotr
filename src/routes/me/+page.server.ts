import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = locals.user;

	if (!user) return redirect(303, new URL('/login', url));

	return { user };
};
