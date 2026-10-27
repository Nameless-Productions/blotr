<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
	let user = $derived(data.user);
</script>

<p class="text-xl font-bold">{user.discordUsername} #{user.id}</p>
<p class="text-sm">
	Role: {user.role.toLowerCase()}
	<br />
	Discord ID: {user.discordId}
	<br />
	Roblox Username:
	<a class="link" href={`https://www.roblox.com/users/${user.robloxId}/profile`}
		>{user.robloxUsername}</a
	>
	<br />
	Roblox ID: {user.robloxId}
	<br />
	Note: Your Roblox and Discord can be only changed by an administrator
</p>

<br />

<a href={resolve('/me/change')} class="link font-bold">Change password</a>
