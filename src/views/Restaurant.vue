<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Restaurant</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Commandes, inventaire et gestion des menus</p>
        </div>
        <div class="flex space-x-3">
          <button 
            @click="showNewOrder = true"
            class="btn-primary"
          >
            + Nouvelle commande
          </button>
          <button 
            @click="activeTab = 'inventory'"
            class="btn-secondary"
          >
            📦 Inventaire
          </button>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card text-center">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ todayOrders }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Commandes aujourd'hui</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ formatCurrency(todayRevenue) }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Revenus du jour</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ avgOrderTime }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Temps moyen (min)</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ activeTables }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Tables occupées</div>
        </div>
      </div>

      <!-- Onglets -->
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'orders'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'orders' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
          >
            Commandes en cours
          </button>
          <button
            @click="activeTab = 'menu'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'menu' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
          >
            Menu & Prix
          </button>
          <button
            @click="activeTab = 'inventory'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'inventory' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
          >
            Inventaire
          </button>
          <button
            @click="activeTab = 'history'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === 'history' 
                ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
          >
            Historique
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      <div v-if="activeTab === 'orders'" class="space-y-6">
        <!-- Filtres pour les commandes -->
        <div class="card">
          <div class="flex flex-wrap gap-4 items-center">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
              <select v-model="orderFilter" class="input-field w-32">
                <option value="">Tous</option>
                <option value="pending">En attente</option>
                <option value="preparing">En préparation</option>
                <option value="ready">Prêt</option>
                <option value="delivered">Livré</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Table</label>
              <select v-model="tableFilter" class="input-field w-24">
                <option value="">Toutes</option>
                <option v-for="table in activeTables" :key="table" :value="table">{{ table }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Grille des commandes -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="card hover:shadow-lg dark:hover:shadow-xl transition-all duration-200"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Table {{ order.table }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Commande #{{ order.id }} • {{ order.time }}</p>
                <p v-if="order.waiter" class="text-sm text-gray-500 dark:text-gray-400">Serveur: {{ order.waiter }}</p>
              </div>
              <span class="status-badge" :class="getStatusClass(order.status)">
                {{ getStatusText(order.status) }}
              </span>
            </div>
            
            <div class="space-y-2 mb-4">
              <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                <span class="text-gray-900 dark:text-gray-100">{{ item.quantity }}x {{ item.name }}</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div class="flex justify-between items-center mb-3">
                <span class="font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                <span class="font-bold text-lg text-gray-900 dark:text-gray-100">{{ formatCurrency(order.total) }}</span>
              </div>
              
              <div class="flex space-x-2">
                <button
                  v-if="order.status === 'pending'"
                  @click="updateOrderStatus(order.id, 'preparing')"
                  class="btn-primary text-sm px-3 py-1 flex-1"
                >
                  Commencer
                </button>
                <button
                  v-if="order.status === 'preparing'"
                  @click="updateOrderStatus(order.id, 'ready')"
                  class="btn-success text-sm px-3 py-1 flex-1"
                >
                  Prêt
                </button>
                <button
                  v-if="order.status === 'ready'"
                  @click="updateOrderStatus(order.id, 'delivered')"
                  class="btn-secondary text-sm px-3 py-1 flex-1"
                >
                  Livré
                </button>
                <button
                  v-if="order.status !== 'delivered'"
                  @click="cancelOrder(order.id)"
                  class="btn-danger text-sm px-3 py-1"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu & Prix -->
      <div v-if="activeTab === 'menu'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu et tarification</h3>
          <button @click="showNewMenuItem = true" class="btn-primary">
            + Ajouter un plat
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="item in menuItems" :key="item.id" class="card">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">{{ item.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.category }}</p>
                <p v-if="item.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ item.description }}</p>
              </div>
              <span class="font-bold text-lg text-gray-900 dark:text-gray-100">{{ formatCurrency(item.price) }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-sm" :class="item.available ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ item.available ? 'Disponible' : 'Indisponible' }}
              </span>
              <div class="flex space-x-2">
                <button @click="editMenuItem(item)" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                  Modifier
                </button>
                <button @click="toggleItemAvailability(item.id)" class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 text-sm">
                  {{ item.available ? 'Désactiver' : 'Activer' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventaire -->
      <div v-if="activeTab === 'inventory'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Gestion de l'inventaire</h3>
          <button @click="showNewInventoryItem = true" class="btn-primary">
            + Ajouter un produit
          </button>
        </div>
        
        <div class="card overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Produit</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Catégorie</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Stock actuel</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Stock minimum</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Unité</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Statut</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in inventoryItems" :key="item.id" class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">{{ item.name }}</p>
                    <p v-if="item.supplier" class="text-sm text-gray-500 dark:text-gray-400">{{ item.supplier }}</p>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ item.category }}</td>
                <td class="py-3 px-4">
                  <span :class="item.currentStock <= item.minStock ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-900 dark:text-gray-100'">
                    {{ item.currentStock }}
                  </span>
                </td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ item.minStock }}</td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ item.unit }}</td>
                <td class="py-3 px-4">
                  <span v-if="item.currentStock <= item.minStock" class="status-badge bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                    Stock bas
                  </span>
                  <span v-else class="status-badge status-available">
                    OK
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex space-x-2">
                    <button @click="adjustStock(item)" class="btn-primary text-xs px-2 py-1">
                      Ajuster
                    </button>
                    <button @click="orderSupplies(item)" class="btn-secondary text-xs px-2 py-1">
                      Commander
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Historique -->
      <div v-if="activeTab === 'history'" class="space-y-6">
        <div class="card">
          <div class="flex flex-wrap gap-4 items-center mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Période</label>
              <select v-model="historyPeriod" class="input-field w-32">
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
              </select>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Commande</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Table</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Heure</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Articles</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Total</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Serveur</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in historicalOrders" :key="order.id" class="border-b border-gray-100 dark:border-gray-800">
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">#{{ order.id }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ order.table }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ order.time }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ order.items.length }} article(s)</td>
                  <td class="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(order.total) }}</td>
                  <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ order.waiter || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Nouvelle Commande -->
    <div v-if="showNewOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Nouvelle Commande</h3>
        
        <form @submit.prevent="createOrder" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Table</label>
              <input v-model.number="newOrder.table" type="number" min="1" max="50" required class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Serveur</label>
              <input v-model="newOrder.waiter" type="text" class="input-field">
            </div>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Articles</h4>
            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div v-for="item in availableMenuItems" :key="item.id" class="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-600 rounded">
                <div class="flex-1">
                  <span class="font-medium text-gray-900 dark:text-gray-100">{{ item.name }}</span>
                  <span class="text-gray-500 dark:text-gray-400 ml-2">{{ formatCurrency(item.price) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <button type="button" @click="adjustOrderItemQuantity(item.id, -1)" class="btn-secondary text-xs px-2 py-1">-</button>
                  <span class="w-8 text-center text-gray-900 dark:text-gray-100">{{ getOrderItemQuantity(item.id) }}</span>
                  <button type="button" @click="adjustOrderItemQuantity(item.id, 1)" class="btn-primary text-xs px-2 py-1">+</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div class="flex justify-between items-center mb-4">
              <span class="font-semibold text-gray-900 dark:text-gray-100">Total:</span>
              <span class="font-bold text-xl text-gray-900 dark:text-gray-100">{{ formatCurrency(newOrderTotal) }}</span>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button type="button" @click="showNewOrder = false" class="btn-secondary">
                Annuler
              </button>
              <button type="submit" :disabled="newOrderTotal === 0" class="btn-primary">
                Créer Commande
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import { orders, formatCurrency, updateOrderStatus as updateOrderStatusInStore, addOrder } from '../store'

// État local
const activeTab = ref('orders')
const orderFilter = ref('')
const tableFilter = ref('')
const historyPeriod = ref('today')
const showNewOrder = ref(false)
const showNewMenuItem = ref(false)
const showNewInventoryItem = ref(false)

// Nouvelle commande
const newOrder = ref({
  table: 1,
  waiter: '',
  items: [] as Array<{id: number, quantity: number}>
})

// Données simulées pour le menu
const menuItems = ref([
  { id: 1, name: 'Salade César', category: 'Entrées', price: 12.50, description: 'Salade fraîche avec croûtons', available: true },
  { id: 2, name: 'Steak frites', category: 'Plats', price: 22.00, description: 'Steak de bœuf avec frites maison', available: true },
  { id: 3, name: 'Pizza Margherita', category: 'Plats', price: 14.00, description: 'Pizza tomate, mozzarella, basilic', available: true },
  { id: 4, name: 'Tiramisu', category: 'Desserts', price: 8.00, description: 'Dessert italien traditionnel', available: true },
  { id: 5, name: 'Poisson du jour', category: 'Plats', price: 18.50, description: 'Poisson frais selon arrivage', available: false }
])

// Données simulées pour l'inventaire
const inventoryItems = ref([
  { id: 1, name: 'Steaks de bœuf', category: 'Viandes', currentStock: 5, minStock: 10, unit: 'pièces', supplier: 'Boucherie Martin' },
  { id: 2, name: 'Tomates', category: 'Légumes', currentStock: 25, minStock: 15, unit: 'kg', supplier: 'Ferme Dubois' },
  { id: 3, name: 'Mozzarella', category: 'Fromages', currentStock: 8, minStock: 5, unit: 'kg', supplier: 'Fromagerie Paul' },
  { id: 4, name: 'Farine', category: 'Épicerie', currentStock: 2, minStock: 5, unit: 'kg', supplier: 'Moulin Rouge' },
  { id: 5, name: 'Huile d\'olive', category: 'Épicerie', currentStock: 12, minStock: 8, unit: 'litres', supplier: 'Épicerie Fine' }
])

// Computed properties
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    return (!orderFilter.value || order.status === orderFilter.value) &&
           (!tableFilter.value || order.table === parseInt(tableFilter.value)) &&
           order.status !== 'delivered'
  })
})

