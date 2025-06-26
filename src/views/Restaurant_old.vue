<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Restaurant</h1>
          <p class="mt-2 text-gray-600">Commandes, inventaire et gestion des menus</p>
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

      <!-- Onglets -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'orders'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'orders' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Commandes
          </button>
          <button
            @click="activeTab = 'menu'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'menu' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Menu
          </button>
          <button
            @click="activeTab = 'inventory'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'inventory' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Inventaire
          </button>
        </nav>
      </div>

      <!-- Onglet Commandes -->
      <div v-if="activeTab === 'orders'">
        <!-- Statistiques du jour -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card text-center">
            <div class="text-3xl font-bold text-blue-600">{{ todayOrders.length }}</div>
            <div class="text-sm text-gray-500 mt-1">Commandes aujourd'hui</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-green-600">{{ completedOrders }}</div>
            <div class="text-sm text-gray-500 mt-1">Commandes terminées</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-yellow-600">{{ pendingOrders }}</div>
            <div class="text-sm text-gray-500 mt-1">En préparation</div>
          </div>
          <div class="card text-center">
            <div class="text-3xl font-bold text-purple-600">{{ formatCurrency(todayRevenue) }}</div>
            <div class="text-sm text-gray-500 mt-1">Chiffre d'affaires</div>
          </div>
        </div>

        <!-- Liste des commandes -->
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="order in todayOrders" 
            :key="order.id"
            class="card"
            :class="{
              'border-yellow-200 bg-yellow-50': order.status === 'pending',
              'border-blue-200 bg-blue-50': order.status === 'preparing',
              'border-green-200 bg-green-50': order.status === 'ready',
              'border-gray-200': order.status === 'delivered'
            }"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Commande #{{ order.id }}</h3>
                <p class="text-sm text-gray-500">Table {{ order.table }} • {{ order.time }}</p>
              </div>
              <span 
                class="status-badge"
                :class="{
                  'status-pending': order.status === 'pending',
                  'bg-blue-100 text-blue-800': order.status === 'preparing',
                  'bg-green-100 text-green-800': order.status === 'ready',
                  'bg-gray-100 text-gray-800': order.status === 'delivered'
                }"
              >
                {{ getOrderStatusLabel(order.status) }}
              </span>
            </div>

            <div class="space-y-2 mb-4">
              <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                <span>{{ item.quantity }}x {{ item.name }}</span>
                <span class="font-medium">{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <span class="text-lg font-bold text-gray-900">{{ formatCurrency(order.total) }}</span>
              <div class="flex space-x-2">
                <button 
                  v-if="order.status === 'pending'"
                  @click="updateOrderStatus(order.id, 'preparing')"
                  class="btn-primary text-xs"
                >
                  Préparer
                </button>
                <button 
                  v-if="order.status === 'preparing'"
                  @click="updateOrderStatus(order.id, 'ready')"
                  class="btn-success text-xs"
                >
                  Prêt
                </button>
                <button 
                  v-if="order.status === 'ready'"
                  @click="updateOrderStatus(order.id, 'delivered')"
                  class="btn-secondary text-xs"
                >
                  Livré
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglet Menu -->
      <div v-if="activeTab === 'menu'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Gestion du Menu</h2>
          <button class="btn-primary">+ Ajouter un plat</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="item in menuItems" :key="item.id" class="card">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">{{ item.category }}</p>
              </div>
              <span class="text-lg font-bold text-primary-600">{{ formatCurrency(item.price) }}</span>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span 
                class="status-badge"
                :class="item.available ? 'status-available' : 'bg-red-100 text-red-800'"
              >
                {{ item.available ? 'Disponible' : 'Indisponible' }}
              </span>
              <div class="flex space-x-2">
                <button class="btn-secondary text-xs">Modifier</button>
                <button 
                  @click="toggleAvailability(item.id)"
                  :class="item.available ? 'btn-warning text-xs' : 'btn-success text-xs'"
                >
                  {{ item.available ? 'Désactiver' : 'Activer' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglet Inventaire -->
      <div v-if="activeTab === 'inventory'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Inventaire</h2>
          <button class="btn-primary">+ Ajouter un article</button>
        </div>

        <div class="card">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock actuel</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock minimum</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unité</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in inventoryItems" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.currentStock }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.minStock }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.unit }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="status-badge"
                      :class="{
                        'status-available': item.currentStock > item.minStock,
                        'bg-yellow-100 text-yellow-800': item.currentStock <= item.minStock && item.currentStock > 0,
                        'bg-red-100 text-red-800': item.currentStock === 0
                      }"
                    >
                      {{ getStockStatus(item) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button class="btn-primary text-xs">Réapprovisionner</button>
                    <button class="btn-secondary text-xs">Modifier</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal nouvelle commande -->
    <div v-if="showNewOrder" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Nouvelle commande</h3>
        <form @submit.prevent="createOrder" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Table</label>
              <input v-model="newOrder.table" type="number" required class="input-field" min="1" max="50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Serveur</label>
              <input v-model="newOrder.waiter" type="text" class="input-field" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Articles</label>
            <div class="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
              <div v-for="item in availableMenuItems" :key="item.id" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div class="flex-1">
                  <span class="text-sm font-medium">{{ item.name }}</span>
                  <span class="text-sm text-gray-500 ml-2">{{ formatCurrency(item.price) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <button 
                    type="button"
                    @click="removeFromOrder(item.id)"
                    class="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                    :disabled="!getOrderItemQuantity(item.id)"
                  >
                    -
                  </button>
                  <span class="w-8 text-center text-sm">{{ getOrderItemQuantity(item.id) || 0 }}</span>
                  <button 
                    type="button"
                    @click="addToOrder(item)"
                    class="w-6 h-6 flex items-center justify-center bg-primary-600 text-white rounded hover:bg-primary-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="newOrder.items.length > 0" class="border-t pt-4">
            <h4 class="font-medium text-gray-900 mb-2">Récapitulatif</h4>
            <div class="space-y-1">
              <div v-for="item in newOrder.items" :key="item.id" class="flex justify-between text-sm">
                <span>{{ item.quantity }}x {{ item.name }}</span>
                <span>{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>{{ formatCurrency(orderTotal) }}</span>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="cancelNewOrder" class="btn-secondary">Annuler</button>
            <button type="submit" :disabled="newOrder.items.length === 0" class="btn-primary">Créer la commande</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: number
  table: number
  time: string
  status: 'pending' | 'preparing' | 'ready' | 'delivered'
  items: OrderItem[]
  total: number
  waiter?: string
}

interface MenuItem {
  id: number
  name: string
  category: string
  description: string
  price: number
  available: boolean
}

interface InventoryItem {
  id: number
  name: string
  category: string
  currentStock: number
  minStock: number
  unit: string
}

// État
const activeTab = ref('orders')
const showNewOrder = ref(false)

const newOrder = ref({
  table: null as number | null,
  waiter: '',
  items: [] as OrderItem[]
})

// Données simulées
const todayOrders: Order[] = [
  {
    id: 1001,
    table: 12,
    time: '12:30',
    status: 'pending',
    items: [
      { id: 1, name: 'Salade César', price: 12.50, quantity: 1 },
      { id: 2, name: 'Steak frites', price: 22.00, quantity: 1 }
    ],
    total: 34.50
  },
  {
    id: 1002,
    table: 7,
    time: '12:45',
    status: 'preparing',
    items: [
      { id: 3, name: 'Pizza Margherita', price: 14.00, quantity: 2 },
      { id: 4, name: 'Tiramisu', price: 8.00, quantity: 1 }
    ],
    total: 36.00
  },
  {
    id: 1003,
    table: 3,
    time: '13:15',
    status: 'ready',
    items: [
      { id: 5, name: 'Poisson du jour', price: 18.50, quantity: 1 }
    ],
    total: 18.50
  }
]

const menuItems: MenuItem[] = [
  { id: 1, name: 'Salade César', category: 'Entrées', description: 'Salade romaine, croûtons, parmesan, sauce césar', price: 12.50, available: true },
  { id: 2, name: 'Steak frites', category: 'Plats', description: 'Entrecôte 300g, frites maison, sauce au choix', price: 22.00, available: true },
  { id: 3, name: 'Pizza Margherita', category: 'Plats', description: 'Tomate, mozzarella, basilic frais', price: 14.00, available: true },
  { id: 4, name: 'Tiramisu', category: 'Desserts', description: 'Mascarpone, café, cacao', price: 8.00, available: true },
  { id: 5, name: 'Poisson du jour', category: 'Plats', description: 'Poisson frais selon arrivage', price: 18.50, available: false }
]

const inventoryItems: InventoryItem[] = [
  { id: 1, name: 'Tomates', category: 'Légumes', currentStock: 25, minStock: 10, unit: 'kg' },
  { id: 2, name: 'Mozzarella', category: 'Fromages', currentStock: 8, minStock: 5, unit: 'kg' },
  { id: 3, name: 'Bœuf (entrecôte)', category: 'Viandes', currentStock: 3, minStock: 5, unit: 'kg' },
  { id: 4, name: 'Pommes de terre', category: 'Légumes', currentStock: 0, minStock: 20, unit: 'kg' },
  { id: 5, name: 'Salade romaine', category: 'Légumes', currentStock: 15, minStock: 8, unit: 'pièces' }
]

// Computed
const completedOrders = computed(() => 
  todayOrders.filter(order => order.status === 'delivered').length
)

const pendingOrders = computed(() => 
  todayOrders.filter(order => ['pending', 'preparing', 'ready'].includes(order.status)).length
)

const todayRevenue = computed(() => 
  todayOrders.reduce((sum, order) => sum + order.total, 0)
)

const availableMenuItems = computed(() => 
  menuItems.filter(item => item.available)
)

const orderTotal = computed(() => 
  newOrder.value.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
)

// Méthodes
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const getOrderStatusLabel = (status: string) => {
  const labels = {
    pending: 'En attente',
    preparing: 'En préparation',
    ready: 'Prêt',
    delivered: 'Livré'
  }
  return labels[status as keyof typeof labels] || status
}

const getStockStatus = (item: InventoryItem) => {
  if (item.currentStock === 0) return 'Rupture'
  if (item.currentStock <= item.minStock) return 'Stock faible'
  return 'En stock'
}

const updateOrderStatus = (orderId: number, newStatus: string) => {
  const order = todayOrders.find(o => o.id === orderId)
  if (order) {
    order.status = newStatus as any
  }
}

const toggleAvailability = (itemId: number) => {
  const item = menuItems.find(i => i.id === itemId)
  if (item) {
    item.available = !item.available
  }
}

const addToOrder = (menuItem: MenuItem) => {
  const existingItem = newOrder.value.items.find(item => item.id === menuItem.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    newOrder.value.items.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: 1
    })
  }
}

const removeFromOrder = (itemId: number) => {
  const itemIndex = newOrder.value.items.findIndex(item => item.id === itemId)
  if (itemIndex >= 0) {
    const item = newOrder.value.items[itemIndex]
    if (item.quantity > 1) {
      item.quantity--
    } else {
      newOrder.value.items.splice(itemIndex, 1)
    }
  }
}

const getOrderItemQuantity = (itemId: number) => {
  const item = newOrder.value.items.find(item => item.id === itemId)
  return item ? item.quantity : 0
}

const createOrder = () => {
  if (newOrder.value.table && newOrder.value.items.length > 0) {
    const order: Order = {
      id: Math.max(...todayOrders.map(o => o.id)) + 1,
      table: newOrder.value.table,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
      items: [...newOrder.value.items],
      total: orderTotal.value,
      waiter: newOrder.value.waiter
    }
    
    todayOrders.push(order)
    cancelNewOrder()
  }
}

const cancelNewOrder = () => {
  showNewOrder.value = false
  newOrder.value = {
    table: null,
    waiter: '',
    items: []
  }
}
</script>
