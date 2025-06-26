<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-xl bg-primary-600">
          <span class="text-white text-2xl">🏨</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Connexion à HotelPMS
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Système de gestion hôtelière professionnel
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          {{ errorMessage }}
        </div>
        
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom d'utilisateur
            </label>
            <input
              id="email"
              name="email"
              type="text"
              v-model="email"
              required
              class="input-field"
              placeholder="admin, manager, reception..."
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="input-field"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              Se souvenir de moi
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-primary-500 group-hover:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Se connecter
          </button>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400">Accès de démonstration</span>
            </div>
          </div>

          <div class="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="demoLogin('manager')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Manager
            </button>
            <button
              type="button"
              @click="demoLogin('admin')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Admin
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, getDefaultRouteForRole } from '../store'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''
  
  if (!email.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }

  const user = login(email.value, password.value)
  
  if (user) {
    const defaultRoute = getDefaultRouteForRole(user.role)
    router.push(defaultRoute)
  } else {
    errorMessage.value = 'Identifiants incorrects'
  }
}

const demoLogin = (role: string) => {
  const credentials = {
    admin: { username: 'admin', password: 'admin123' },
    manager: { username: 'manager', password: 'manager123' },
    reception: { username: 'reception', password: 'reception123' },
    restaurant: { username: 'restaurant', password: 'restaurant123' },
    maintenance: { username: 'maintenance', password: 'maintenance123' }
  }
  
  const cred = credentials[role as keyof typeof credentials]
  if (cred) {
    const user = login(cred.username, cred.password)
    if (user) {
      const defaultRoute = getDefaultRouteForRole(user.role)
      router.push(defaultRoute)
    }
  }
}
</script>
