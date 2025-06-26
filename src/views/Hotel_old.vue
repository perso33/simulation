<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gestion Hôtel</h1>
          <p class="mt-2 text-gray-600">Réservations, chambres et check-in/out</p>
        </div>
        <button 
          @click="showNewReservation = true"
          class="btn-primary"
        >
          + Nouvelle réservation
        </button>
      </div>

      <!-- Statistiques chambres -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card text-center">
          <div class="text-3xl font-bold text-green-600">{{ availableRooms }}</div>
          <div class="text-sm text-gray-500 mt-1">Chambres libres</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-red-600">{{ occupiedRooms }}</div>
          <div class="text-sm text-gray-500 mt-1">Chambres occupées</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-yellow-600">{{ maintenanceRooms }}</div>
          <div class="text-sm text-gray-500 mt-1">En maintenance</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-blue-600">{{ totalRooms }}</div>
          <div class="text-sm text-gray-500 mt-1">Total chambres</div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="card mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Étage</label>
            <select v-model="selectedFloor" class="input-field w-24">
              <option value="">Tous</option>
              <option v-for="floor in floors" :key="floor" :value="floor">{{ floor }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select v-model="selectedStatus" class="input-field w-32">
              <option value="">Tous</option>
              <option value="available">Libre</option>
              <option value="occupied">Occupé</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select v-model="selectedType" class="input-field w-32">
              <option value="">Tous</option>
              <option value="single">Simple</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Grille des chambres -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <div 
          v-for="room in filteredRooms" 
          :key="room.number"
          class="card cursor-pointer transition-all hover:shadow-md"
          :class="{
            'border-green-200 bg-green-50': room.status === 'available',
            'border-red-200 bg-red-50': room.status === 'occupied',
            'border-yellow-200 bg-yellow-50': room.status === 'maintenance'
          }"
          @click="selectRoom(room)"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ room.number }}</h3>
              <p class="text-sm text-gray-500">{{ room.type }} • {{ room.floor }}e étage</p>
            </div>
            <span 
              class="status-badge"
              :class="{
                'status-available': room.status === 'available',
                'status-occupied': room.status === 'occupied',
                'status-maintenance': room.status === 'maintenance'
              }"
            >
              {{ getStatusLabel(room.status) }}
            </span>
          </div>
          
          <div v-if="room.status === 'occupied' && room.guest" class="mt-3 pt-3 border-t border-gray-200">
            <p class="text-sm font-medium text-gray-900">{{ room.guest.name }}</p>
            <p class="text-xs text-gray-500">Check-out: {{ room.guest.checkout }}</p>
          </div>
          
          <div class="mt-3 text-right">
            <span class="text-lg font-bold text-gray-900">${{ room.price }}</span>
            <span class="text-sm text-gray-500">/nuit</span>
          </div>
        </div>
      </div>

      <!-- Réservations du jour -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Réservations aujourd'hui</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="reservation in todayReservations" :key="reservation.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ reservation.guestName }}</div>
                    <div class="text-sm text-gray-500">{{ reservation.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reservation.roomNumber }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reservation.checkin }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reservation.checkout }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="status-badge"
                    :class="{
                      'status-pending': reservation.status === 'pending',
                      'status-available': reservation.status === 'confirmed'
                    }"
                  >
                    {{ reservation.status === 'pending' ? 'En attente' : 'Confirmé' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="btn-success text-xs">Check-in</button>
                  <button class="btn-secondary text-xs">Modifier</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal nouvelle réservation -->
    <div v-if="showNewReservation" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Nouvelle réservation</h3>
        <form @submit.prevent="createReservation" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom du client</label>
            <input v-model="newReservation.guestName" type="text" required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="newReservation.email" type="email" required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Chambre</label>
            <select v-model="newReservation.roomNumber" required class="input-field">
              <option value="">Sélectionner une chambre</option>
              <option v-for="room in availableRoomsOnly" :key="room.number" :value="room.number">
                {{ room.number }} - {{ room.type }} (${{ room.price }}/nuit)
              </option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input v-model="newReservation.checkin" type="date" required class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input v-model="newReservation.checkout" type="date" required class="input-field" />
            </div>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showNewReservation = false" class="btn-secondary">Annuler</button>
            <button type="submit" class="btn-primary">Créer la réservation</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'

interface Room {
  number: string
  type: string
  floor: number
  status: 'available' | 'occupied' | 'maintenance'
  price: number
  guest?: {
    name: string
    checkout: string
  }
}

interface Reservation {
  id: number
  guestName: string
  email: string
  roomNumber: string
  checkin: string
  checkout: string
  status: 'pending' | 'confirmed'
}

// État des filtres
const selectedFloor = ref('')
const selectedStatus = ref('')
const selectedType = ref('')
const showNewReservation = ref(false)

// Données simulées
const rooms: Room[] = [
  { number: '101', type: 'Simple', floor: 1, status: 'available', price: 89 },
  { number: '102', type: 'Double', floor: 1, status: 'occupied', price: 129, guest: { name: 'Marie Dupont', checkout: '2025-06-26' } },
  { number: '103', type: 'Suite', floor: 1, status: 'available', price: 199 },
  { number: '201', type: 'Simple', floor: 2, status: 'occupied', price: 89, guest: { name: 'Jean Martin', checkout: '2025-06-27' } },
  { number: '202', type: 'Double', floor: 2, status: 'maintenance', price: 129 },
  { number: '203', type: 'Suite', floor: 2, status: 'available', price: 199 },
  { number: '301', type: 'Simple', floor: 3, status: 'available', price: 89 },
  { number: '302', type: 'Double', floor: 3, status: 'occupied', price: 129, guest: { name: 'Sophie Laurent', checkout: '2025-06-25' } },
  { number: '303', type: 'Suite', floor: 3, status: 'available', price: 199 },
  { number: '401', type: 'Suite', floor: 4, status: 'available', price: 299 },
  { number: '402', type: 'Suite', floor: 4, status: 'occupied', price: 299, guest: { name: 'Pierre Dubois', checkout: '2025-06-28' } },
  { number: '403', type: 'Suite', floor: 4, status: 'available', price: 299 }
]

const todayReservations: Reservation[] = [
  { id: 1, guestName: 'Alice Moreau', email: 'alice@email.com', roomNumber: '104', checkin: '2025-06-25', checkout: '2025-06-27', status: 'pending' },
  { id: 2, guestName: 'Bob Wilson', email: 'bob@email.com', roomNumber: '205', checkin: '2025-06-25', checkout: '2025-06-26', status: 'confirmed' },
  { id: 3, guestName: 'Claire Chen', email: 'claire@email.com', roomNumber: '304', checkin: '2025-06-25', checkout: '2025-06-29', status: 'confirmed' }
]

const newReservation = ref({
  guestName: '',
  email: '',
  roomNumber: '',
  checkin: '',
  checkout: ''
})

// Computed properties
const floors = computed(() => [...new Set(rooms.map(room => room.floor))].sort())

const filteredRooms = computed(() => {
  return rooms.filter(room => {
    if (selectedFloor.value && room.floor !== parseInt(selectedFloor.value)) return false
    if (selectedStatus.value && room.status !== selectedStatus.value) return false
    if (selectedType.value && room.type !== selectedType.value) return false
    return true
  })
})

const availableRooms = computed(() => rooms.filter(room => room.status === 'available').length)
const occupiedRooms = computed(() => rooms.filter(room => room.status === 'occupied').length)
const maintenanceRooms = computed(() => rooms.filter(room => room.status === 'maintenance').length)
const totalRooms = computed(() => rooms.length)

const availableRoomsOnly = computed(() => rooms.filter(room => room.status === 'available'))

// Méthodes
const getStatusLabel = (status: string) => {
  const labels = {
    available: 'Libre',
    occupied: 'Occupé',
    maintenance: 'Maintenance'
  }
  return labels[status as keyof typeof labels] || status
}

const selectRoom = (room: Room) => {
  console.log('Chambre sélectionnée:', room)
  // Ici on pourrait ouvrir un modal avec les détails de la chambre
}

const createReservation = () => {
  console.log('Nouvelle réservation:', newReservation.value)
  // Simulation de création
  showNewReservation.value = false
  newReservation.value = {
    guestName: '',
    email: '',
    roomNumber: '',
    checkin: '',
    checkout: ''
  }
}
</script>
