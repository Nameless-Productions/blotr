import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { runCommand } from '$lib/erlc/runCommand';
import { createUser } from '$lib/users/createUser';

export const actions: Actions = {
	command: async ({ request, locals }) => {
		if (!locals.user) return redirect(303, new URL('/login', request.url));
		if (locals.user.role !== 'ADMINISTRATOR' && locals.user.role !== 'OWNER')
			return fail(403, { command: { error: "You don't have permissions for this" } });

		const formData = await request.formData();

		const command = formData.get('command') as string | null;
		if (!command) return fail(400, { command: { error: 'No command' } });

		await runCommand(command);

		return { command: { message: 'Ran command' } };
	},

	create: async ({ request, locals }) => {
		if (!locals.user) return redirect(303, new URL('/login', request.url));
		if (locals.user.role !== 'ADMINISTRATOR' && locals.user.role !== 'OWNER')
			return fail(403, { create: { error: "You don't have permissions for this" } });

		const formData = await request.formData();

		const discordId = formData.get('discord') as string | null;
		const robloxId = formData.get('roblox') as string | null;
		const role = formData.get('role') as string | null;
		const password = formData.get('password') as string | null;
		if (!discordId || !robloxId || !role || !password)
			return fail(400, { create: { error: 'Missing field(s)' } });

		if (role !== 'USER' && role !== 'MODERATOR' && role !== 'ADMINISTRATOR')
			return fail(400, { create: { error: "Role doesn't exist" } });

		if (role === 'ADMINISTRATOR' && locals.user.role !== 'OWNER')
			return fail(403, { create: { error: "You don't have permissions to assign this role" } });

		try {
			await createUser(password, robloxId, discordId, role);
		} catch (err) {
			return fail(400, {
				create: { error: err instanceof Error ? err.message : 'Something went wrong' }
			});
		}

		return { create: { message: 'Created user!' } };
	}
};
