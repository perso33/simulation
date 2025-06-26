<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              Réception - Enregistrement
            </h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Gérez les arrivées et départs des clients
            </p>
          </div>
          <div class="flex space-x-4">
            <button
              @click="showNewReservation = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <i class="fas fa-plus mr-2"></i>
              Nouvelle réservation
            </button>
            <button
              @click="showWalkIn = true"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <i class="fas fa-user-plus mr-2"></i>
              Walk-in
            </button>
          </div>
        </div>
      </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <i class="fas fa-calendar-check text-blue-600 dark:text-blue-400"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Arrivées aujourd'hui</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ todayArrivals }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <i class="fas fa-door-open text-green-600 dark:text-green-400"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Départs aujourd'hui</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ todayDepartures }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <i class="fas fa-clock text-yellow-600 dark:text-yellow-400"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">En attente</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ pendingReservations }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <i class="fas fa-bed text-purple-600 dark:text-purple-400"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Chambres libres</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ availableRooms }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglets -->
      <div class="mb-6">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            <i :class="tab.icon + ' mr-2'"></i>
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      <div v-if="activeTab === 'arrivals'" class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Arrivées du jour</h3>
          </div>
          <div class="p-6">
            <div v-if="filteredArrivals.length === 0" class="text-center py-8">
              <i class="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
              <p class="text-gray-500 dark:text-gray-400">Aucune arrivée prévue aujourd'hui</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="reservation in filteredArrivals"
                :key="reservation.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <i class="fas fa-user text-blue-600 dark:text-blue-400"></i>
                        </div>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ reservation.guestName }}</h4>
                        <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span><i class="fas fa-door-open mr-1"></i>Chambre {{ reservation.roomNumber }}</span>
                          <span><i class="fas fa-users mr-1"></i>{{ reservation.guests }} {{ reservation.guests > 1 ? 'personnes' : 'personne' }}</span>
                          <span><i class="fas fa-calendar mr-1"></i>{{ formatDate(reservation.checkin) }} - {{ formatDate(reservation.checkout) }}</span>
                        </div>
                        <div class="mt-1 text-sm">
                          <span class="text-gray-600 dark:text-gray-400">Email:</span>
                          <span class="ml-1 text-gray-900 dark:text-white">{{ reservation.email }}</span>
                          <span v-if="reservation.phone" class="ml-4 text-gray-600 dark:text-gray-400">Tél:</span>
                          <span v-if="reservation.phone" class="ml-1 text-gray-900 dark:text-white">{{ reservation.phone }}</span>
                        </div>
                        <div v-if="reservation.notes" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <i class="fas fa-sticky-note mr-1"></i>{{ reservation.notes }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        reservation.status === 'confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        reservation.status === 'checked-in' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      ]"
                    >
                      {{ getStatusLabel(reservation.status) }}
                    </span>
                    <div class="text-right">
                      <p class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(reservation.totalPrice) }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
                    </div>
                    <button
                      v-if="reservation.status === 'confirmed'"
                      @click="checkIn(reservation)"
                      class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i class="fas fa-sign-in-alt mr-2"></i>Check-in
                    </button>
                    <button
                      v-if="reservation.status === 'pending'"
                      @click="confirmReservation(reservation)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i class="fas fa-check mr-2"></i>Confirmer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'departures'" class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Départs du jour</h3>
          </div>
          <div class="p-6">
            <div v-if="filteredDepartures.length === 0" class="text-center py-8">
              <i class="fas fa-door-closed text-4xl text-gray-400 mb-4"></i>
              <p class="text-gray-500 dark:text-gray-400">Aucun départ prévu aujourd'hui</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="reservation in filteredDepartures"
                :key="reservation.id"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <div class="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                          <i class="fas fa-user text-red-600 dark:text-red-400"></i>
                        </div>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ reservation.guestName }}</h4>
                        <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span><i class="fas fa-door-open mr-1"></i>Chambre {{ reservation.roomNumber }}</span>
                          <span><i class="fas fa-calendar mr-1"></i>Départ: {{ formatDate(reservation.checkout) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        reservation.status === 'checked-in' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      ]"
                    >
                      {{ getStatusLabel(reservation.status) }}
                    </span>
                    <button
                      v-if="reservation.status === 'checked-in'"
                      @click="checkOut(reservation)"
                      class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i class="fas fa-sign-out-alt mr-2"></i>Check-out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'occupied'" class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chambres occupées</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="room in occupiedRoomsList"
                :key="room.number"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Chambre {{ room.number }}</h4>
                  <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium">
                    Occupée
                  </span>
                </div>
                <div class="space-y-2">
                  <p class="text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Client:</span>
                    <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ room.guest?.name }}</span>
                  </p>
                  <p class="text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Type:</span>
                    <span class="ml-1 text-gray-900 dark:text-white">{{ room.type }}</span>
                  </p>
                  <p class="text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Départ:</span>
                    <span class="ml-1 text-gray-900 dark:text-white">{{ formatDate(room.guest?.checkout) }}</span>
                  </p>
                  <p class="text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Prix:</span>
                    <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ formatCurrency(room.price) }}/nuit</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nouvelle Réservation -->
    <div v-if="showNewReservation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Nouvelle réservation</h3>
            <button @click="showNewReservation = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <form @submit.prevent="createReservation" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom du client*</label>
              <input
                v-model="newReservation.guestName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email*</label>
              <input
                v-model="newReservation.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Téléphone</label>
              <input
                v-model="newReservation.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de personnes*</label>
              <select
                v-model="newReservation.guests"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
                <option value="3">3 personnes</option>
                <option value="4">4 personnes</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date d'arrivée*</label>
              <input
                v-model="newReservation.checkin"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date de départ*</label>
              <input
                v-model="newReservation.checkout"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chambre*</label>
              <select
                v-model="newReservation.roomNumber"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Sélectionner une chambre</option>
                <option
                  v-for="room in availableRoomsList"
                  :key="room.number"
                  :value="room.number"
                >
                  Chambre {{ room.number }} - {{ room.type }} ({{ formatCurrency(room.price) }}/nuit)
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statut</label>
              <select
                v-model="newReservation.status"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea
              v-model="newReservation.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Notes additionnelles..."
            ></textarea>
          </div>
          <div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">
                Total: {{ formatCurrency(calculateTotal()) }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ calculateNights() }} {{ calculateNights() > 1 ? 'nuits' : 'nuit' }}
              </p>
            </div>
            <div class="flex space-x-3">
              <button
                type="button"
                @click="showNewReservation = false"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Créer la réservation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Walk-in -->
    <div v-if="showWalkIn" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-xl w-full m-4">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Enregistrement Walk-in</h3>
            <button @click="showWalkIn = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <form @submit.prevent="createWalkIn" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom du client*</label>
              <input
                v-model="walkIn.guestName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email*</label>
              <input
                v-model="walkIn.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Téléphone</label>
              <input
                v-model="walkIn.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de personnes*</label>
              <select
                v-model="walkIn.guests"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
                <option value="3">3 personnes</option>
                <option value="4">4 personnes</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de nuits*</label>
              <select
                v-model="walkIn.nights"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="1">1 nuit</option>
                <option value="2">2 nuits</option>
                <option value="3">3 nuits</option>
                <option value="4">4 nuits</option>
                <option value="5">5 nuits</option>
                <option value="7">1 semaine</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chambre*</label>
              <select
                v-model="walkIn.roomNumber"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Sélectionner une chambre</option>
                <option
                  v-for="room in availableRoomsList"
                  :key="room.number"
                  :value="room.number"
                >
                  Chambre {{ room.number }} - {{ room.type }} ({{ formatCurrency(room.price) }}/nuit)
                </option>
              </select>
            </div>
          </div>
          <div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">
                Total: {{ formatCurrency(calculateWalkInTotal()) }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ walkIn.nights }} {{ walkIn.nights > 1 ? 'nuits' : 'nuit' }}
              </p>
            </div>
            <div class="flex space-x-3">
              <button
                type="button"
                @click="showWalkIn = false"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Enregistrer directement
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  reservations, 
  rooms, 
  availableRooms,
  formatCurrency,
  addReservation,
  checkInReservation,
  checkOutReservation,
  type Reservation
} from '../store'

