import { create } from "zustand";
import {
  schoolLeadershipService,
  type SchoolLeadership,
  type SchoolLeadershipResponse,
  type PaginationParams,
  type CreateSchoolLeadershipData,
  type UpdateSchoolLeadershipData,
} from "@/services/administration/leadershipService";

interface SchoolLeadershipState {
  schoolLeaderships: SchoolLeadership[];
  currentLeadership: SchoolLeadership | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  fetchSchoolLeaderships: (params?: PaginationParams) => Promise<void>;
  fetchSchoolLeadershipById: (id: string) => Promise<void>;
  createSchoolLeadership: (data: CreateSchoolLeadershipData) => Promise<void>;
  updateSchoolLeadership: (id: string, data: UpdateSchoolLeadershipData) => Promise<void>;
  deleteSchoolLeadership: (id: string) => Promise<void>;

  setCurrentLeadership: (leadership: SchoolLeadership | null) => void;
  clearError: () => void;
  clearCurrentLeadership: () => void;
}

export const useSchoolLeadershipStore = create<SchoolLeadershipState>((set, get) => ({
  schoolLeaderships: [],
  currentLeadership: null,
  total: 0,
  isLoading: false,
  error: null,

  /** ✅ Fetch all school leadership members */
  fetchSchoolLeaderships: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response: SchoolLeadershipResponse =
        await schoolLeadershipService.getSchoolLeaderships(params);
      set({
        schoolLeaderships: response.data,
        total: response.total,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        schoolLeaderships: [],
        total: 0,
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch school leadership",
      });
    }
  },

  /** ✅ Fetch single leadership member by ID */
  fetchSchoolLeadershipById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const leadership = await schoolLeadershipService.getSchoolLeadershipById(id);
      set({ currentLeadership: leadership, isLoading: false });
    } catch (error: any) {
      set({
        currentLeadership: null,
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch leadership member",
      });
    }
  },

  /** ✅ Create new leadership member */
  createSchoolLeadership: async (data: CreateSchoolLeadershipData) => {
    set({ isLoading: true, error: null });
    try {
      const newLeadership = await schoolLeadershipService.createSchoolLeadership(data);
      const { schoolLeaderships, total } = get();
      set({
        schoolLeaderships: [newLeadership, ...schoolLeaderships],
        total: total + 1,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create leadership member",
      });
    }
  },

  /** ✅ Update leadership member */
  updateSchoolLeadership: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedLeadership = await schoolLeadershipService.updateSchoolLeadership(id, data);
      const { schoolLeaderships, currentLeadership } = get();
      set({
        schoolLeaderships: schoolLeaderships.map((l) =>
          l.id === id ? updatedLeadership : l
        ),
        currentLeadership:
          currentLeadership?.id === id ? updatedLeadership : currentLeadership,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update leadership member",
      });
    }
  },

  /** ✅ Delete leadership member */
  deleteSchoolLeadership: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await schoolLeadershipService.deleteSchoolLeadership(id);
      const { schoolLeaderships, total, currentLeadership } = get();
      set({
        schoolLeaderships: schoolLeaderships.filter((l) => l.id !== id),
        total: total - 1,
        currentLeadership: currentLeadership?.id === id ? null : currentLeadership,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete leadership member",
      });
    }
  },

  /** ✅ Utility functions */
  setCurrentLeadership: (leadership) => set({ currentLeadership: leadership }),
  clearError: () => set({ error: null }),
  clearCurrentLeadership: () => set({ currentLeadership: null }),
}));

/** ✅ Selectors for easy access */
export const useSchoolLeaderships = () =>
  useSchoolLeadershipStore((state) => state.schoolLeaderships);
export const useCurrentLeadership = () =>
  useSchoolLeadershipStore((state) => state.currentLeadership);
export const useSchoolLeadershipTotal = () =>
  useSchoolLeadershipStore((state) => state.total);
export const useSchoolLeadershipLoading = () =>
  useSchoolLeadershipStore((state) => state.isLoading);
export const useSchoolLeadershipError = () =>
  useSchoolLeadershipStore((state) => state.error);
