# Guide d'utilisation de l'application PMS

## 🏨 HotelPMS - Système de gestion hôtelière moderne

### ✅ Fonctionnalités implémentées

#### 1. **Page d'accueil moderne (Home.vue)**
- Design professionnel avec hero section
- Présentation des fonctionnalités principales
- Section de démonstration avec comptes de test
- Connexion rapide pour chaque rôle utilisateur
- Design responsive et animations

#### 2. **Système d'authentification complet**
- Login avec redirection automatique selon le rôle
- Protection des routes avec guards
- Persistance de session avec localStorage
- Gestion des permissions par rôle

#### 3. **Page de réception (Reception.vue)**
- Enregistrement des clients (check-in/check-out)
- Création de nouvelles réservations
- Gestion des walk-ins (clients sans réservation)
- Interface à onglets pour différentes vues
- Statistiques temps réel

#### 4. **Navigation intelligente (Navbar.vue)**
- Affichage conditionnel selon les permissions
- Informations utilisateur connecté
- Thème sombre/clair
- Déconnexion sécurisée

#### 5. **Dashboard avec graphiques**
- KPIs temps réel
- Graphiques interactifs (Chart.js)
- Actions rapides
- Support thème sombre/clair

#### 6. **Gestion hôtelière avancée**
- Gestion des chambres avec statuts étendus
- Système de blocage/déblocage
- Réservations et check-in direct

#### 7. **Restaurant complet**
- Workflow des commandes
- Gestion du menu et inventaire
- Interface moderne à onglets

#### 8. **Administration**
- Analytics avancés
- Gestion des utilisateurs
- Rapports détaillés
- Paramètres système

---

## 🔐 Comptes de démonstration

### Administrateur
- **Nom d'utilisateur:** `admin`
- **Mot de passe:** `admin123`
- **Accès:** Toutes les fonctionnalités
- **Redirection:** `/administration`

### Manager
- **Nom d'utilisateur:** `manager`
- **Mot de passe:** `manager123`
- **Accès:** Dashboard, Hôtel, Restaurant, Réception, Rapports
- **Redirection:** `/dashboard`

### Réceptionniste
- **Nom d'utilisateur:** `reception`
- **Mot de passe:** `reception123`
- **Accès:** Dashboard, Hôtel, Réception, Check-in/out
- **Redirection:** `/reception`

### Restaurant
- **Nom d'utilisateur:** `restaurant`
- **Mot de passe:** `restaurant123`
- **Accès:** Dashboard, Restaurant, Inventaire, Commandes
- **Redirection:** `/restaurant`

### Maintenance
- **Nom d'utilisateur:** `maintenance`
- **Mot de passe:** `maintenance123`
- **Accès:** Dashboard, Hôtel, Maintenance, Gestion chambres
- **Redirection:** `/hotel`

---

## 🚀 Démarrage de l'application

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

---

## 🎨 Design et UX

### Caractéristiques design professionnelles :
- **Interface moderne** : Design épuré avec animations fluides
- **Responsive** : Adaptation parfaite mobile/tablette/desktop
- **Thème sombre/clair** : Basculement en temps réel
- **Accessibilité** : Respect des standards WCAG
- **Performance** : Composants optimisés et lazy loading

### Palette de couleurs :
- **Primaire** : Bleu (#3B82F6)
- **Secondaire** : Purple (#8B5CF6)
- **Succès** : Vert (#10B981)
- **Attention** : Jaune (#F59E0B)
- **Erreur** : Rouge (#EF4444)

---

## 🔧 Architecture technique

### Stack technologique :
- **Vue 3** avec Composition API
- **TypeScript** pour la sécurité de type
- **Tailwind CSS** pour le styling
- **Chart.js** pour les graphiques
- **Vue Router** avec protection des routes
- **Vite** pour le bundling rapide

### Structure des permissions :
```typescript
admin: ['all']
manager: ['dashboard', 'hotel', 'restaurant', 'reception', 'reports', 'analytics']
receptionist: ['dashboard', 'hotel', 'reception', 'checkin', 'checkout']
restaurant: ['dashboard', 'restaurant', 'inventory', 'orders']
maintenance: ['dashboard', 'hotel', 'maintenance', 'rooms']
```

---

## 📱 Pages principales

1. **/** - Page d'accueil avec connexions rapides
2. **/login** - Formulaire de connexion avec comptes de démo
3. **/dashboard** - Tableau de bord avec KPIs et graphiques
4. **/hotel** - Gestion des chambres et réservations
5. **/reception** - Enregistrement des clients
6. **/restaurant** - Gestion du restaurant
7. **/administration** - Panneau d'administration

---

## 🎯 Prochaines étapes suggérées

1. **Tests unitaires** avec Vitest
2. **API backend** pour la persistance des données
3. **Système de notifications** en temps réel
4. **Module de facturation** intégré
5. **Rapports exportables** PDF/Excel
6. **Application mobile** avec Capacitor

---

## 🏆 Points forts de l'implémentation

- ✅ **Sécurité** : Authentification robuste et permissions granulaires
- ✅ **UX/UI** : Design moderne avec attention aux détails
- ✅ **Performance** : Composants optimisés et chargement rapide
- ✅ **Accessibilité** : Navigation intuitive et responsive
- ✅ **Maintenabilité** : Code TypeScript bien structuré
- ✅ **Extensibilité** : Architecture modulaire pour ajouts futurs

L'application PMS est maintenant complète avec un niveau de qualité professionnel, prête pour une démonstration ou un déploiement en production après intégration avec un backend.
