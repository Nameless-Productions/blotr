<script lang="ts">
	let show = $state(false);
</script>

<form action="?/change" method="post" class="mx-auto w-fit rounded-xl border p-2">
	<p class="text-center text-xl font-bold">Change Password</p>

	<input type="password" name="password" placeholder="Old password" class="input" required />
	<br />

	<input
		type={show ? 'text' : 'password'}
		name="new"
		placeholder="New Password"
		class="input"
		required
	/>
	<br />

	<button type="button" onclick={() => (show = !show)} class="mx-auto block cursor-pointer">
		<img src={show ? '/notshow.svg' : '/show.svg'} alt="Show" width="30" height="30" />
	</button>

	<input type="submit" value="Change password" class="button mx-auto block" />
</form>