// État des onglets
const activeTab = ref('arrivals')
const tabs = [
  { id: 'arrivals', name: 'Arrivées', icon: 'fas fa-calendar-check' },
  { id: 'departures', name: 'Départs', icon: 'fas fa-door-open' },
  { id: 'occupied', name: 'Chambres occupées', icon: 'fas fa-bed' }
]

// Modales
const showNewReservation = ref(false)
const showWalkIn = ref(false)

// Formulaires
const newReservation = ref({
  guestName: '',
  email: '',
  phone: '',
  roomNumber: '',
  checkin: '',
  checkout: '',
  status: 'confirmed' as Reservation['status'],
  guests: 1,
  notes: ''
})

const walkIn = ref({
  guestName: '',
  email: '',
  phone: '',
  roomNumber: '',
  guests: 1,
  nights: 1
})

// Computed properties
const todayArrivals = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return reservations.value.filter(r => r.checkin === today).length
})

const todayDepartures = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return reservations.value.filter(r => r.checkout === today && r.status === 'checked-in').length
})

const pendingReservations = computed(() => {
  return reservations.value.filter(r => r.status === 'pending').length
})

const filteredArrivals = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return reservations.value.filter(r => r.checkin === today)
})

const filteredDepartures = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return reservations.value.filter(r => r.checkout === today && r.status === 'checked-in')
})

