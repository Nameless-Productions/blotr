import { db } from '$lib/db';
import { createToken } from '$lib/jwt';
import { compare } from 'bcrypt';

export async function login(userId: number, password: string) {
	const userDB = await db.orm.public.User.where((u) => u.id.eq(userId)).first();
	if (!userDB) throw new Error('User not found');

	const correctPassword = await compare(password, userDB.passwordHash);
	if (!correctPassword) throw new Error('Incorrect password');

	const jwtToken = await createToken(userId);

	return jwtToken;
}
