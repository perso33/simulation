<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- En-tête du dashboard -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Vue d'ensemble de votre établissement</p>
      </div>

      <!-- Statistiques principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card text-center">
          <div class="flex items-center justify-center mb-3">
            <div class="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ occupiedRooms }}/{{ totalRooms }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Chambres occupées</div>
        </div>

        <div class="card text-center">
          <div class="flex items-center justify-center mb-3">
            <div class="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{ formatCurrency(todayRevenue) }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Revenus aujourd'hui</div>
        </div>

        <div class="card text-center">
          <div class="flex items-center justify-center mb-3">
            <div class="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{{ todayOrders }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Commandes restaurant</div>
        </div>

        <div class="card text-center">
          <div class="flex items-center justify-center mb-3">
            <div class="w-12 h-12 bg-yellow-500 dark:bg-yellow-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{{ occupancyRate }}%</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Taux d'occupation</div>
        </div>
      </div>

      <!-- Graphiques -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Répartition des chambres -->
        <DonutChart
          title="Répartition des chambres"
          :data="roomsChartData"
        />
        
        <!-- Évolution des revenus -->
        <LineChart
          title="Revenus des 7 derniers jours"
          :labels="revenueLabels"
          :datasets="revenueDatasets"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Check-ins du jour -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Check-ins aujourd'hui</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ todayCheckins.length }} arrivées</span>
          </div>
          <div class="space-y-3">
            <div v-for="checkin in todayCheckins" :key="checkin.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">{{ checkin.guestName }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Chambre {{ checkin.roomNumber }} • {{ checkin.time }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="status-badge" :class="getStatusClass(checkin.status)">
                  {{ getStatusText(checkin.status) }}
                </span>
                <button 
                  v-if="checkin.status === 'pending'"
                  @click="checkInGuest(checkin.id)"
                  class="btn-success text-xs px-2 py-1"
                >
                  Check-in
                </button>
              </div>
            </div>
            <div v-if="todayCheckins.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
              Aucun check-in prévu aujourd'hui
            </div>
          </div>
        </div>

        <!-- Activité récente -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Activité récente</h3>
          <div class="space-y-3">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-900 dark:text-gray-100">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Actions rapides</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <router-link to="/hotel" class="card hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 cursor-pointer group">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">Gérer les chambres</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Réservations et statuts</p>
              </div>
            </div>
          </router-link>

          <router-link to="/restaurant" class="card hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 cursor-pointer group">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-1a1 1 0 100 2v3a1 1 0 11-2 0v-3a1 1 0 000-2z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">Restaurant</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Commandes et inventaire</p>
              </div>
            </div>
          </router-link>

          <router-link to="/administration" class="card hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 cursor-pointer group">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">Administration</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Rapports et configuration</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import DonutChart from '../components/DonutChart.vue'
import LineChart from '../components/LineChart.vue'
import { 
  rooms, 
  orders, 
  reservations, 
  occupiedRooms, 
  totalRooms, 
  todayRevenue, 
  occupancyRate, 
  formatCurrency,
  checkInReservation
} from '../store'

// Données pour les graphiques
const roomsChartData = computed(() => {
  const available = rooms.value.filter(r => r.status === 'available').length
  const occupied = rooms.value.filter(r => r.status === 'occupied').length
  const maintenance = rooms.value.filter(r => r.status === 'maintenance').length
  const blocked = rooms.value.filter(r => r.status === 'blocked').length
  
  return [
    { label: 'Disponibles', value: available, color: '#10b981' },
    { label: 'Occupées', value: occupied, color: '#ef4444' },
    { label: 'Maintenance', value: maintenance, color: '#f59e0b' },
    { label: 'Bloquées', value: blocked, color: '#8b5cf6' }
  ]
})

const revenueLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const revenueDatasets = [
  {
    label: 'Revenus Hôtel',
    data: [2150, 2890, 3200, 2750, 3450, 4200, 3800],
    color: '#3b82f6'
  },
  {
    label: 'Revenus Restaurant', 
    data: [850, 1250, 980, 1120, 1680, 2100, 1950],
    color: '#10b981'
  }
]

const todayOrders = computed(() => 
  orders.value.filter(order => order.time.includes('12:') || order.time.includes('13:')).length
)

// Check-ins du jour basés sur les réservations
const todayCheckins = computed(() => 
  reservations.value
    .filter(r => r.checkin === '2025-06-25' && ['pending', 'confirmed'].includes(r.status))
    .map(r => ({
      id: r.id,
      guestName: r.guestName,
      roomNumber: r.roomNumber,
      time: '14:00',
      status: r.status
    }))
)

const recentActivities = [
  { id: 1, description: 'Nouvelle réservation chambre 301', time: 'Il y a 5 min' },
  { id: 2, description: 'Commande restaurant table 12', time: 'Il y a 12 min' },
  { id: 3, description: 'Check-out chambre 204', time: 'Il y a 23 min' },
  { id: 4, description: 'Maintenance planifiée chambre 405', time: 'Il y a 1h' },
  { id: 5, description: 'Paiement reçu pour chambre 102', time: 'Il y a 2h' }
]

// Fonctions utilitaires
const getStatusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'status-pending'
    case 'confirmed': return 'status-confirmed'
    case 'checked-in': return 'status-checked-in'
    case 'checked-out': return 'status-checked-out'
    default: return 'status-pending'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'En attente'
    case 'confirmed': return 'Confirmé'
    case 'checked-in': return 'Arrivé'
    case 'checked-out': return 'Parti'
    default: return 'En attente'
  }
}

const checkInGuest = (reservationId: number) => {
  checkInReservation(reservationId)
}
</script>
