import { create } from "zustand";
import {
  studentLeadershipService,
  type StudentLeader,
  type StudentLeadersResponse,
  type PaginationParams,
  type CreateStudentLeaderData,
  type UpdateStudentLeaderData,
} from "@/services/administration/studentleadService";

interface StudentLeadershipState {
  studentLeaders: StudentLeader[];
  currentStudentLeader: StudentLeader | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  fetchStudentLeaders: (params?: PaginationParams) => Promise<void>;
  fetchStudentLeaderById: (id: string) => Promise<void>;
  createStudentLeader: (data: CreateStudentLeaderData) => Promise<void>;
  updateStudentLeader: (id: string, data: UpdateStudentLeaderData) => Promise<void>;
  deleteStudentLeader: (id: string) => Promise<void>;
  setCurrentStudentLeader: (leader: StudentLeader | null) => void;
  clearError: () => void;
  clearCurrentStudentLeader: () => void;
}

export const useStudentLeadershipStore = create<StudentLeadershipState>((set, get) => ({
  studentLeaders: [],
  currentStudentLeader: null,
  total: 0,
  isLoading: false,
  error: null,

  /** ✅ Fetch all student leaders */
  fetchStudentLeaders: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response: StudentLeadersResponse = await studentLeadershipService.getStudentLeaders(params);
      set({
        studentLeaders: response.data,
        total: response.total,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        studentLeaders: [],
        total: 0,
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch student leaders",
      });
    }
  },

  /** ✅ Fetch single student leader by ID */
  fetchStudentLeaderById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const leader = await studentLeadershipService.getStudentLeaderById(id);
      set({ currentStudentLeader: leader, isLoading: false });
    } catch (error: any) {
      set({
        currentStudentLeader: null,
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch student leader",
      });
    }
  },

  /** ✅ Create new student leader */
  createStudentLeader: async (data: CreateStudentLeaderData) => {
    set({ isLoading: true, error: null });
    try {
      const newLeader = await studentLeadershipService.createStudentLeader(data);
      const { studentLeaders, total } = get();
      set({
        studentLeaders: [newLeader, ...studentLeaders],
        total: total + 1,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create student leader",
      });
    }
  },

  /** ✅ Update student leader */
  updateStudentLeader: async (id, data: UpdateStudentLeaderData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedLeader = await studentLeadershipService.updateStudentLeader(id, data);
      const { studentLeaders, currentStudentLeader } = get();
      set({
        studentLeaders: studentLeaders.map((l) => (l.id === id ? updatedLeader : l)),
        currentStudentLeader: currentStudentLeader?.id === id ? updatedLeader : currentStudentLeader,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update student leader",
      });
    }
  },

  /** ✅ Delete student leader */
  deleteStudentLeader: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await studentLeadershipService.deleteStudentLeader(id);
      const { studentLeaders, total, currentStudentLeader } = get();
      set({
        studentLeaders: studentLeaders.filter((l) => l.id !== id),
        total: total - 1,
        currentStudentLeader: currentStudentLeader?.id === id ? null : currentStudentLeader,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete student leader",
      });
    }
  },

  setCurrentStudentLeader: (leader) => set({ currentStudentLeader: leader }),
  clearError: () => set({ error: null }),
  clearCurrentStudentLeader: () => set({ currentStudentLeader: null }),
}));

/** ✅ Selectors for easier access in components */
export const useStudentLeaders = () => useStudentLeadershipStore((state) => state.studentLeaders);
export const useCurrentStudentLeader = () =>
  useStudentLeadershipStore((state) => state.currentStudentLeader);
export const useStudentLeadersTotal = () => useStudentLeadershipStore((state) => state.total);
export const useStudentLeadersLoading = () => useStudentLeadershipStore((state) => state.isLoading);
export const useStudentLeadersError = () => useStudentLeadershipStore((state) => state.error);
