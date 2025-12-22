export interface Salle {
  id: number;
  nom: string;
  capacite: number;
  type: string;
  disponible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSalleDto {
  nom: string;
  capacite: number;
  type: string;
  disponible?: boolean;
}

export interface UpdateSalleDto {
  nom?: string;
  capacite?: number;
  type?: string;
  disponible?: boolean;
}

export interface SalleState {
  salles: Salle[];
  selectedSalle: Salle | null;
  loading: boolean;
  error: string | null;
}
