<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

{#if data.user?.role === 'ADMINISTRATOR' || data.user?.role === 'OWNER'}
	<p class="text-xl font-bold">Administrator panel</p>

	<p class="font-bold">Run command</p>
	<form action="?/command" method="post" use:enhance>
		<input type="text" name="command" placeholder=":h Hello, World!" class="input" required />
		<input type="submit" class="button" value="Run Command" />
	</form>

	{#if form && form.command}
		<br />
		{#if 'error' in form.command}
			<p class="text-red">{form.command.error}</p>
		{:else if 'message' in form.command}
			<p>{form.command.message}</p>
		{/if}
	{/if}

	<br />

	<p class="font-bold">Create User</p>

	<form action="?/create" method="post" use:enhance>
		<input type="text" class="input w-50" placeholder="Discord ID" name="discord" required />
		<br />
		<input type="text" class="input w-50" placeholder="Roblox ID" name="roblox" required />
		<br />
		<select name="role" class="input w-50">
			<option value="USER">User</option>
			<option value="MODERATOR">Moderator</option>
			{#if data.user.role === 'OWNER'}
				<option value="ADMINISTRATOR">Administrator</option>
			{/if}
		</select>
		<br />
		<input type="password" class="input w-50" placeholder="Password" name="password" required />
		<p class="text-sm text-gray-400">Note: The user will be able to change this</p>

		<input type="submit" value="Create User" class="button mt-2" />
	</form>
{/if}
