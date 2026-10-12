<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import './layout.css';

	let { children, data } = $props();
</script>

<svelte:head><title>Blotr</title></svelte:head>

<Navbar user={data.user} />
<main class="m-2">
	{@render children()}
</main>
