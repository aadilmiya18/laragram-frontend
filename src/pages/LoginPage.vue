<template>
  <q-page class="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-bg-black">
    <q-card class="tw-w-full tw-max-w-md tw-rounded-2xl tw-shadow-2xl tw-overflow-hidden">
      <div
        class="tw-bg-gradient-to-r tw-from-indigo-500 tw-to-purple-600 tw-text-white tw-py-6 tw-text-center"
      >
        <h2 class="tw-text-2xl tw-font-bold">Welcome to Laragram</h2>
      </div>

      <q-tabs
        v-model="tab"
        class="tw-bg-gray-50 tw-border-b tw-border-gray-200 tw-text-gray-600"
        align="justify"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="tw-p-6 tw-bg-white">
        <q-tab-panel name="login">
          <div class="tw-space-y-4">
            <q-input
              v-model="loginFormData.email"
              filled
              label="Enter Email"
              clearable
              standout
            >
              <template #prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>

            <q-input
              v-model="loginFormData.password"
              filled
              label="Enter Password"
              :type="isPasswordShown ? 'text' : 'password'"
              standout
            >
              <template #prepend>
                <q-icon name="mdi-lock" />
              </template>
              <template #append>
                <q-icon
                  :name="isPasswordShown ? 'mdi-eye-off' : 'mdi-eye'"
                  class="tw-cursor-pointer"
                  @click.stop="togglePassword()"
                />
              </template>
            </q-input>

            <div class="tw-flex tw-justify-between tw-items-center tw-text-sm">
              <q-checkbox v-model="rememberMe" label="Remember me" />
              <a href="#" class="tw-text-indigo-600 hover:tw-underline">Forgot Password?</a>
            </div>

            <q-btn
              label="Login"
              color="primary"
              unelevated
              class="tw-w-full tw-py-3 tw-rounded-xl tw-font-semibold tw-transition-all hover:tw-shadow-lg"
              @click="handleLogin()"
            />
          </div>
        </q-tab-panel>

        <!-- Register Panel -->
        <q-tab-panel name="register">
          <div class="tw-space-y-4">
            <q-input v-model="registerFormData.name" filled label="Enter Name" clearable standout>
              <template #prepend>
                <q-icon name="mdi-account-circle" />
              </template>
            </q-input>

            <q-input
              v-model="registerFormData.username"
              filled
              label="Enter Username"
              clearable
              standout
            >
              <template #prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>

            <q-input v-model="registerFormData.email" filled label="Enter Email" clearable standout>
              <template #prepend>
                <q-icon name="mdi-email" />
              </template>
            </q-input>

            <q-input
              v-model="registerFormData.password"
              filled
              label="Enter Password"
              :type="isPasswordShown ? 'text' : 'password'"
              standout
            >
              <template #prepend>
                <q-icon name="mdi-lock" />
              </template>
              <template #append>
                <q-icon
                  :name="isPasswordShown ? 'mdi-eye-off' : 'mdi-eye'"
                  class="tw-cursor-pointer"
                  @click.stop="togglePassword()"
                />
              </template>
            </q-input>

            <q-btn
              label="Create Account"
              color="primary"
              unelevated
              class="tw-w-full tw-py-3 tw-rounded-xl tw-font-semibold tw-transition-all hover:tw-shadow-lg"
              @click="handleRegister()"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from 'stores/authStore.js'


const tab = ref('login')

const loginFormData = ref({
  email: '',
  password: '',
})

const registerFormData = ref({
  name: '',
  email: '',
  username: '',
  password: '',
})

const rememberMe = ref(false)
const isPasswordShown = ref(false)

const togglePassword = () => {
  isPasswordShown.value = !isPasswordShown.value
}

const store = useAuthStore()

const handleLogin = async () => {
  await store.login(loginFormData.value).then(() => {
  })


}
const handleRegister = async () => {
  await store.register(registerFormData.value).then(() => {
    tab.value = 'login'
  })
}

watch(
  () => tab.value,
  () => {
    loginFormData.value = {}
    registerFormData.value = {}
  },
)
</script>
