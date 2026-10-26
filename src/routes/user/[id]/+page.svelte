<script lang="ts">
	import LogList from '$lib/components/LogList.svelte';

	let { data } = $props();
</script>

<div class="flex flex-wrap rounded-xl border border-gray-400 p-2">
	<p class="text-xl font-bold">{data.user.discordUsername}</p>
	<p class="ml-auto rounded-full bg-amber-600 p-0.5">{data.user.role.toLowerCase()}</p>
	<p class="order-last basis-full">#{data.user.id}</p>
</div>
<br />
<div
	class="grid space-y-3 rounded-xl border border-gray-400 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
>
	<div>
		<p class="font-bold">Roblox</p>
		<a href={`https://roblox.com/users/${data.user.robloxId}`} class="link"
			>{data.user.robloxUsername}</a
		>
	</div>
	<div>
		<p class="font-bold">Discord</p>
		<p>{data.user.discordUsername}</p>
	</div>
	<div>
		<p class="font-bold">Command count</p>
		<p>{data.logCount.toString()}</p>
	</div>
</div>
<br />
<div class="rounded-xl border border-gray-400 p-2">
	<p class="font-bold">Recent logs</p>
	<LogList logs={data.logs} />
</div>
