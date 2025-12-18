# Système de Notifications - Documentation

## Vue d'ensemble

Le système de notifications permet aux étudiants et aux parents de recevoir et gérer leurs notifications en temps réel.

## Structure des fichiers

```
src/
├── components/
│   └── notifications/
│       ├── NotificationList.tsx        # Liste complète des notifications
│       └── NotificationDropdown.tsx    # Menu déroulant dans la navbar
├── pages/
│   ├── etudiant/
│   │   └── notifications.tsx           # Page notifications étudiant
│   └── parent/
│       └── notifications.tsx           # Page notifications parent
├── services/
│   └── notificationservice.tsx         # Service API notifications
└── types/
    └── notification.tsx                # Types TypeScript

```

## API Endpoints

Basé sur le fichier Postman fourni, les endpoints suivants sont implémentés :

### Pour tous les utilisateurs

- **GET** `/api/notifications/me` - Liste mes notifications
- **GET** `/api/notifications/me/unread` - Liste mes notifications non lues
- **PATCH** `/api/notifications/:recipientId/read` - Marquer une notification comme lue
- **PATCH** `/api/notifications/me/read-all` - Marquer toutes mes notifications comme lues
- **DELETE** `/api/notifications/:recipientId` - Supprimer une notification

### Pour les administrateurs

- **POST** `/api/notifications` - Créer une notification
- **GET** `/api/notifications/all` - Liste toutes les notifications

## Utilisation

### 1. NotificationDropdown dans la Navbar

Le composant `NotificationDropdown` est déjà intégré dans la Navbar et affiche :

- Un badge avec le nombre de notifications non lues
- Les 5 dernières notifications non lues
- Rafraîchissement automatique toutes les 30 secondes

```tsx
import NotificationDropdown from "../components/notifications/NotificationDropdown";

<NotificationDropdown />;
```

### 2. Page complète de notifications

Pour les étudiants :

```tsx
// Route: /etudiant/notifications
import EtudiantNotifications from "./pages/etudiant/notifications";
```

Pour les parents :

```tsx
// Route: /parent/notifications
import ParentNotifications from "./pages/parent/notifications";
```

### 3. Service de notifications

```tsx
import notificationService from "./services/notificationservice";

// Récupérer mes notifications
const notifications = await notificationService.getMyNotifications();

// Récupérer les non lues
const unread = await notificationService.getMyUnreadNotifications();

// Marquer comme lue
await notificationService.markAsRead(notificationId);

// Marquer toutes comme lues
await notificationService.markAllAsRead();

// Supprimer une notification
await notificationService.deleteNotification(notificationId);

// Obtenir le nombre de non lues
const count = await notificationService.getUnreadCount();
```

## Types de notifications

Le système supporte les types suivants :

- `grade` - Notes et résultats (📊)
- `exam` - Examens et évaluations (📝)
- `absence` - Absences (⚠️)
- `homework` - Devoirs (📚)
- `event` - Événements (📅)
- `general` - Général (📢)

## Fonctionnalités

### NotificationList

- ✅ Affichage de toutes les notifications
- ✅ Filtrage : Toutes / Non lues
- ✅ Marquer une notification comme lue
- ✅ Marquer toutes comme lues
- ✅ Supprimer une notification
- ✅ Affichage des métadonnées (notes, sujets, etc.)
- ✅ Format de date relatif (il y a 2h, hier, etc.)
- ✅ Icônes et couleurs selon le type

### NotificationDropdown

- ✅ Badge avec compteur de non lues
- ✅ Affichage des 5 dernières notifications
- ✅ Rafraîchissement automatique (30s)
- ✅ Marquer comme lue depuis le dropdown
- ✅ Lien vers la page complète
- ✅ Fermeture automatique au clic extérieur

## Configuration

### Base URL

Modifier dans `notificationservice.tsx` :

```tsx
const API_URL = "http://localhost:8081/api/notifications";
```

### Token d'authentification

Le service récupère automatiquement le token depuis le localStorage :

```tsx
localStorage.getItem("token");
```

## Intégration dans le router

Ajoutez les routes dans votre `AppRouter.tsx` :

```tsx
import EtudiantNotifications from '../pages/etudiant/notifications'
import ParentNotifications from '../pages/parent/notifications'

// Dans vos routes
<Route path="/etudiant/notifications" element={<EtudiantNotifications />} />
<Route path="/parent/notifications" element={<ParentNotifications />} />
```

## Personnalisation

### Couleurs par type

Modifiez dans `NotificationList.tsx` :

```tsx
const getNotificationColor = (type: string) => {
  switch (type) {
    case "grade":
      return "bg-blue-100 text-blue-800";
    // ...
  }
};
```

### Icônes par type

Modifiez dans `NotificationList.tsx` :

```tsx
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "grade":
      return "📊";
    // ...
  }
};
```

### Fréquence de rafraîchissement

Modifiez dans `NotificationDropdown.tsx` :

```tsx
const interval = setInterval(loadNotifications, 30000); // 30 secondes
```

## Exemple de création de notification (Admin)

```tsx
await notificationService.createNotification({
  user_id: 12,
  titre: "Nouvelle note disponible",
  message: "Votre note de Mathématiques est disponible",
  type: "grade",
  channels: ["in_app", "email"],
  metadata: {
    grade: 18,
    subject: "Mathématiques",
    coefficient: 3,
  },
});
```

## Prochaines étapes

- [ ] Ajouter les notifications en temps réel (WebSocket/SSE)
- [ ] Implémenter les filtres avancés (par type, par date)
- [ ] Ajouter la recherche dans les notifications
- [ ] Implémenter les préférences de notification
- [ ] Ajouter les sons/vibrations pour nouvelles notifications
- [ ] Implémenter l'archivage des notifications
- [ ] Ajouter la pagination pour de grandes listes

## Support

Pour toute question ou problème, consultez le fichier Postman ou contactez l'équipe de développement.
