<script lang="ts">
	import { resolve } from '$app/paths';

	let {
		user
	}: {
		user?: {
			id: number;
			robloxId: string;
			discordId: string;
			robloxUsername: string;
			discordUsername: string;
			role: 'USER' | 'MODERATOR' | 'ADMINISTRATOR' | 'OWNER';
		};
	} = $props();
</script>

<nav class="border-b-2 border-b-neutral-300">
	<div class="m-2">
		<a class="text-2xl font-bold hover:font-normal" href={resolve('/')}>Blotr</a>
		{#if user}
			<a class="font-bold hover:font-normal" href={resolve('/dashboard')}>Dashboard</a>
		{/if}
	</div>
</nav>
