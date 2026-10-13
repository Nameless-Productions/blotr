import { getLogs } from '$lib/erlc/getLogs';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const page = Number(params.get('page') ?? 0);
	if (isNaN(page))
		return new Response(JSON.stringify({ error: 'Page is not a number' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});

	const logs = await getLogs(page);

	return new Response(
		JSON.stringify({
			logs
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