const historicalOrders = computed(() => {
  return orders.value.filter(order => order.status === 'delivered')
})

const availableMenuItems = computed(() => {
  return menuItems.value.filter(item => item.available)
})

const todayOrders = computed(() => orders.value.length)
const todayRevenue = computed(() => orders.value.reduce((sum, order) => sum + order.total, 0))
const avgOrderTime = computed(() => 15) // Simulation
const activeTables = computed(() => [...new Set(orders.value.filter(o => o.status !== 'delivered').map(o => o.table))].length)

const newOrderTotal = computed(() => {
  return newOrder.value.items.reduce((total, orderItem) => {
    const menuItem = menuItems.value.find(m => m.id === orderItem.id)
    return total + (menuItem ? menuItem.price * orderItem.quantity : 0)
  }, 0)
})

// Fonctions utilitaires
const getStatusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'status-pending'
    case 'preparing': return 'status-preparing'
    case 'ready': return 'status-ready'
    case 'delivered': return 'status-delivered'
    default: return 'status-pending'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'En attente'
    case 'preparing': return 'En préparation'
    case 'ready': return 'Prêt'
    case 'delivered': return 'Livré'
    default: return 'Inconnu'
  }
}

const getOrderItemQuantity = (itemId: number) => {
  const orderItem = newOrder.value.items.find(item => item.id === itemId)
  return orderItem ? orderItem.quantity : 0
}

