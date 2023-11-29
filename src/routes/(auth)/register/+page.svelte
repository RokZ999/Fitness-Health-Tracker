<div class="flex items-center justify-center h-screen">
    <div class="card p-4">
        <form method="POST" class="form">
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

            <label class="label">
                <span>Confirm password</span>
                <input
                    class="input"
                    type="password"
                    name="passwordConfirm"
                    placeholder="passwordConfirm"
                />
            </label>

            <div class="flex justify-between mt-3">
                <span></span>
                <a href="/login" class="underline text-right">Login</a>
            </div>

            <div class="flex justify-center mt-4">
                <button class="btn variant-filled">Register</button>
            </div>
        </form>
    </div>
</div>
