import type { RootState } from '../index';

export const selectAllSalles = (state: RootState) => state.salle.salles;
export const selectSelectedSalle = (state: RootState) => state.salle.selectedSalle;
export const selectSalleLoading = (state: RootState) => state.salle.loading;
export const selectSalleError = (state: RootState) => state.salle.error;
