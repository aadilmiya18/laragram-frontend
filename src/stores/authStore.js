import { defineStore } from 'pinia'
import { api } from 'boot/axios.js'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const $q = useQuasar()
  const register = async (payload) => {
    try {
      const resp = await api.post('auth/register', payload)
      console.log(resp)
      // const token = resp?.data?.token;
      // localStorage.setItem('token', token);
      // localStorage.setItem('userId',resp?.data?.user?.id);
    } catch (e) {
      console.log('error', e)
    }
  }

  const login = async (payload) => {
    try {
      const resp = await api.post('auth/login', payload)
      localStorage.setItem('token', resp?.data?.token)
      localStorage.setItem('userId', resp?.data?.user?.id)
      router.push('/')
    } catch (e) {
      console.log('error', e)
    }
  }

  const logout = async () => {
    try {
      await api.post(
        '/auth/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      localStorage.removeItem('token');

      $q.notify({
        type: 'positive',
        message: 'Logout successfully'
      });

      await router.push('/login');

    } catch (e) {
      console.log('Error occurred', e);
      $q.notify({
        type: 'negative',
        message: 'Failed to logout'
      });
    }
  };


  return {
    register,
    login,
    logout,
  }
})
