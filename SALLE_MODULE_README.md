# Salle Management Module

## Overview

Complete frontend implementation for managing school classrooms (salles) with full CRUD operations.

## Features

- ✅ List all salles with filtering and search
- ✅ Create new salle
- ✅ Edit existing salle
- ✅ Delete salle
- ✅ Filter by type and availability
- ✅ Real-time statistics (total, available, capacity)
- ✅ Responsive design with Tailwind CSS
- ✅ Redux state management
- ✅ Form validation

## Files Created

### Types

- `src/types/salle.tsx` - TypeScript interfaces for Salle data

### Services

- `src/services/salleservice.tsx` - API calls to backend

### Redux Store

- `src/store/slices/salleslice.tsx` - Redux slice with async thunks
- `src/store/selectors/salleselector.tsx` - Redux selectors
- `src/store/index.tsx` - Store configuration

### Components

- `src/components/salle/salleCard.tsx` - Card component to display salle
- `src/components/salle/salleForm.tsx` - Form for creating/editing salle

### Pages

- `src/pages/salle.tsx` - Main salle management page

### Configuration

- `src/router/AppRouter.tsx` - Updated with `/salles` route
- `src/main.tsx` - Updated with Redux Provider
- `src/hooks/useAppDispatch.tsx` - Typed dispatch hook
- `src/hooks/useAppSelector.tsx` - Typed selector hook

## API Endpoints Used

Based on your backend controller:

- `GET /salles` - List all salles (requires SALLE_READ permission)
- `GET /salles/:id` - Get salle by ID (requires SALLE_READ permission)
- `POST /salles` - Create salle (requires SALLE_CREATE permission)
- `PUT /salles/:id` - Update salle (requires SALLE_UPDATE permission)
- `DELETE /salles/:id` - Delete salle (requires SALLE_DELETE permission)

## Data Structure

```typescript
interface Salle {
  id: number;
  nom: string; // Required - Salle name
  capacite: number; // Required - Capacity (number of people)
  type: string; // Required - Type (Cours, TD, TP, etc.)
  disponible: boolean; // Availability status
}
```

## Room Types Available

- Cours (Regular classroom)
- TD (Tutorial room)
- TP (Practical work room)
- Laboratoire (Laboratory)
- Amphithéâtre (Amphitheater)
- Conférence (Conference room)

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

## Usage

1. Navigate to `/salles` route in your application
2. View all salles in a card grid layout
3. Use filters to search by name, type, or availability
4. Click "Ajouter une salle" to create a new salle
5. Click "Modifier" on a card to edit
6. Click "Supprimer" on a card to delete (with confirmation)

## Features Detail

### Search & Filters

- **Search**: Filter by salle name or type
- **Type Filter**: Filter by room type (Cours, TD, TP, etc.)
- **Availability Filter**: Show all, available only, or unavailable only

### Statistics Dashboard

- Total number of salles
- Number of available salles
- Total capacity across all salles

### Form Validation

- Nom: Required, cannot be empty
- Capacité: Required, must be greater than 0
- Type: Required, selected from dropdown
- Disponible: Checkbox (defaults to true)

## Permissions Required

Make sure the authenticated user has the following permissions in your backend:

- `SALLE_READ` - To view salles
- `SALLE_CREATE` - To create new salles
- `SALLE_UPDATE` - To update existing salles
- `SALLE_DELETE` - To delete salles

## Styling

The module uses Tailwind CSS for styling with:

- Responsive grid layout
- Color-coded availability badges (green for available, red for unavailable)
- Hover effects and transitions
- Form validation error states
- Loading and empty states

## Next Steps

To integrate with your navigation:

1. Add a link to `/salles` in your Sidebar component
2. Add appropriate icons for the salle menu item
3. Ensure authentication token is properly stored in localStorage
4. Configure VITE_API_URL in your .env file
