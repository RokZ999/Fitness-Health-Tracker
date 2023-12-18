<script>
  import { goto } from '$app/navigation';
  
  function handleLogin() {
    goto('/login');
  }

  function handleRegister() {
    goto('/register');
  }
</script>


<div class="flex items-center justify-center h-screen">
  <div class="card p-4 max-w-sm mx-auto">
    <div class="flex flex-col items-center">
      <button class="btn variant-filled-primary mt-2" on:click={handleLogin}>
        Login
      </button>
      <button class="btn variant-filled-tertiary mt-2" on:click={handleRegister}>
        Register
      </button>
    </div>
  </div>
</div>