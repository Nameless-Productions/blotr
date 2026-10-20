import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
	cookies.delete('token', { path: '/' });

	return redirect(303, new URL('/login', url));
};
