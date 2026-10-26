<script lang="ts">
	import { onMount } from 'svelte';
	import LogList from '$lib/components/LogList.svelte';
	import type { Log } from '$lib/types/log';

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
<br />

<LogList {logs} />

<button onclick={loadMore} disabled={loading} class="link">
	{loading ? 'Loading' : 'Load more'}
</button>
