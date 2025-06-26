<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Administration</h1>
        <p class="mt-2 text-gray-600">Rapports, analytics et configuration du système</p>
      </div>

      <!-- Onglets -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'dashboard'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'dashboard' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Dashboard
          </button>
          <button
            @click="activeTab = 'reports'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'reports' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Rapports
          </button>
          <button
            @click="activeTab = 'staff'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'staff' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Personnel
          </button>
          <button
            @click="activeTab = 'settings'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'settings' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Paramètres
          </button>
        </nav>
      </div>

      <!-- Dashboard Admin -->
      <div v-if="activeTab === 'dashboard'">
        <!-- KPIs principaux -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Revenus du mois</h3>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(monthlyRevenue) }}</p>
                <p class="text-sm text-green-600">+12.5% vs mois précédent</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Clients uniques</h3>
                <p class="text-2xl font-bold text-gray-900">{{ uniqueCustomers }}</p>
                <p class="text-sm text-blue-600">+8.2% vs mois précédent</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Taux d'occupation moyen</h3>
                <p class="text-2xl font-bold text-gray-900">{{ averageOccupancy }}%</p>
                <p class="text-sm text-purple-600">+2.1% vs mois précédent</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Note satisfaction</h3>
                <p class="text-2xl font-bold text-gray-900">{{ satisfactionScore }}/5</p>
                <p class="text-sm text-yellow-600">+0.3 vs mois précédent</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Graphiques et tableaux -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Revenus par service -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenus par service</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Hôtellerie</span>
                <div class="flex items-center space-x-2">
                  <div class="w-32 bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: 65%"></div>
                  </div>
                  <span class="text-sm font-medium">{{ formatCurrency(hotelRevenue) }}</span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Restauration</span>
                <div class="flex items-center space-x-2">
                  <div class="w-32 bg-gray-200 rounded-full h-2">
                    <div class="bg-green-600 h-2 rounded-full" style="width: 35%"></div>
                  </div>
                  <span class="text-sm font-medium">{{ formatCurrency(restaurantRevenue) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Top clients -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Top clients du mois</h3>
            <div class="space-y-3">
              <div v-for="customer in topCustomers" :key="customer.id" class="flex justify-between items-center">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ customer.name }}</p>
                  <p class="text-xs text-gray-500">{{ customer.visits }} visites</p>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ formatCurrency(customer.totalSpent) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rapports -->
      <div v-if="activeTab === 'reports'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="card cursor-pointer hover:shadow-md transition-shadow">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Rapport financier</h4>
                <p class="text-sm text-gray-500">Revenus et dépenses</p>
              </div>
            </div>
          </div>

          <div class="card cursor-pointer hover:shadow-md transition-shadow">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Rapport d'occupation</h4>
                <p class="text-sm text-gray-500">Taux d'occupation</p>
              </div>
            </div>
          </div>

          <div class="card cursor-pointer hover:shadow-md transition-shadow">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Rapport client</h4>
                <p class="text-sm text-gray-500">Satisfaction et fidélité</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Période de rapport -->
        <div class="card mb-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Générer un rapport</h3>
            <div class="flex items-center space-x-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Début</label>
                <input type="date" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                <input type="date" class="input-field" />
              </div>
              <button class="btn-primary mt-6">Générer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Personnel -->
      <div v-if="activeTab === 'staff'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Gestion du personnel</h2>
          <button class="btn-primary">+ Ajouter un employé</button>
        </div>

        <div class="card">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière activité</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="employee in employees" :key="employee.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-medium">{{ getInitials(employee.name) }}</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ employee.name }}</div>
                        <div class="text-sm text-gray-500">{{ employee.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ employee.position }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.department }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="status-badge"
                      :class="{
                        'status-available': employee.status === 'active',
                        'bg-red-100 text-red-800': employee.status === 'inactive',
                        'bg-yellow-100 text-yellow-800': employee.status === 'break'
                      }"
                    >
                      {{ getStatusLabel(employee.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ employee.lastActivity }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button class="btn-secondary text-xs">Modifier</button>
                    <button class="btn-danger text-xs">Désactiver</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Paramètres -->
      <div v-if="activeTab === 'settings'">
        <div class="space-y-8">
          <!-- Paramètres généraux -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Paramètres généraux</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom de l'établissement</label>
                <input type="text" value="Grand Hôtel Palace" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Devise</label>
                <select class="input-field">
                  <option>USD - Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - Livre Sterling</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                <select class="input-field">
                  <option>Europe/Paris</option>
                  <option>Europe/London</option>
                  <option>America/New_York</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Langue par défaut</label>
                <select class="input-field">
                  <option>Français</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Paramètres de notification -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Notifications email</h4>
                  <p class="text-sm text-gray-500">Recevoir des emails pour les événements importants</p>
                </div>
                <input type="checkbox" checked class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Alertes stock faible</h4>
                  <p class="text-sm text-gray-500">Être alerté quand les stocks sont bas</p>
                </div>
                <input type="checkbox" checked class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Rapports automatiques</h4>
                  <p class="text-sm text-gray-500">Recevoir des rapports hebdomadaires automatiquement</p>
                </div>
                <input type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              </div>
            </div>
          </div>

          <!-- Sauvegarde -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Sauvegarde et sécurité</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Dernière sauvegarde</h4>
                  <p class="text-sm text-gray-500">25 juin 2025 à 02:00</p>
                </div>
                <button class="btn-primary">Sauvegarder maintenant</button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Authentification à deux facteurs</h4>
                  <p class="text-sm text-gray-500">Sécuriser les connexions administrateur</p>
                </div>
                <button class="btn-secondary">Configurer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

interface Employee {
  id: number
  name: string
  email: string
  position: string
  department: string
  status: 'active' | 'inactive' | 'break'
  lastActivity: string
}

interface Customer {
  id: number
  name: string
  visits: number
  totalSpent: number
}

// État
const activeTab = ref('dashboard')

// Données simulées
const monthlyRevenue = 245000
const uniqueCustomers = 1248
const averageOccupancy = 78
const satisfactionScore = 4.3
const hotelRevenue = 159250
const restaurantRevenue = 85750

const topCustomers: Customer[] = [
  { id: 1, name: 'Marie Dubois', visits: 8, totalSpent: 3450 },
  { id: 2, name: 'Jean Martin', visits: 5, totalSpent: 2890 },
  { id: 3, name: 'Sophie Laurent', visits: 12, totalSpent: 5670 },
  { id: 4, name: 'Pierre Moreau', visits: 3, totalSpent: 1230 }
]

const employees: Employee[] = [
  { id: 1, name: 'Claire Dubois', email: 'claire@hotel.com', position: 'Réceptionniste', department: 'Hôtel', status: 'active', lastActivity: 'Il y a 5 min' },
  { id: 2, name: 'Marc Lefebvre', email: 'marc@hotel.com', position: 'Chef de cuisine', department: 'Restaurant', status: 'active', lastActivity: 'Il y a 12 min' },
  { id: 3, name: 'Julie Martin', email: 'julie@hotel.com', position: 'Femme de chambre', department: 'Hôtel', status: 'break', lastActivity: 'Il y a 45 min' },
  { id: 4, name: 'Thomas Durand', email: 'thomas@hotel.com', position: 'Serveur', department: 'Restaurant', status: 'inactive', lastActivity: 'Il y a 2h' }
]

// Méthodes
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusLabel = (status: string) => {
  const labels = {
    active: 'Actif',
    inactive: 'Inactif', 
    break: 'En pause'
  }
  return labels[status as keyof typeof labels] || status
}
</script>
