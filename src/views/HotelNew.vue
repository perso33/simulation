<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion Hôtel</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Réservations, chambres et check-in/out</p>
        </div>
        <button 
          @click="showNewReservation = true"
          class="btn-primary"
        >
          + Nouvelle réservation
        </button>
      </div>

      <!-- Statistiques chambres -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div class="card text-center">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ availableRooms }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Chambres libres</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-red-600 dark:text-red-400">{{ occupiedRooms }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Chambres occupées</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ maintenanceRooms }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">En maintenance</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ blockedRooms }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Bloquées</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ totalRooms }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Total chambres</div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="card mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Étage</label>
            <select v-model="selectedFloor" class="input-field w-24">
              <option value="">Tous</option>
              <option v-for="floor in floors" :key="floor" :value="floor">{{ floor }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
            <select v-model="selectedStatus" class="input-field w-32">
              <option value="">Tous</option>
              <option value="available">Disponible</option>
              <option value="occupied">Occupée</option>
              <option value="maintenance">Maintenance</option>
              <option value="blocked">Bloquée</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select v-model="selectedType" class="input-field w-32">
              <option value="">Tous</option>
              <option value="Simple">Simple</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Grille des chambres -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div
          v-for="room in filteredRooms"
          :key="room.number"
          class="card hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 cursor-pointer"
          @click="selectRoom(room)"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Chambre {{ room.number }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ room.type }} • Étage {{ room.floor }}</p>
            </div>
            <span class="status-badge" :class="getStatusClass(room.status)">
              {{ getStatusText(room.status) }}
            </span>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Prix/nuit:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(room.price) }}</span>
            </div>
            
            <div v-if="room.guest" class="bg-red-50 dark:bg-red-900/20 p-2 rounded">
              <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ room.guest.name }}</p>
              <p class="text-xs text-red-600 dark:text-red-400">Départ: {{ room.guest.checkout }}</p>
            </div>
            
            <div v-if="room.status === 'blocked' && room.blockedReason" class="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
              <p class="text-sm font-medium text-purple-800 dark:text-purple-300">{{ room.blockedReason }}</p>
              <p v-if="room.blockedUntil" class="text-xs text-purple-600 dark:text-purple-400">Jusqu'au: {{ room.blockedUntil }}</p>
            </div>
          </div>
          
          <div class="mt-4 flex space-x-2">
            <button
              v-if="room.status === 'available'"
              @click.stop="reserveRoom(room)"
              class="btn-primary text-sm px-3 py-1 flex-1"
            >
              Réserver
            </button>
            <button
              v-if="room.status === 'available'"
              @click.stop="blockRoom(room)"
              class="btn-warning text-sm px-3 py-1"
            >
              Bloquer
            </button>
            <button
              v-if="room.status === 'occupied'"
              @click.stop="checkOutRoom(room)"
              class="btn-secondary text-sm px-3 py-1 flex-1"
            >
              Check-out
            </button>
            <button
              v-if="room.status === 'blocked'"
              @click.stop="unblockRoom(room)"
              class="btn-success text-sm px-3 py-1 flex-1"
            >
              Débloquer
            </button>
          </div>
        </div>
      </div>

      <!-- Réservations -->
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Réservations</h3>
          <div class="flex space-x-2">
            <select v-model="reservationFilter" class="input-field w-40">
              <option value="">Toutes</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="checked-in">Arrivées</option>
              <option value="checked-out">Parties</option>
            </select>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Client</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Chambre</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Dates</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Invités</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Total</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Statut</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reservation in filteredReservations" :key="reservation.id" class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-3 px-4">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">{{ reservation.guestName }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ reservation.email }}</p>
                    <p v-if="reservation.phone" class="text-sm text-gray-500 dark:text-gray-400">{{ reservation.phone }}</p>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ reservation.roomNumber }}</td>
                <td class="py-3 px-4">
                  <div class="text-sm">
                    <p class="text-gray-900 dark:text-gray-100">{{ formatDate(reservation.checkin) }}</p>
                    <p class="text-gray-500 dark:text-gray-400">{{ formatDate(reservation.checkout) }}</p>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-900 dark:text-gray-100">{{ reservation.guests }}</td>
                <td class="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(reservation.totalPrice) }}</td>
                <td class="py-3 px-4">
                  <span class="status-badge" :class="getStatusClass(reservation.status)">
                    {{ getStatusText(reservation.status) }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex space-x-2">
                    <button
                      v-if="reservation.status === 'pending'"
                      @click="confirmReservation(reservation.id)"
                      class="btn-success text-xs px-2 py-1"
                    >
                      Confirmer
                    </button>
                    <button
                      v-if="reservation.status === 'confirmed'"
                      @click="checkInReservation(reservation.id)"
                      class="btn-primary text-xs px-2 py-1"
                    >
                      Check-in
                    </button>
                    <button
                      v-if="reservation.status === 'checked-in'"
                      @click="checkOutReservation(reservation.id)"
                      class="btn-secondary text-xs px-2 py-1"
                    >
                      Check-out
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal Nouvelle Réservation -->
    <div v-if="showNewReservation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Nouvelle Réservation</h3>
        
        <form @submit.prevent="createReservation" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom du client</label>
            <input v-model="newReservation.guestName" type="text" required class="input-field">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input v-model="newReservation.email" type="email" required class="input-field">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
            <input v-model="newReservation.phone" type="tel" class="input-field">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chambre</label>
            <select v-model="newReservation.roomNumber" required class="input-field">
              <option value="">Sélectionner une chambre</option>
              <option v-for="room in availableRoomsForReservation" :key="room.number" :value="room.number">
                {{ room.number }} - {{ room.type }} ({{ formatCurrency(room.price) }}/nuit)
              </option>
            </select>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Arrivée</label>
              <input v-model="newReservation.checkin" type="date" required class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Départ</label>
              <input v-model="newReservation.checkout" type="date" required class="input-field">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre d'invités</label>
            <input v-model.number="newReservation.guests" type="number" min="1" max="4" required class="input-field">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
            <textarea v-model="newReservation.notes" rows="3" class="input-field"></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showNewReservation = false" class="btn-secondary">
              Annuler
            </button>
            <button type="submit" class="btn-primary">
              Créer Réservation
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Blocage Chambre -->
    <div v-if="showBlockModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Bloquer la Chambre {{ selectedRoom?.number }}</h3>
        
        <form @submit.prevent="confirmBlockRoom" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raison du blocage</label>
            <input v-model="blockReason" type="text" required class="input-field" placeholder="Ex: Rénovation, nettoyage...">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jusqu'au (optionnel)</label>
            <input v-model="blockUntil" type="date" class="input-field">
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showBlockModal = false" class="btn-secondary">
              Annuler
            </button>
            <button type="submit" class="btn-warning">
              Bloquer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import {
  rooms,
  reservations,
  totalRooms,
  formatCurrency,
  updateRoomStatus,
  addReservation,
  blockRoom as blockRoomAction,
  checkInReservation,
  checkOutReservation,
  type Room
} from '../store'

// État local
const selectedFloor = ref<string | number>('')
const selectedStatus = ref('')
const selectedType = ref('')
const reservationFilter = ref('')
const showNewReservation = ref(false)
const showBlockModal = ref(false)
const selectedRoom = ref<Room | null>(null)
const blockReason = ref('')
const blockUntil = ref('')

// Formulaire nouvelle réservation
const newReservation = ref({
  guestName: '',
  email: '',
  phone: '',
  roomNumber: '',
  checkin: '',
  checkout: '',
  guests: 1,
  notes: ''
})

// Computed properties
const floors = computed(() => [...new Set(rooms.value.map(room => room.floor))].sort())

const availableRooms = computed(() => rooms.value.filter(r => r.status === 'available').length)
const occupiedRooms = computed(() => rooms.value.filter(r => r.status === 'occupied').length)
const maintenanceRooms = computed(() => rooms.value.filter(r => r.status === 'maintenance').length)
const blockedRooms = computed(() => rooms.value.filter(r => r.status === 'blocked').length)

const filteredRooms = computed(() => {
  return rooms.value.filter(room => {
    return (!selectedFloor.value || room.floor === Number(selectedFloor.value)) &&
           (!selectedStatus.value || room.status === selectedStatus.value) &&
           (!selectedType.value || room.type === selectedType.value)
  })
})

const filteredReservations = computed(() => {
  return reservations.value.filter(reservation => {
    return !reservationFilter.value || reservation.status === reservationFilter.value
  })
})

const availableRoomsForReservation = computed(() => {
  return rooms.value.filter(room => room.status === 'available')
})

// Fonctions utilitaires
const getStatusClass = (status: string) => {
  switch (status) {
    case 'available': return 'status-available'
    case 'occupied': return 'status-occupied'
    case 'maintenance': return 'status-maintenance'
    case 'blocked': return 'status-blocked'
    case 'pending': return 'status-pending'
    case 'confirmed': return 'status-confirmed'
    case 'checked-in': return 'status-checked-in'
    case 'checked-out': return 'status-checked-out'
    default: return 'status-pending'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return 'Disponible'
    case 'occupied': return 'Occupée'
    case 'maintenance': return 'Maintenance'
    case 'blocked': return 'Bloquée'
    case 'pending': return 'En attente'
    case 'confirmed': return 'Confirmé'
    case 'checked-in': return 'Arrivé'
    case 'checked-out': return 'Parti'
    default: return 'Inconnu'
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR')
}

// Actions
const selectRoom = (room: any) => {
  selectedRoom.value = room
}

const reserveRoom = (room: any) => {
  newReservation.value.roomNumber = room.number
  showNewReservation.value = true
}

const blockRoom = (room: any) => {
  selectedRoom.value = room
  showBlockModal.value = true
}

const confirmBlockRoom = () => {
  if (selectedRoom.value) {
    blockRoomAction(selectedRoom.value.number, blockReason.value, blockUntil.value)
    showBlockModal.value = false
    blockReason.value = ''
    blockUntil.value = ''
    selectedRoom.value = null
  }
}

const unblockRoom = (room: any) => {
  updateRoomStatus(room.number, 'available')
}

const checkOutRoom = (room: any) => {
  updateRoomStatus(room.number, 'available')
}

const confirmReservation = (reservationId: number) => {
  const reservation = reservations.value.find(r => r.id === reservationId)
  if (reservation) {
    reservation.status = 'confirmed'
  }
}

const createReservation = () => {
  const selectedRoomData = rooms.value.find(r => r.number === newReservation.value.roomNumber)
  if (!selectedRoomData) return
  
  const checkinDate = new Date(newReservation.value.checkin)
  const checkoutDate = new Date(newReservation.value.checkout)
  const nights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24))
  const totalPrice = nights * selectedRoomData.price
  
  addReservation({
    guestName: newReservation.value.guestName,
    email: newReservation.value.email,
    phone: newReservation.value.phone,
    roomNumber: newReservation.value.roomNumber,
    checkin: newReservation.value.checkin,
    checkout: newReservation.value.checkout,
    status: 'pending',
    guests: newReservation.value.guests,
    totalPrice,
    notes: newReservation.value.notes
  })
  
  // Réinitialiser le formulaire
  newReservation.value = {
    guestName: '',
    email: '',
    phone: '',
    roomNumber: '',
    checkin: '',
    checkout: '',
    guests: 1,
    notes: ''
  }
  
  showNewReservation.value = false
}
</script>
