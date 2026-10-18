<script lang="ts">
	let { data } = $props();
</script>

{#if data.user?.role === 'ADMINISTRATOR' || data.user?.role === 'OWNER'}
	<p class="text-xl font-bold">Administrator panel</p>

	<p class="font-bold">Run command</p>
	<form action="?/command" method="post">
		<input type="text" name="command" placeholder=":h Hello, World!" class="input" required />
		<input type="submit" class="button" value="Run Command" />
	</form>
{/if}