const occupiedRoomsList = computed(() => {
  return rooms.value.filter(r => r.status === 'occupied')
})

const availableRoomsList = computed(() => {
  return rooms.value.filter(r => r.status === 'available')
})

// Méthodes
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const getStatusLabel = (status: string) => {
  const labels = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    'checked-in': 'Enregistré',
    'checked-out': 'Parti',
    cancelled: 'Annulée'
  }
  return labels[status as keyof typeof labels] || status
}

const calculateTotal = () => {
  if (!newReservation.value.roomNumber || !newReservation.value.checkin || !newReservation.value.checkout) {
    return 0
  }
  const room = rooms.value.find(r => r.number === newReservation.value.roomNumber)
  if (!room) return 0
  
  const nights = calculateNights()
  return room.price * nights
}

const calculateNights = () => {
  if (!newReservation.value.checkin || !newReservation.value.checkout) return 0
  const checkin = new Date(newReservation.value.checkin)
  const checkout = new Date(newReservation.value.checkout)
  const diffTime = Math.abs(checkout.getTime() - checkin.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const calculateWalkInTotal = () => {
  if (!walkIn.value.roomNumber) return 0
  const room = rooms.value.find(r => r.number === walkIn.value.roomNumber)
  if (!room) return 0
  return room.price * walkIn.value.nights
}

const createReservation = () => {
  const totalPrice = calculateTotal()
  addReservation({
    guestName: newReservation.value.guestName,
    email: newReservation.value.email,
    phone: newReservation.value.phone,
    roomNumber: newReservation.value.roomNumber,
    checkin: newReservation.value.checkin,
    checkout: newReservation.value.checkout,
    status: newReservation.value.status,
    guests: newReservation.value.guests,
    totalPrice,
    notes: newReservation.value.notes
  })
  
  // Reset form
  newReservation.value = {
    guestName: '',
    email: '',
    phone: '',
    roomNumber: '',
    checkin: '',
    checkout: '',
    status: 'confirmed',
    guests: 1,
    notes: ''
  }
  showNewReservation.value = false
}

const createWalkIn = () => {
  const totalPrice = calculateWalkInTotal()
  const today = new Date()
  const checkout = new Date(today)
  checkout.setDate(checkout.getDate() + walkIn.value.nights)
  
  const reservation = {
    guestName: walkIn.value.guestName,
    email: walkIn.value.email,
    phone: walkIn.value.phone,
    roomNumber: walkIn.value.roomNumber,
    checkin: today.toISOString().split('T')[0],
    checkout: checkout.toISOString().split('T')[0],
    status: 'checked-in' as Reservation['status'],
    guests: walkIn.value.guests,
    totalPrice
  }
  
  addReservation(reservation)
  
  // Mettre à jour le statut de la chambre
  const room = rooms.value.find(r => r.number === walkIn.value.roomNumber)
  if (room) {
    room.status = 'occupied'
    room.guest = {
      name: walkIn.value.guestName,
      checkout: reservation.checkout
    }
  }
  
  // Reset form
  walkIn.value = {
    guestName: '',
    email: '',
    phone: '',
    roomNumber: '',
    guests: 1,
    nights: 1
  }
  showWalkIn.value = false
}

const checkIn = (reservation: Reservation) => {
  checkInReservation(reservation.id)
}

const checkOut = (reservation: Reservation) => {
  checkOutReservation(reservation.id)
}

const confirmReservation = (reservation: Reservation) => {
  reservation.status = 'confirmed'
}

// Initialisation
onMounted(() => {
  // Définir la date d'aujourd'hui par défaut
  const today = new Date().toISOString().split('T')[0]
  newReservation.value.checkin = today
  
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  newReservation.value.checkout = tomorrow.toISOString().split('T')[0]
})
</script>
