<script lang="ts">
	import type { Log } from '$lib/types/log';

	let { logs }: { logs: Log[] } = $props();
</script>

<div class="grid space-y-3 space-x-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
	{#each data.logs.reverse() as log (log.id)}
		<div class="rounded-xl border border-gray-400 p-2">
			<p>#{log.id}</p>
			<p>{log.command}</p>
			<p>{new Date(log.timestamp * 1000).toLocaleString()}</p>
		</div>
	{/each}
</div>
