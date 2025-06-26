<template>
  <nav v-if="authState.isAuthenticated" class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center space-x-8">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-bold text-primary-600 dark:text-primary-400">🏨 HotelPMS</h1>
          </div>
          <!-- Navigation desktop -->
          <div class="hidden md:flex space-x-8">
            <router-link 
              v-if="hasPermission('dashboard')"
              to="/dashboard" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link 
              v-if="hasPermission('hotel')"
              to="/hotel" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Hotel' }"
            >
              Hôtel
            </router-link>
            <router-link 
              v-if="hasPermission('reception')"
              to="/reception" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Reception' }"
            >
              Réception
            </router-link>
            <router-link 
              v-if="hasPermission('restaurant')"
              to="/restaurant" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Restaurant' }"
            >
              Restaurant
            </router-link>
            <router-link 
              v-if="hasPermission('all')"
              to="/administration" 
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Administration' }"
            >
              Administration
            </router-link>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Bouton menu mobile -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Bouton de changement de thème -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="isDark ? 'Basculer vers le thème clair' : 'Basculer vers le thème sombre'"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          <!-- Informations utilisateur -->
          <div class="hidden md:flex items-center space-x-3">
            <div class="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">{{ userInitials }}</span>
            </div>
            <div class="hidden sm:block">
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">{{ userName }}</span>
              <div class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ authState.user?.role || 'Utilisateur' }}</div>
            </div>
          </div>
          
          <!-- Bouton de déconnexion desktop -->
          <button 
            @click="logout"
            class="hidden md:inline-flex items-center px-3 py-2 border border-red-300 dark:border-red-600 text-sm font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="hidden sm:inline">Déconnexion</span>
            <span class="sm:hidden">Sortir</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div class="px-4 py-3 space-y-1">
        <!-- Informations utilisateur mobile -->
        <div class="flex items-center space-x-3 p-3 border-b border-gray-200 dark:border-gray-700 mb-3">
          <div class="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center">
            <span class="text-white font-medium">{{ userInitials }}</span>
          </div>
          <div>
            <div class="text-gray-900 dark:text-white font-medium">{{ userName }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ authState.user?.role || 'Utilisateur' }}</div>
          </div>
        </div>

        <!-- Navigation mobile -->
        <router-link 
          v-if="hasPermission('dashboard')"
          to="/dashboard" 
          @click="showMobileMenu = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Dashboard' }"
        >
          📊 Dashboard
        </router-link>
        <router-link 
          v-if="hasPermission('hotel')"
          to="/hotel" 
          @click="showMobileMenu = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Hotel' }"
        >
          🏨 Hôtel
        </router-link>
        <router-link 
          v-if="hasPermission('reception')"
          to="/reception" 
          @click="showMobileMenu = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Reception' }"
        >
          🎯 Réception
        </router-link>
        <router-link 
          v-if="hasPermission('restaurant')"
          to="/restaurant" 
          @click="showMobileMenu = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Restaurant' }"
        >
          🍽️ Restaurant
        </router-link>
        <router-link 
          v-if="hasPermission('all')"
          to="/administration" 
          @click="showMobileMenu = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          :class="{ 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.name === 'Administration' }"
        >
          ⚙️ Administration
        </router-link>

        <!-- Bouton de déconnexion mobile -->
        <button 
          @click="logout"
          class="w-full mt-4 flex items-center justify-center px-3 py-2 border border-red-300 dark:border-red-600 text-base font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Se déconnecter
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { authState, logout as logoutUser, hasPermission } from '../store'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const showMobileMenu = ref(false)

const userName = computed(() => authState.value.user?.name || 'Utilisateur')
const userInitials = computed(() => {
  const name = authState.value.user?.name || 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const logout = () => {
  logoutUser()
  router.push('/')
}
</script>
