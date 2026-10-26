<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Log } from '$lib/types/log';

	let { logs }: { logs: Log[] } = $props();
</script>

<div class="grid space-y-3 space-x-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
	{#each logs as log (log.id)}
		<div class="rounded-xl border border-gray-400 p-2">
			<p>#{log.id}</p>
			<p>{log.command}</p>
			<p>{new Date(log.timestamp * 1000).toLocaleString()}</p>
			<a
				target="_blank"
				class="link"
				href={`https://www.roblox.com/users/${log.robloxUserId}/profile`}>{log.robloxUsername}</a
			>
			{#if log.userId}
				<br />
				<a target="_blank" class="link" href={resolve(`/user/${log.userId}`)}
					>User ID: {log.userId}</a
				>
			{:else}
				<p>No Blotr user</p>
			{/if}
		</div>
	{/each}
</div>
