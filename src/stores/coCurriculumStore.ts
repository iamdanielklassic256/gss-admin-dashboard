import { create } from 'zustand';
import {
  coCurriculumService,
  type CoCurriculum,
  type CoCurriculumResponse,
  type PaginationParams,
  type CreateCoCurriculumData,
  type UpdateCoCurriculumData,
} from '@/services/academic/co-curriculum-service';

interface CoCurriculumState {
  coCurriculums: CoCurriculum[];
  currentCoCurriculum: CoCurriculum | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCoCurriculums: (params?: PaginationParams) => Promise<void>;
  fetchCoCurriculumById: (id: string) => Promise<void>;
  createCoCurriculum: (data: CreateCoCurriculumData) => Promise<void>;
  updateCoCurriculum: (id: string, data: UpdateCoCurriculumData) => Promise<void>;
  deleteCoCurriculum: (id: string) => Promise<void>;
  setCurrentCoCurriculum: (coCurriculum: CoCurriculum | null) => void;
  clearError: () => void;
  clearCurrentCoCurriculum: () => void;
}

export const useCoCurriculumStore = create<CoCurriculumState>((set, get) => ({
  coCurriculums: [],
  currentCoCurriculum: null,
  total: 0,
  isLoading: false,
  error: null,

  /** ✅ Fetch all co-curriculum activities */
  fetchCoCurriculums: async (params?: PaginationParams) => {
    set({ isLoading: true, error: null });
    try {
      const response: CoCurriculumResponse = await coCurriculumService.getCoCurriculum(params);
      set({
        coCurriculums: response.data,
        total: response.total || response.data.length,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch co-curriculum activities';
      set({ error: errorMessage, isLoading: false, coCurriculums: [], total: 0 });
      throw error;
    }
  },

  /** ✅ Fetch one co-curriculum by ID */
  fetchCoCurriculumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const coCurriculum = await coCurriculumService.getCoCurriculumById(id);
      set({ currentCoCurriculum: coCurriculum, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch co-curriculum activity';
      set({ error: errorMessage, isLoading: false, currentCoCurriculum: null });
      throw error;
    }
  },

  /** ✅ Create new co-curriculum */
  createCoCurriculum: async (data: CreateCoCurriculumData) => {
    set({ isLoading: true, error: null });
    try {
      const newCoCurriculum = await coCurriculumService.createCoCurriculum(data);
      const { coCurriculums, total } = get();
      set({
        coCurriculums: [newCoCurriculum, ...coCurriculums],
        total: total + 1,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create co-curriculum';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  /** ✅ Update co-curriculum */
  updateCoCurriculum: async (id: string, data: UpdateCoCurriculumData) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await coCurriculumService.updateCoCurriculum(id, data);
      const { coCurriculums, currentCoCurriculum } = get();
      const updatedList = coCurriculums.map(item => (item.id === id ? updated : item));
      set({
        coCurriculums: updatedList,
        currentCoCurriculum: currentCoCurriculum?.id === id ? updated : currentCoCurriculum,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update co-curriculum';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  /** ✅ Delete co-curriculum */
  deleteCoCurriculum: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await coCurriculumService.deleteCoCurriculum(id);
      const { coCurriculums, total, currentCoCurriculum } = get();
      set({
        coCurriculums: coCurriculums.filter(item => item.id !== id),
        total: total - 1,
        currentCoCurriculum: currentCoCurriculum?.id === id ? null : currentCoCurriculum,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete co-curriculum';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  setCurrentCoCurriculum: (coCurriculum: CoCurriculum | null) => set({ currentCoCurriculum: coCurriculum }),
  clearError: () => set({ error: null }),
  clearCurrentCoCurriculum: () => set({ currentCoCurriculum: null }),
}));

// ✅ Helper hooks
export const useCoCurriculums = () => useCoCurriculumStore(state => state.coCurriculums);
export const useCurrentCoCurriculum = () => useCoCurriculumStore(state => state.currentCoCurriculum);
export const useCoCurriculumsTotal = () => useCoCurriculumStore(state => state.total);
export const useCoCurriculumsLoading = () => useCoCurriculumStore(state => state.isLoading);
export const useCoCurriculumsError = () => useCoCurriculumStore(state => state.error);
