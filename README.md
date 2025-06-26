# 🏨 Hotel PMS - Property Management System

Un système de gestion hôtelière moderne avec interface intuitive, thèmes adaptatifs et analytics avancées.

## ✨ Nouvelles Fonctionnalités

### 🎨 **Système de Thèmes**
- **Thème Clair/Sombre** : Basculez facilement entre les thèmes via le bouton dans la barre de navigation
- **Sauvegarde automatique** : Votre préférence de thème est mémorisée
- **Adaptation système** : Détection automatique de la préférence système au premier lancement

### 📊 **Dashboard Analytics Avancé**
- **Graphiques interactifs** : Utilisation de Chart.js pour des visualisations modernes
- **KPIs en temps réel** : Métriques importantes avec design amélioré
- **Graphique en donut** : Répartition des chambres par statut
- **Graphique linéaire** : Évolution des revenus sur 7 jours
- **Actions rapides** : Navigation facilitée vers les différentes sections

### 🏠 **Gestion Hôtel Améliorée**

#### **Gestion des Chambres**
- **Blocage de chambres** : Nouvelle fonctionnalité pour bloquer temporairement des chambres
  - Raison du blocage (maintenance, rénovation, etc.)
  - Période de blocage optionnelle
  - Déblocage en un clic
- **Statuts étendus** : Disponible, Occupée, Maintenance, **Bloquée**
- **Filtrage avancé** : Par étage, statut, type de chambre

#### **Système de Réservations Complet**
- **Création de réservations** : Formulaire complet avec validation
- **Gestion du cycle de vie** : Pending → Confirmed → Checked-in → Checked-out
- **Informations détaillées** : Nom, email, téléphone, nombre d'invités, notes
- **Calcul automatique** : Prix total basé sur la durée et le tarif chambre
- **Check-in/Check-out** : Actions directes depuis le dashboard et la page hôtel

### 🍽️ **Restaurant Optimisé**

#### **Gestion des Commandes**
- **Interface améliorée** : Cartes visuelles pour chaque commande
- **Workflow complet** : En attente → En préparation → Prêt → Livré
- **Filtrage** : Par statut et numéro de table
- **Nouvelle commande** : Interface intuitive pour créer des commandes

#### **Menu et Inventaire**
- **Gestion du menu** : Ajout/modification de plats avec descriptions
- **Contrôle disponibilité** : Activation/désactivation des plats
- **Inventaire intelligent** : Alertes stock bas, gestion des seuils
- **Catégorisation** : Organisation par types (entrées, plats, desserts)

### 📈 **Administration et Analytics**

#### **Analytics Avancées**
- **Tableau de bord KPI** : Métriques clés avec tendances
- **Graphiques multiples** : 
  - Évolution des revenus (30 jours)
  - Répartition par source de revenus
  - Occupation par type de chambre
  - Performance mensuelle (12 mois)

#### **Système de Rapports**
- **Génération automatique** : Rapports d'occupation, revenus, clientèle
- **Formats multiples** : PDF, Excel, CSV
- **Historique** : Conservation des rapports générés
- **Filtrage par période** : Jour, semaine, mois, trimestre, année

#### **Gestion Utilisateurs**
- **Rôles et permissions** : Manager, Réception, Restaurant
- **Statut actif/inactif** : Gestion de l'accès
- **Historique connexions** : Suivi de l'activité

#### **Paramètres Avancés**
- **Configuration hôtel** : Informations, tarification, devise
- **Notifications** : Personnalisation des alertes
- **Sauvegarde** : Persistance des paramètres

## 🚀 **Installation et Démarrage**

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 🎨 **Guide d'Utilisation**

### **Changer de Thème**
1. Cliquez sur l'icône lune/soleil dans la barre de navigation
2. Le thème bascule automatiquement
3. Votre préférence est sauvegardée

### **Créer une Réservation**
1. Aller sur "Hôtel" → Bouton "Nouvelle réservation"
2. Remplir les informations client
3. Sélectionner la chambre et les dates
4. La réservation apparaît dans le tableau avec statut "En attente"

### **Bloquer une Chambre**
1. Sur une chambre disponible, cliquer "Bloquer"
2. Indiquer la raison (maintenance, nettoyage, etc.)
3. Optionnel : définir une date de fin
4. La chambre passe en statut "Bloquée"

### **Gérer les Commandes Restaurant**
1. Aller sur "Restaurant" → Onglet "Commandes en cours"
2. Créer une nouvelle commande avec le bouton "+"
3. Sélectionner les articles et quantités
4. Suivre le workflow : Attente → Préparation → Prêt → Livré

L'application est maintenant prête avec toutes les fonctionnalités demandées ! 🎉
