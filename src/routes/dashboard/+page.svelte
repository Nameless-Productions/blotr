<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

{#if data.user}
	<p class="text-xl font-bold">Welcome, {data.user.discordUsername}!</p>
	<p>Role: {data.user.role.toLowerCase()}</p>
	<p>Roblox username: {data.user.robloxUsername}</p>
	<br />

	<div class="grid gap-3 text-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
		{#if data.user.role !== 'USER'}
			<a href={resolve('/dashboard/logs')} class="button">Logs</a>
			<a href={resolve('/dashboard/shifts')} class="button">Shifts</a>
			<a href={resolve('/dashboard/moderaion')} class="button">Moderation panel</a>
		{/if}
		{#if data.user.role === 'ADMINISTRATOR' || data.user.role === 'OWNER'}
			<a href={resolve('/dashboard/admin')} class="button">Administrator panel</a>
		{/if}
	</div>
{/if}
