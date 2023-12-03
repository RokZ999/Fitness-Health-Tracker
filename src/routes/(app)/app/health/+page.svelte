<script lang="ts">
    import {
      Table,
      tableMapperValues,
    } from "@skeletonlabs/skeleton";
    import type { PageData } from "./$types";
      import { writable } from "svelte/store";
      import 'iconify-icon'
    import HealthAddForm from "$lib/Components/HealthAddForm.svelte";
    export let data: PageData;
  
    const entityData = writable(data.healthRecords ?? []);
  
    $: tableSource = {
      head: ["Height", "Weight", "Delete"],
      body: $entityData.map((entity) => [
        entity.height,
        entity.weight,
        '<iconify-icon icon="material-symbols:delete"></iconify-icon>',
      ]),
      meta: tableMapperValues($entityData, [
        "id",
        "height",
        "weight",
      ]),
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
  
  <HealthAddForm />
  
  
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
  
  
  
  
  
  
  