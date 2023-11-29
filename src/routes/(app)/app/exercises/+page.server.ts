import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {

  const parentData = await parent()

  if (!parentData || !parentData.user) {
    return { records: [] };
}

  const records: ExerciseTracking[] = await pb.collection('ExerciseTracking').getFullList({
    sort: '-created',
    filter: `user_id="${parentData.user.id}"`,
  });
  return {
    records
  };
};


export const actions: Actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('key') as string;

        pb.collection('ExerciseTracking').delete(id);
    },
    add: async ({ locals, request }) => {
      const form = await request.formData();
      const exercise = form.get('exercise');
      const description = form.get('description');

      const userId = locals.user?.id; 

      console.log

      await locals.pb.collection('ExerciseTracking').create({
          exercise_name: exercise,
          exercise_description: description,
          user_id: userId,
      });
    },
  };