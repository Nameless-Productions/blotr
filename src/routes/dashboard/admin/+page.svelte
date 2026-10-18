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
{/if}
