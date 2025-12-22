import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Salle, SalleState, CreateSalleDto, UpdateSalleDto } from '../../types/salle';
import { salleService } from '../../services/salleservice';

const initialState: SalleState = {
  salles: [],
  selectedSalle: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllSalles = createAsyncThunk(
  'salle/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await salleService.getAllSalles();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSalleById = createAsyncThunk(
  'salle/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await salleService.getSalleById(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSalle = createAsyncThunk(
  'salle/create',
  async (data: CreateSalleDto, { rejectWithValue }) => {
    try {
      return await salleService.createSalle(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSalle = createAsyncThunk(
  'salle/update',
  async ({ id, data }: { id: number; data: UpdateSalleDto }, { rejectWithValue }) => {
    try {
      return await salleService.updateSalle(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSalle = createAsyncThunk(
  'salle/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await salleService.deleteSalle(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const salleSlice = createSlice({
  name: 'salle',
  initialState,
  reducers: {
    setSelectedSalle: (state, action: PayloadAction<Salle | null>) => {
      state.selectedSalle = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all salles
    builder.addCase(fetchAllSalles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllSalles.fulfilled, (state, action) => {
      state.loading = false;
      state.salles = action.payload;
    });
    builder.addCase(fetchAllSalles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch salle by ID
    builder.addCase(fetchSalleById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSalleById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedSalle = action.payload;
    });
    builder.addCase(fetchSalleById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create salle
    builder.addCase(createSalle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createSalle.fulfilled, (state, action) => {
      state.loading = false;
      state.salles.push(action.payload);
    });
    builder.addCase(createSalle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update salle
    builder.addCase(updateSalle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateSalle.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.salles.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.salles[index] = action.payload;
      }
      if (state.selectedSalle?.id === action.payload.id) {
        state.selectedSalle = action.payload;
      }
    });
    builder.addCase(updateSalle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete salle
    builder.addCase(deleteSalle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSalle.fulfilled, (state, action) => {
      state.loading = false;
      state.salles = state.salles.filter((s) => s.id !== action.payload);
      if (state.selectedSalle?.id === action.payload) {
        state.selectedSalle = null;
      }
    });
    builder.addCase(deleteSalle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setSelectedSalle, clearError } = salleSlice.actions;
export default salleSlice.reducer;
