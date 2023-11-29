<div class="flex justify-center">
  <form
    class="flex gap-4 items-center w-full p-4"
    action="?/add"
    method="post"
  >
    <div class="flex-1">
      <label class="label block mb-2">
        <span>Exercise:</span>
        <input
          class="input form-input"
          type="text"
          name="exercise"
          placeholder="Exercise Name"
        />
      </label>
    </div>

    <div class="flex-1">
      <label class="label block mb-2">
        <span>Description:</span>
        <input
          class="input form-input"
          type="text"
          name="description"
          placeholder="Description"
        />
      </label>
    </div>

    <button type="submit" class="btn variant-filled-primary -mb-4"
      >Add exercise</button
    >
  </form>
</div>
