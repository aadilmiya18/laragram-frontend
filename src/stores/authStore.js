import { defineStore } from 'pinia'
import { api } from 'boot/axios.js'
import  { useRouter } from 'vue-router'


export const useAuthStore = defineStore('authStore', () => {

const router = useRouter()
  const register = async (payload) => {
    try {
      const resp = await api.post('auth/register', payload);
      console.log(resp);
      // const token = resp?.data?.token;
      // localStorage.setItem('token', token);
      // localStorage.setItem('userId',resp?.data?.user?.id);
    }
    catch(e) {
      console.log('error', e);
    }

  }

  const login = async (payload) => {
    try {
      const resp = await api.post('auth/login', payload);
      localStorage.setItem('token', resp?.data?.token)
      localStorage.setItem('userId', resp?.data?.user?.id);
      router.push('/');
    }
    catch (e){
      console.log('error', e);
    }

  }

  return {
    register,
    login
  }
})
