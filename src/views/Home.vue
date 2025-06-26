<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
    <!-- Navigation -->
    <nav class="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🏨 HotelPMS
              </h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/login" 
              class="btn-secondary"
            >
              Connexion
            </router-link>
            <button class="btn-primary">
              Démonstration
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <!-- Hero Content -->
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Système de Gestion
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hôtelière
            </span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Une solution complète pour gérer votre hôtel et restaurant avec élégance et efficacité. 
            Interface moderne, analytics en temps réel et outils professionnels.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/login" class="btn-primary text-lg px-8 py-3">
              Commencer maintenant
            </router-link>
            <button 
              @click="scrollToDemo"
              class="btn-secondary text-lg px-8 py-3"
            >
              Voir la démonstration
            </button>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card hover:shadow-lg transition-all duration-300 group">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Gestion Hôtelière</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Réservations, check-in/out, gestion des chambres et suivi d'occupation en temps réel.
            </p>
          </div>

          <div class="card hover:shadow-lg transition-all duration-300 group">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-1a1 1 0 100 2v3a1 1 0 11-2 0v-3a1 1 0 000-2z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Restaurant</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Commandes, gestion des menus, inventaire et suivi des performances du restaurant.
            </p>
          </div>

          <div class="card hover:shadow-lg transition-all duration-300 group">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Administration</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Tableaux de bord, rapports détaillés, gestion du personnel et analytics avancés.
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Demo Section -->
    <section ref="demoSection" class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Interface moderne et intuitive
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez comment HotelPMS simplifie la gestion de votre établissement
          </p>
        </div>

        <!-- Demo Screenshots -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Dashboard en temps réel</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Visualisez toutes les métriques importantes de votre établissement en un coup d'œil. 
              Taux d'occupation, revenus, commandes en cours et bien plus.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Métriques en temps réel
              </li>
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Interface responsive
              </li>
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Actions rapides
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">Aperçu Dashboard</h4>
                <span class="text-sm text-green-600">● En ligne</span>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">85%</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Occupation</div>
                </div>
                <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">$13,450</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Revenus</div>
                </div>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Login Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tester la démo
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connectez-vous avec l'un des comptes de démonstration pour explorer toutes les fonctionnalités
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <!-- Administrateur -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900 dark:text-gray-100">Administrateur</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Accès complet</p>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Nom d'utilisateur:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">admin</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Mot de passe:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">admin123</span>
                </div>
              </div>
              <button
                @click="quickLogin('admin', 'admin123')"
                class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Connexion rapide
              </button>
            </div>

            <!-- Manager -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900 dark:text-gray-100">Manager</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Gestion complète</p>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Nom d'utilisateur:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">manager</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Mot de passe:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">manager123</span>
                </div>
              </div>
              <button
                @click="quickLogin('manager', 'manager123')"
                class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Connexion rapide
              </button>
            </div>

            <!-- Réceptionniste -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 9h14l-7-7zM3 11v7a1 1 0 001 1h3v-4a1 1 0 112 0v4h3a1 1 0 001-1v-7H3z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900 dark:text-gray-100">Réceptionniste</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Check-in/out</p>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Nom d'utilisateur:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">reception</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Mot de passe:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">reception123</span>
                </div>
              </div>
              <button
                @click="quickLogin('reception', 'reception123')"
                class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Connexion rapide
              </button>
            </div>

            <!-- Restaurant -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zM15 6a1 1 0 100-2h-2a1 1 0 100 2h2z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900 dark:text-gray-100">Restaurant</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Commandes & menu</p>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Nom d'utilisateur:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">restaurant</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Mot de passe:</span>
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">restaurant123</span>
                </div>
              </div>
              <button
                @click="quickLogin('restaurant', 'restaurant123')"
                class="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Connexion rapide
              </button>
            </div>

            <!-- Maintenance -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900">Maintenance</h3>
                  <p class="text-sm text-gray-500">Technique</p>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Nom d'utilisateur:</span>
                  <span class="font-mono bg-gray-100 px-2 py-1 rounded">maintenance</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Mot de passe:</span>
                  <span class="font-mono bg-gray-100 px-2 py-1 rounded">maintenance123</span>
                </div>
              </div>
              <button
                @click="quickLogin('maintenance', 'maintenance123')"
                class="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Connexion rapide
              </button>
            </div>

            <!-- Login manuel -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900">Connexion manuelle</h3>
                  <p class="text-sm text-gray-500">Formulaire complet</p>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-4">
                Utilisez le formulaire de connexion traditionnel si vous préférez.
              </p>
              <router-link
                to="/login"
                class="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Aller au login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Prêt à moderniser votre établissement ?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Rejoignez des centaines d'hôteliers qui font confiance à HotelPMS
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/login" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Essayer gratuitement
          </router-link>
          <button class="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
            Contacter l'équipe
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">🏨 HotelPMS</h3>
          <p class="text-gray-400 mb-4">
            Solution complète de gestion hôtelière
          </p>
          <div class="text-sm text-gray-500">
            © 2025 HotelPMS. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, getDefaultRouteForRole } from '../store'

const router = useRouter()
const demoSection = ref<HTMLElement>()

const scrollToDemo = () => {
  demoSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const quickLogin = (username: string, password: string) => {
  const user = login(username, password)
  if (user) {
    const defaultRoute = getDefaultRouteForRole(user.role)
    router.push(defaultRoute)
  }
}
</script>

<style scoped>
.bg-grid-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
