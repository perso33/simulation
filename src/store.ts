// Store simulé pour gérer les données du PMS
import { ref, computed } from 'vue'

// Types
export interface Room {
  number: string
  type: string
  floor: number
  status: 'available' | 'occupied' | 'maintenance' | 'blocked'
  price: number
  guest?: {
    name: string
    checkout: string
  }
  blockedReason?: string
  blockedUntil?: string
}

export interface Order {
  id: number
  table: number
  time: string
  status: 'pending' | 'preparing' | 'ready' | 'delivered'
  items: OrderItem[]
  total: number
  waiter?: string
}

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Reservation {
  id: number
  guestName: string
  email: string
  phone?: string
  roomNumber: string
  checkin: string
  checkout: string
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
  guests: number
  totalPrice: number
  notes?: string
}

// État global
export const rooms = ref<Room[]>([
  { number: '101', type: 'Simple', floor: 1, status: 'available', price: 95 },
  { number: '102', type: 'Double', floor: 1, status: 'occupied', price: 140, guest: { name: 'Marie Dupont', checkout: '2025-06-26' } },
  { number: '103', type: 'Suite', floor: 1, status: 'available', price: 215 },
  { number: '201', type: 'Simple', floor: 2, status: 'occupied', price: 95, guest: { name: 'Jean Martin', checkout: '2025-06-27' } },
  { number: '202', type: 'Double', floor: 2, status: 'maintenance', price: 140 },
  { number: '203', type: 'Suite', floor: 2, status: 'available', price: 215 },
  { number: '301', type: 'Simple', floor: 3, status: 'available', price: 95 },
  { number: '302', type: 'Double', floor: 3, status: 'occupied', price: 140, guest: { name: 'Sophie Laurent', checkout: '2025-06-25' } },
  { number: '303', type: 'Suite', floor: 3, status: 'available', price: 215 },
  { number: '401', type: 'Suite', floor: 4, status: 'available', price: 325 },
  { number: '402', type: 'Suite', floor: 4, status: 'occupied', price: 325, guest: { name: 'Pierre Dubois', checkout: '2025-06-28' } },
  { number: '403', type: 'Suite', floor: 4, status: 'available', price: 325 }
])

export const orders = ref<Order[]>([
  {
    id: 1001,
    table: 12,
    time: '12:30',
    status: 'pending',
    items: [
      { id: 1, name: 'Salade César', price: 13.50, quantity: 1 },
      { id: 2, name: 'Steak frites', price: 24.00, quantity: 1 }
    ],
    total: 37.50
  },
  {
    id: 1002,
    table: 7,
    time: '12:45',
    status: 'preparing',
    items: [
      { id: 3, name: 'Pizza Margherita', price: 15.00, quantity: 2 },
      { id: 4, name: 'Tiramisu', price: 8.50, quantity: 1 }
    ],
    total: 38.50
  },
  {
    id: 1003,
    table: 3,
    time: '13:15',
    status: 'ready',
    items: [
      { id: 5, name: 'Poisson du jour', price: 20.00, quantity: 1 }
    ],
    total: 20.00
  }
])

export const reservations = ref<Reservation[]>([
  { id: 1, guestName: 'Alice Moreau', email: 'alice@email.com', phone: '0123456789', roomNumber: '104', checkin: '2025-06-25', checkout: '2025-06-27', status: 'pending', guests: 2, totalPrice: 280, notes: 'Anniversaire de mariage' },
  { id: 2, guestName: 'Bob Wilson', email: 'bob@email.com', phone: '0987654321', roomNumber: '205', checkin: '2025-06-25', checkout: '2025-06-26', status: 'confirmed', guests: 1, totalPrice: 140 },
  { id: 3, guestName: 'Claire Chen', email: 'claire@email.com', phone: '0555123456', roomNumber: '304', checkin: '2025-06-25', checkout: '2025-06-29', status: 'confirmed', guests: 3, totalPrice: 560, notes: 'Voyage d\'affaires' }
])

// Computed properties
export const availableRooms = computed(() => 
  rooms.value.filter(room => room.status === 'available').length
)

export const occupiedRooms = computed(() => 
  rooms.value.filter(room => room.status === 'occupied').length
)

export const totalRooms = computed(() => rooms.value.length)

export const occupancyRate = computed(() => 
  Math.round((occupiedRooms.value / totalRooms.value) * 100)
)

export const todayRevenue = computed(() => {
  const hotelRevenue = occupiedRooms.value * 150 // Prix moyen
  const restaurantRevenue = orders.value.reduce((sum, order) => sum + order.total, 0)
  return hotelRevenue + restaurantRevenue
})

// Actions
export const updateRoomStatus = (roomNumber: string, status: Room['status']) => {
  const room = rooms.value.find(r => r.number === roomNumber)
  if (room) {
    room.status = status
    if (status !== 'occupied') {
      delete room.guest
    }
    if (status !== 'blocked') {
      delete room.blockedReason
      delete room.blockedUntil
    }
  }
}

