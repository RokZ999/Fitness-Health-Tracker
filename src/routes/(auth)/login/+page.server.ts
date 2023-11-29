import { redirect, fail } from '@sveltejs/kit'
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string;
      password: string;
    };

    try {
      await locals.pb
        .collection('users')
        .authWithPassword(data.email, data.password);

    } catch (e) {
      console.error(e);
      return fail(400, { errMsg: 'Failed to authenticate' });
    }

    throw redirect(302, '/app');
  },
};