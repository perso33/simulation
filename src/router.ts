import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Hotel from './views/Hotel.vue'
import Restaurant from './views/Restaurant.vue'
import Reception from './views/Reception.vue'
import Administration from './views/Administration.vue'
import { authState, initAuth, hasPermission } from './store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, permission: 'dashboard' }
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel,
    meta: { requiresAuth: true, permission: 'hotel' }
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: Restaurant,
    meta: { requiresAuth: true, permission: 'restaurant' }
  },
  {
    path: '/reception',
    name: 'Reception',
    component: Reception,
    meta: { requiresAuth: true, permission: 'reception' }
  },
  {
    path: '/administration',
    name: 'Administration',
    component: Administration,
    meta: { requiresAuth: true, permission: 'all' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de route pour l'authentification
router.beforeEach((to, _from, next) => {
  // Initialiser l'auth depuis le localStorage
  initAuth()
  
  if (to.meta.requiresAuth) {
    if (!authState.value.isAuthenticated) {
      next('/login')
      return
    }
    
    if (to.meta.permission && !hasPermission(to.meta.permission as string)) {
      // Rediriger vers la page par défaut pour le rôle de l'utilisateur
      next('/dashboard')
      return
    }
  }
  
  next()
})

export default router
