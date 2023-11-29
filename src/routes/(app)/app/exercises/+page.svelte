<script lang="ts">
  import {
    Table,
    tableMapperValues,
  } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
    import { writable } from "svelte/store";
    import 'iconify-icon'
    import ExerciseAddForm from "$lib/Components/ExerciseAddForm.svelte";
  export let data: PageData;

  const entityData = writable(data.records ?? []);

  $: tableSource = {
    head: ["Exercise Name", "Description", "Created", "Delete"],
    body: $entityData.map((entity) => [
      entity.exercise_name,
      entity.exercise_description,
      entity.created,
      '<iconify-icon icon="material-symbols:delete"></iconify-icon>',
    ]),
    meta: tableMapperValues($entityData, [
      "id",
      "exercise_name",
      "exercise_description",
      "created",
    ]),
    foot: [
      "Total Exercises",
      "",
      `<code class="code">${$entityData.length}</code>`,
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

<ExerciseAddForm />


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






