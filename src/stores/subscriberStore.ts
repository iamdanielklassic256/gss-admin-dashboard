import { create } from "zustand";
import {
  subscriberService,
  type Subscriber,
  type PaginationParams,
  type CreateSubscriberData,
} from "@/services/contact/subscriberService";

interface SubscriberState {
  subscribers: Subscriber[];
  currentSubscriber: Subscriber | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  fetchSubscribers: (params?: PaginationParams) => Promise<void>;
  createSubscriber: (data: CreateSubscriberData) => Promise<void>;
  deleteSubscriber: (id: string) => Promise<void>;
  setCurrentSubscriber: (subscriber: Subscriber | null) => void;
  clearError: () => void;
  clearCurrentSubscriber: () => void;
}

export const useSubscriberStore = create<SubscriberState>((set, get) => ({
  subscribers: [],
  currentSubscriber: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchSubscribers: async (params?: PaginationParams) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await subscriberService.getSubscribers(params);
      console.log("Sub Storer:::", response)
      set({
        subscribers: response,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch subscribers";
      set({ error: errorMessage, isLoading: false, subscribers: [], total: 0 });
      throw error;
    }
  },

  createSubscriber: async (data: CreateSubscriberData) => {
    set({ isLoading: true, error: null });
    try {
      const newSubscriber = await subscriberService.createSubscriber(data);
      const { subscribers, total } = get();
      set({
        subscribers: [newSubscriber, ...(subscribers ?? [])], // ensure iterable
        total: (total ?? 0) + 1,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to create subscriber";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  deleteSubscriber: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await subscriberService.deleteSubscriber(id);
      const { subscribers, total, currentSubscriber } = get();
      set({
        subscribers: (subscribers ?? []).filter((s) => s.id !== id),
        total: Math.max((total ?? 1) - 1, 0),
        currentSubscriber: currentSubscriber?.id === id ? null : currentSubscriber,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete subscriber";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  setCurrentSubscriber: (subscriber: Subscriber | null) => set({ currentSubscriber: subscriber }),
  clearError: () => set({ error: null }),
  clearCurrentSubscriber: () => set({ currentSubscriber: null }),
}));

// Optional hooks
export const useSubscribers = () => useSubscriberStore((state) => state.subscribers);
export const useCurrentSubscriber = () => useSubscriberStore((state) => state.currentSubscriber);
export const useSubscribersTotal = () => useSubscriberStore((state) => state.total);
export const useSubscribersLoading = () => useSubscriberStore((state) => state.isLoading);
export const useSubscribersError = () => useSubscriberStore((state) => state.error);
