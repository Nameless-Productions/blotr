<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="text-center">
	<p class="text-2xl font-bold">Log in</p>
	<p>Log in with credentials prodived by an administrator</p>

	<form action="?/login" method="post" use:enhance>
		<input type="text" class="input" placeholder="User ID" name="id" required />
		<br />
		<input type="password" class="input" placeholder="Password" name="password" required />
		<br />
		<input type="submit" class="button" value="Log in" />
	</form>

	{#if form?.error}
		<br />
		<p class="text-red-500">{form.error}</p>
	{/if}
</div>
