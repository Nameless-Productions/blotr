import { env } from '$env/dynamic/private';
import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(env.SECRET);

export async function createToken(uid: number) {
	const token = await new SignJWT({ uid })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(secret);

	return token;
}

export async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, secret);
		if (isNaN(Number(payload.uid))) return null;
		return Number(payload.uid);
	} catch {
		return null;
	}
}
