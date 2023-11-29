import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {

  const parentData = await parent()

  if (!parentData || !parentData.user) {
    return { records: [] };
}

  const healthRecords: HealthMetrics[] = await pb.collection('HealthMetrics').getFullList({
    sort: '-created',
    filter: `user_id="${parentData.user.id}"`,
  });
  return {
    healthRecords
  };
};


export const actions: Actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('key') as string;

        pb.collection('HealthMetrics').delete(id);
    },
    add: async ({ locals, request }) => {
      const form = await request.formData();
      const weight = form.get('weight');
      const height = form.get('height');
      const userId = locals.user?.id; 


      await locals.pb.collection('HealthMetrics').create({
          weight: weight,
          height: height,
          user_id: userId,
      });
    },
  };