// Actions
const updateOrderStatus = (orderId: number, status: string) => {
  updateOrderStatusInStore(orderId, status as any)
}

const cancelOrder = (orderId: number) => {
  const orderIndex = orders.value.findIndex(o => o.id === orderId)
  if (orderIndex !== -1) {
    orders.value.splice(orderIndex, 1)
  }
}

const adjustOrderItemQuantity = (itemId: number, delta: number) => {
  const existingItem = newOrder.value.items.find(item => item.id === itemId)
  
  if (existingItem) {
    existingItem.quantity += delta
    if (existingItem.quantity <= 0) {
      newOrder.value.items = newOrder.value.items.filter(item => item.id !== itemId)
    }
  } else if (delta > 0) {
    newOrder.value.items.push({ id: itemId, quantity: delta })
  }
}

const createOrder = () => {
  if (newOrder.value.items.length === 0) return
  
  const orderItems = newOrder.value.items.map(orderItem => {
    const menuItem = menuItems.value.find(m => m.id === orderItem.id)!
    return {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: orderItem.quantity
    }
  })
  
  addOrder({
    table: newOrder.value.table,
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    status: 'pending',
    items: orderItems,
    total: newOrderTotal.value,
    waiter: newOrder.value.waiter || undefined
  })
  
  // Réinitialiser le formulaire
  newOrder.value = {
    table: 1,
    waiter: '',
    items: []
  }
  
  showNewOrder.value = false
}

const editMenuItem = (item: any) => {
  // Fonctionnalité à implémenter
  console.log('Modifier', item)
}

const toggleItemAvailability = (itemId: number) => {
  const item = menuItems.value.find(i => i.id === itemId)
  if (item) {
    item.available = !item.available
  }
}

const adjustStock = (item: any) => {
  // Fonctionnalité à implémenter
  console.log('Ajuster stock', item)
}

const orderSupplies = (item: any) => {
  // Fonctionnalité à implémenter
  console.log('Commander', item)
}
</script>
