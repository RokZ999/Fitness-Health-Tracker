<script lang="ts">
  import {
    Table,
    tableMapperValues,
  } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
    import { writable } from "svelte/store";
    import 'iconify-icon'
    import MealAddForm from "$lib/Components/MealAddForm.svelte";

  export let data: PageData;

  const entityData = writable(data.meals ?? []);

  $: {
  totalCalories = 0;
  if ($entityData) {
    $entityData.forEach(entity => {
      totalCalories += parseInt(entity.calories) || 0;
    });
  }
}


  let totalCalories = 5;
  

  $: tableSource = {
    head: ["Exercise Name", "Description", "Delete"],
    body: $entityData.map((entity) => [
      entity.meal_name,
      entity.calories,
      '<iconify-icon icon="material-symbols:delete"></iconify-icon>',
    ]),
    meta: tableMapperValues($entityData, [
      "id",
      "exercise_name",
      "exercise_description",
      "created",
    ]),
    foot: [
      `Total Calories <code class="code">${totalCalories}</code>`
    ],
  };

  const deleteExercise = async (rowMetaData: any) => {
    const id = rowMetaData.detail[0];
    try {
      const response = await fetch('?/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ key: id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Exercise deleted successfully');


      entityData.update(currentData => {
        return currentData.filter(entity => entity.id !== id);
      });

    } catch (error) {
      console.error('Failed to delete exercise:', error);
    }

  };


</script>

<MealAddForm/>


<div class="justify-center">
  <div class="card p-4 m-4">
    <Table
      source={tableSource}
      interactive={true}
      regionHeadCell="text-center align-middle"
      regionCell="text-center align-middle"
      on:selected={deleteExercise}
    />
  </div>
</div>






