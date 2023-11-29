<div class="flex justify-center">
  <form
    class="flex gap-4 items-center w-full p-4"
    action="?/add"
    method="post"
  >

  <div class="flex-1">
    <label class="label block mb-2">
      <span>Height:</span>
      <input
        class="input form-input"
        type="number"
        name="height"
        placeholder="Height"
      />
    </label>
  </div>
  
    <div class="flex-1">
      <label class="label block mb-2">
        <span>Weight:</span>
        <input
          class="input form-input"
          type="number"
          name="weight"
          placeholder="Weight"
        />
      </label>
    </div>



    <button type="submit" class="btn variant-filled-primary -mb-4"
      >Add height</button
    >
  </form>
</div>
