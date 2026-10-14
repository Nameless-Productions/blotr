<script lang="ts">
	import { onMount } from 'svelte';

	interface Log {
		command: string;
		id: number;
		robloxUserId: string;
		timestamp: number;
		userId: number | null;
	}

	let logs: Log[] = $state([]);
	let page: number = $state(0);
	let loading = $state(false);

	async function loadPage(p: number) {
		try {
			loading = true;
			const res = await fetch(`/dashboard/logs/json?page=${p}`);
			if (!res.ok) return console.error(res.status);

			const json = (await res.json()) as { logs: Log[] };
			const l = json.logs;
			if (l.length === 0) {
				loading = false;
				return;
			}
			logs = [...logs, ...l];
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadPage(0);
	});

	function loadMore() {
		page++;
		loadPage(page);
	}
</script>

<p class="text-xl font-bold">Logs</p>

{#each logs as log (log.id)}
	<div>
		<p>Log #{log.id}</p>
		<p>{log.command}</p>
		<p>{new Date(log.timestamp * 1000).toLocaleString()}</p>
		<a
			target="_blank"
			class="link"
			href={`https://www.roblox.com/users/${log.robloxUserId}/profile`}>Roblox user</a
		>
	</div>
	<br />
{/each}

<button onclick={loadMore} disabled={loading} class="link">
	{loading ? 'Loading' : 'Load more'}
</button>
