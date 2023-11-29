import type { PageServerLoad } from '../exercises/$types';
import { pb } from '$lib/pocketbase';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {

  const parentData = await parent()

  if (!parentData || !parentData.user) {
    return { records: [] };
}

  const meals: MealTracking[] = await pb.collection('MealTracking').getFullList({
    sort: '-created',
    filter: `user_id="${parentData.user.id}"`,
  });
  return {
    meals
  };
};


export const actions: Actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('key') as string;

        pb.collection('MealTracking').delete(id);
    },
    add: async ({ locals, request }) => {
      const form = await request.formData();
      const meal = form.get('meal');
      const calories = form.get('calories');
      const userId = locals.user?.id; 


      await locals.pb.collection('MealTracking').create({
          meal_name: meal,
          calories: calories, 
          user_id: userId,
      });
    },
  };