<script>
	import { enhance } from '$app/forms';
</script>

<div class="text-center">
	<p class="text-2xl font-bold">Set Up Blotr</p>
	<p>Create the owner account</p>

	<form action="?/setup" method="post" use:enhance>
		<input type="text" class="input" placeholder="Roblox ID" name="roblox" required />
		<br />
		<input type="text" class="input" placeholder="Discord ID" name="discord" required />
		<br />
		<input type="password" class="input" placeholder="Password" name="password" />
		<br />
		<input type="submit" class="button" value="Set up" />
	</form>
</div>
