import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/db';
import { compare, hash } from 'bcrypt';

export const actions: Actions = {
	change: async ({ request, locals }) => {
		const user = locals.user;

		if (!user) return fail(401, { error: 'Unauthorized' });

		const formData = await request.formData();

		const oldPassword = formData.get('password') as string | null;
		const newPassword = formData.get('new') as string | null;

		if (!oldPassword || !newPassword) return fail(400, { error: 'Missing field(s)' });

		const userDb = await db.orm.public.User.where((u) => u.id.eq(user.id)).first();
		if (!userDb) return fail(400, { error: "User doesn't exist in DB" });

		const isPasswordCorrect = await compare(oldPassword, userDb.passwordHash);
		if (!isPasswordCorrect) return fail(400, { error: 'Old password is incorrect' });

		if (oldPassword === newPassword)
			return fail(400, { error: "Old and new password can't be the same" });

		await db.orm.public.User.where((u) => u.id.eq(user.id)).update({
			passwordHash: await hash(newPassword, 10)
		});

		return { message: 'Password changed' };
	}
};
