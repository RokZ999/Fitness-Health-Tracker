<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<div class="flex items-center justify-center h-screen">
    <div class="card p-4">
        <form method="POST" class="form" use:enhance>
            <label class="label">
                <span>Email</span>
                <input
                    class="input"
                    type="email"
                    name="email"
                    placeholder="email"
                />
            </label>

            <label class="label">
                <span>Password</span>
                <input
                    class="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </label>

            <div class="flex justify-between mt-3">
                <span></span>
                <!-- Empty span for spacing -->
                <a href="/register" class="underline text-right">Register</a>
            </div>

            <div class="flex justify-center mt-3">
                {#if form?.errMsg}
                    <b class="text-red-600">{form?.errMsg}</b>
                {/if}
            </div>

            <div class="flex justify-center mt-4">
                <button class="btn variant-filled">Log in</button>
            </div>
        </form>
    </div>
</div>
