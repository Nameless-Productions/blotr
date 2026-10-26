import { db } from '$lib/db';

/**
 * get 100 logs
 * @param skip pages to skip
 * @returns 100 logs
 */
export async function getLogs(skip: number = 0) {
	const logs = await db.orm.public.CommandLog.orderBy((p) => p.timestamp.desc())
		.limit(100)
		.offset(skip * 100)
		.all();

	return logs;
}
