/**
 * get a roblox user by id
 * @param id roblox id
 * @returns roblox username
 */
export async function getRobloxUser(id: string) {
	const robloxUrl = new URL(`/v1/users/${id}`, 'https://users.roblox.com');
	const robloxRes = await fetch(robloxUrl);

	if (!robloxRes.ok) return;
	const robloxJson = await robloxRes.json();
	if (!robloxJson.name) return;

	const robloxUsername = robloxJson.name;
	return robloxUsername as string;
}
