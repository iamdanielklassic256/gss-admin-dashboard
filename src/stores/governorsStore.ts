import { create } from "zustand";
import {
  governorsService,
  type Governors,
  type GovernorsResponse,
  type PaginationParams,
  type CreateGovernorData,
  type UpdateGovernorData,
} from "@/services/administration/bogService";

interface GovernorsState {
  governors: Governors[];
  currentGovernor: Governors | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  fetchGovernors: (params?: PaginationParams) => Promise<void>;
  fetchGovernorById: (id: string) => Promise<void>;
  createGovernor: (data: CreateGovernorData) => Promise<void>;
  updateGovernor: (id: string, data: UpdateGovernorData) => Promise<void>;
  deleteGovernor: (id: string) => Promise<void>;
  setCurrentGovernor: (governor: Governors | null) => void;
  clearError: () => void;
  clearCurrentGovernor: () => void;
}

export const useGovernorsStore = create<GovernorsState>((set, get) => ({
  governors: [],
  currentGovernor: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchGovernors: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response: GovernorsResponse = await governorsService.getGovernors(params);
      set({
        governors: response.data,
        total: response.total,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        governors: [],
        total: 0,
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch governors",
      });
    }
  },

  fetchGovernorById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const governor = await governorsService.getGovernorById(id);
      set({ currentGovernor: governor, isLoading: false });
    } catch (error: any) {
      set({
        currentGovernor: null,
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch governor",
      });
    }
  },

  createGovernor: async (data: CreateGovernorData) => {
    set({ isLoading: true, error: null });
    try {
      const newGovernor = await governorsService.createGovernor(data);
      const { governors, total } = get();
      set({
        governors: [newGovernor, ...governors],
        total: total + 1,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create governor",
      });
    }
  },

  updateGovernor: async (id, data: UpdateGovernorData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedGovernor = await governorsService.updateGovernor(id, data);
      const { governors, currentGovernor } = get();
      set({
        governors: governors.map((g) => (g.id === id ? updatedGovernor : g)),
        currentGovernor: currentGovernor?.id === id ? updatedGovernor : currentGovernor,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update governor",
      });
    }
  },

  deleteGovernor: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await governorsService.deleteGovernor(id);
      const { governors, total, currentGovernor } = get();
      set({
        governors: governors.filter((g) => g.id !== id),
        total: total - 1,
        currentGovernor: currentGovernor?.id === id ? null : currentGovernor,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete governor",
      });
    }
  },

  setCurrentGovernor: (governor) => set({ currentGovernor: governor }),
  clearError: () => set({ error: null }),
  clearCurrentGovernor: () => set({ currentGovernor: null }),
}));

export const useGovernors = () => useGovernorsStore((state) => state.governors);
export const useCurrentGovernor = () => useGovernorsStore((state) => state.currentGovernor);
export const useGovernorsTotal = () => useGovernorsStore((state) => state.total);
export const useGovernorsLoading = () => useGovernorsStore((state) => state.isLoading);
export const useGovernorsError = () => useGovernorsStore((state) => state.error);