export const blockRoom = (roomNumber: string, reason: string, until?: string) => {
  const room = rooms.value.find(r => r.number === roomNumber)
  if (room) {
    room.status = 'blocked'
    room.blockedReason = reason
    room.blockedUntil = until
    delete room.guest
  }
}

export const checkInReservation = (reservationId: number) => {
  const reservation = reservations.value.find(r => r.id === reservationId)
  if (reservation) {
    reservation.status = 'checked-in'
    const room = rooms.value.find(r => r.number === reservation.roomNumber)
    if (room) {
      room.status = 'occupied'
      room.guest = {
        name: reservation.guestName,
        checkout: reservation.checkout
      }
    }
  }
}

export const checkOutReservation = (reservationId: number) => {
  const reservation = reservations.value.find(r => r.id === reservationId)
  if (reservation) {
    reservation.status = 'checked-out'
    const room = rooms.value.find(r => r.number === reservation.roomNumber)
    if (room) {
      room.status = 'available'
      delete room.guest
    }
  }
}

export const addReservation = (reservation: Omit<Reservation, 'id'>) => {
  const newId = Math.max(...reservations.value.map(r => r.id), 0) + 1
  reservations.value.push({ ...reservation, id: newId })
}

export const updateOrderStatus = (orderId: number, status: Order['status']) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = status
  }
}

export const addOrder = (order: Omit<Order, 'id'>) => {
  const newId = Math.max(...orders.value.map(o => o.id), 1000) + 1
  orders.value.push({ ...order, id: newId })
}

// Types pour l'authentification
export interface Guest {
  id?: number
  name: string
  email: string
  phone?: string
  nationality?: string
  idNumber?: string
  address?: string
  company?: string
  notes?: string
  checkinTime?: string
  checkoutTime?: string
}

export interface User {
  id: number
  username: string
  password: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'receptionist' | 'restaurant' | 'maintenance'
  avatar?: string
  permissions: string[]
  lastLogin?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

// État d'authentification
export const authState = ref<AuthState>({
  isAuthenticated: false,
  user: null,
  token: null
})

// Utilisateurs avec identifiants
export const users = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Administrateur Principal',
    email: 'admin@hotel-prestige.com',
    role: 'admin',
    permissions: ['all'],
    lastLogin: '2025-06-25T14:30:00'
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    name: 'Manager Hôtel',
    email: 'manager@hotel-prestige.com',
    role: 'manager',
    permissions: ['dashboard', 'hotel', 'restaurant', 'reception', 'reports', 'analytics'],
    lastLogin: '2025-06-25T09:15:00'
  },
  {
    id: 3,
    username: 'reception',
    password: 'reception123',
    name: 'Marie Dubois',
    email: 'marie.dubois@hotel-prestige.com',
    role: 'receptionist',
    permissions: ['dashboard', 'hotel', 'reception', 'checkin', 'checkout'],
    lastLogin: '2025-06-25T08:00:00'
  },
  {
    id: 4,
    username: 'restaurant',
    password: 'restaurant123',
    name: 'Chef Laurent',
    email: 'chef.laurent@hotel-prestige.com',
    role: 'restaurant',
    permissions: ['dashboard', 'restaurant', 'inventory', 'orders'],
    lastLogin: '2025-06-24T18:45:00'
  },
  {
    id: 5,
    username: 'maintenance',
    password: 'maintenance123',
    name: 'Technicien Paul',
    email: 'paul.tech@hotel-prestige.com',
    role: 'maintenance',
    permissions: ['dashboard', 'hotel', 'maintenance', 'rooms'],
    lastLogin: '2025-06-24T16:20:00'
  }
])

// Actions d'authentification
export const login = (username: string, password: string): User | null => {
  const user = users.value.find(u => u.username === username && u.password === password)
  if (user) {
    authState.value = {
      isAuthenticated: true,
      user: { ...user },
      token: `token_${user.id}_${Date.now()}`
    }
    user.lastLogin = new Date().toISOString()
    localStorage.setItem('pms_auth', JSON.stringify(authState.value))
    return user
  }
  return null
}

export const logout = () => {
  authState.value = {
    isAuthenticated: false,
    user: null,
    token: null
  }
  localStorage.removeItem('pms_auth')
}

export const initAuth = () => {
  const saved = localStorage.getItem('pms_auth')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed.isAuthenticated && parsed.user && parsed.token) {
        authState.value = parsed
      }
    } catch (e) {
      localStorage.removeItem('pms_auth')
    }
  }
}

export const hasPermission = (permission: string): boolean => {
  if (!authState.value.user) return false
  return authState.value.user.permissions.includes('all') || 
         authState.value.user.permissions.includes(permission)
}

export const getDefaultRouteForRole = (role: string): string => {
  const roleRoutes = {
    admin: '/administration',
    manager: '/dashboard',
    receptionist: '/reception',
    restaurant: '/restaurant',
    maintenance: '/hotel'
  }
  return roleRoutes[role as keyof typeof roleRoutes] || '/dashboard'
}

// Utilitaires
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
