<div class="flex justify-center">
  <form
    class="flex gap-4 items-center w-full p-4"
    action="?/add"
    method="post"
  >
    <div class="flex-1">
      <label class="label block mb-2">
        <span>Meal name:</span>
        <input
          class="input form-input"
          type="text"
          name="meal"
          placeholder="Meal Name"
        />
      </label>
    </div>

    <div class="flex-1">
      <label class="label block mb-2">
        <span>Calories:</span>
        <input
          class="input form-input"
          type="text"
          name="calories"
          placeholder="Calories"
        />
      </label>
    </div>

    <button type="submit" class="btn variant-filled-primary -mb-4"
      >Add exercise</button
    >
  </form>
</div>
