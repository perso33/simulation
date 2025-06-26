<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Administration</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Rapports, analytics et configuration</p>
      </div>

      <!-- Onglets -->
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'analytics'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'analytics' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            Analytics
          </button>
          <button
            @click="activeTab = 'reports'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'reports' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            Rapports
          </button>
          <button
            @click="activeTab = 'users'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'users' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            Utilisateurs
          </button>
          <button
            @click="activeTab = 'settings'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'settings' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            Paramètres
          </button>
        </nav>
      </div>

      <!-- Analytics -->
      <div v-if="activeTab === 'analytics'" class="space-y-8">
        <!-- KPIs -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="card text-center">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ occupancyRate }}%</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Taux d'occupation</div>
            <div class="text-xs text-green-600 dark:text-green-400 mt-1">+2.5% vs hier</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ formatCurrency(totalRevenue) }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Revenus du mois</div>
            <div class="text-xs text-green-600 dark:text-green-400 mt-1">+15.2% vs mois dernier</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ avgDailyRate }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Tarif moyen journalier</div>
            <div class="text-xs text-red-600 dark:text-red-400 mt-1">-1.8% vs mois dernier</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ customerSatisfaction }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Satisfaction client</div>
            <div class="text-xs text-green-600 dark:text-green-400 mt-1">+0.3 vs mois dernier</div>
          </div>
        </div>

        <!-- Graphiques -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Évolution des revenus -->
          <LineChart
            title="Évolution des revenus (30 derniers jours)"
            :labels="revenueChart.labels"
            :datasets="revenueChart.datasets"
          />
          
          <!-- Répartition des revenus -->
          <DonutChart
            title="Répartition des revenus par source"
            :data="revenueSourceChart"
          />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Occupation par type de chambre -->
          <DonutChart
            title="Occupation par type de chambre"
            :data="roomTypeChart"
          />
          
          <!-- Performance mensuelle -->
          <LineChart
            title="Performance mensuelle (12 derniers mois)"
            :labels="monthlyChart.labels"
            :datasets="monthlyChart.datasets"
          />
        </div>
      </div>

      <!-- Rapports -->
      <div v-if="activeTab === 'reports'" class="space-y-6">
        <!-- Filtres -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Générer un rapport</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de rapport</label>
              <select v-model="reportType" class="input-field">
                <option value="occupancy">Occupation</option>
                <option value="revenue">Revenus</option>
                <option value="customer">Clientèle</option>
                <option value="operations">Opérations</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Période</label>
              <select v-model="reportPeriod" class="input-field">
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Format</label>
              <select v-model="reportFormat" class="input-field">
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div class="flex items-end">
              <button @click="generateReport" class="btn-primary w-full">
                Générer
              </button>
            </div>
          </div>
        </div>

        <!-- Rapports récents -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Rapports récents</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Nom du rapport</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Type</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Période</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Créé le</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in recentReports" :key="report.id" class="border-b border-gray-100 dark:border-gray-800">
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ report.name }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ report.type }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ report.period }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ formatDate(report.createdAt) }}</td>
                  <td class="py-3 px-4">
                    <div class="flex space-x-2">
                      <button @click="downloadReport(report)" class="btn-primary text-xs px-2 py-1">
                        Télécharger
                      </button>
                      <button @click="deleteReport(report.id)" class="btn-danger text-xs px-2 py-1">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Utilisateurs -->
      <div v-if="activeTab === 'users'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Gestion des utilisateurs</h3>
          <button @click="showNewUser = true" class="btn-primary">
            + Nouvel utilisateur
          </button>
        </div>

        <div class="card overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Nom</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Email</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Rôle</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Dernière connexion</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Statut</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ user.name.charAt(0) }}</span>
                    </div>
                    <span class="text-gray-900 dark:text-gray-100">{{ user.name }}</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ user.email }}</td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ user.role }}</td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ formatDate(user.lastLogin) }}</td>
                <td class="py-3 px-4">
                  <span class="status-badge" :class="user.active ? 'status-available' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'">
                    {{ user.active ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex space-x-2">
                    <button @click="editUser(user)" class="btn-primary text-xs px-2 py-1">
                      Modifier
                    </button>
                    <button @click="toggleUserStatus(user.id)" class="btn-secondary text-xs px-2 py-1">
                      {{ user.active ? 'Désactiver' : 'Activer' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Paramètres -->
      <div v-if="activeTab === 'settings'" class="space-y-6">
        <!-- Informations de l'hôtel -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Informations de l'établissement</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom de l'hôtel</label>
              <input v-model="hotelSettings.name" type="text" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
              <input v-model="hotelSettings.address" type="text" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
              <input v-model="hotelSettings.phone" type="tel" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input v-model="hotelSettings.email" type="email" class="input-field">
            </div>
          </div>
        </div>

        <!-- Paramètres de tarification -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tarification</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">TVA (%)</label>
              <input v-model.number="hotelSettings.taxRate" type="number" min="0" max="100" step="0.1" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frais de service (%)</label>
              <input v-model.number="hotelSettings.serviceRate" type="number" min="0" max="100" step="0.1" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monnaie</label>
              <select v-model="hotelSettings.currency" class="input-field">
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dollar ($)</option>
                <option value="GBP">Livre (£)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notifications</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">Nouvelles réservations</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Recevoir une notification pour chaque nouvelle réservation</p>
              </div>
              <input 
                v-model="hotelSettings.notifications.newReservations" 
                type="checkbox" 
                class="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
              >
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">Stock bas</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Alertes quand les stocks atteignent le seuil minimum</p>
              </div>
              <input 
                v-model="hotelSettings.notifications.lowStock" 
                type="checkbox" 
                class="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
              >
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">Check-in/Check-out</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Notifications pour les arrivées et départs</p>
              </div>
              <input 
                v-model="hotelSettings.notifications.checkInOut" 
                type="checkbox" 
                class="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
              >
            </div>
          </div>
        </div>

        <!-- Sauvegarde -->
        <div class="flex justify-end">
          <button @click="saveSettings" class="btn-primary">
            Sauvegarder les paramètres
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import DonutChart from '../components/DonutChart.vue'
import LineChart from '../components/LineChart.vue'
import { occupancyRate, formatCurrency } from '../store'

// État local
const activeTab = ref('analytics')
const reportType = ref('occupancy')
const reportPeriod = ref('month')
const reportFormat = ref('pdf')
const showNewUser = ref(false)

// Données analytics
const totalRevenue = ref(125420)
const avgDailyRate = ref(156)
const customerSatisfaction = ref(4.7)

// Données pour les graphiques
const revenueChart = {
  labels: ['1', '5', '10', '15', '20', '25', '30'],
  datasets: [
    {
      label: 'Hôtel',
      data: [3200, 3800, 3500, 4200, 3900, 4500, 4800],
      color: '#3b82f6'
    },
    {
      label: 'Restaurant',
      data: [1200, 1400, 1100, 1600, 1300, 1800, 1900],
      color: '#10b981'
    }
  ]
}

const revenueSourceChart = [
  { label: 'Chambres', value: 75, color: '#3b82f6' },
  { label: 'Restaurant', value: 20, color: '#10b981' },
  { label: 'Services', value: 5, color: '#8b5cf6' }
]

const roomTypeChart = [
  { label: 'Simples', value: 45, color: '#3b82f6' },
  { label: 'Doubles', value: 35, color: '#10b981' },
  { label: 'Suites', value: 20, color: '#8b5cf6' }
]

const monthlyChart = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
  datasets: [
    {
      label: 'Revenus',
      data: [85000, 90000, 95000, 110000, 125000, 135000, 150000, 145000, 130000, 115000, 105000, 120000],
      color: '#3b82f6'
    }
  ]
}

// Rapports récents
const recentReports = ref([
  { id: 1, name: 'Rapport mensuel occupation', type: 'Occupation', period: 'Mai 2025', createdAt: '2025-06-01', format: 'PDF' },
  { id: 2, name: 'Analyse revenus Q1', type: 'Revenus', period: 'Q1 2025', createdAt: '2025-04-01', format: 'Excel' },
  { id: 3, name: 'Performance opérationnelle', type: 'Opérations', period: 'Avril 2025', createdAt: '2025-05-01', format: 'PDF' }
])

// Utilisateurs
const users = ref([
  { id: 1, name: 'Manager Hôtel', email: 'manager@hotel.com', role: 'Manager', lastLogin: '2025-06-25', active: true },
  { id: 2, name: 'Réceptionniste', email: 'reception@hotel.com', role: 'Réception', lastLogin: '2025-06-25', active: true },
  { id: 3, name: 'Chef Cuisine', email: 'chef@hotel.com', role: 'Restaurant', lastLogin: '2025-06-24', active: true },
  { id: 4, name: 'Serveur 1', email: 'serveur1@hotel.com', role: 'Restaurant', lastLogin: '2025-06-23', active: false }
])

// Paramètres de l'hôtel
const hotelSettings = ref({
  name: 'Hôtel Prestige',
  address: '123 Rue de la Paix, 75001 Paris',
  phone: '+33 1 42 42 42 42',
  email: 'contact@hotel-prestige.com',
  taxRate: 20.0,
  serviceRate: 5.0,
  currency: 'EUR',
  notifications: {
    newReservations: true,
    lowStock: true,
    checkInOut: true
  }
})

// Fonctions utilitaires
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR')
}

// Actions
const generateReport = () => {
  const report = {
    id: Date.now(),
    name: `Rapport ${reportType.value} - ${reportPeriod.value}`,
    type: reportType.value,
    period: reportPeriod.value,
    createdAt: new Date().toISOString().split('T')[0],
    format: reportFormat.value
  }
  
  recentReports.value.unshift(report)
  
  // Simulation du téléchargement
  alert(`Rapport généré: ${report.name} (${reportFormat.value.toUpperCase()})`)
}

const downloadReport = (report: any) => {
  alert(`Téléchargement de: ${report.name}`)
}

const deleteReport = (reportId: number) => {
  const index = recentReports.value.findIndex(r => r.id === reportId)
  if (index !== -1) {
    recentReports.value.splice(index, 1)
  }
}

const editUser = (user: any) => {
  alert(`Modification de l'utilisateur: ${user.name}`)
}

const toggleUserStatus = (userId: number) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    user.active = !user.active
  }
}

const saveSettings = () => {
  alert('Paramètres sauvegardés avec succès!')
}
</script>
