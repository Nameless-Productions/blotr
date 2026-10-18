import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { runCommand } from '$lib/erlc/runCommand';

export const actions: Actions = {
	command: async ({ request, locals }) => {
		if (!locals.user) return redirect(303, new URL('/login', request.url));
		if (locals.user.role !== 'ADMINISTRATOR' && locals.user.role !== 'OWNER')
			return fail(403, { error: "You don't have permissions for this" });

		const formData = await request.formData();

		const command = formData.get('command') as string | null;
		if (!command) return fail(400, { error: 'No command' });

		await runCommand(command);

		return { message: 'Ran command' };
	}
};
