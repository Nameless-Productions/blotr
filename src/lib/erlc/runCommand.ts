import { env } from '$env/dynamic/private';

export async function runCommand(command: string) {
	if (!env.SERVER_KEY) throw new Error('No SERVER_KEY in env');

	let res: Response | undefined;

	try {
		res = await fetch(new URL('/v1/server/command', 'https://api.erlc.gg'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'server-key': env.SERVER_KEY
			},
			body: JSON.stringify({
				command: command
			})
		});
	} catch (err) {
		console.warn('Error while sending request: ', err);
		return;
	}

	if (!res.ok) console.warn('Run command responded with ', res.status);
}
