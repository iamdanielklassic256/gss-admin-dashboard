import { create } from "zustand";
import {
  socialMediaService,
  type SocialMedia,
  type SocialMediaResponse,
  type PaginationParams,
  type CreateSocialMediaData,
  type UpdateSocialMediaData,
} from "@/services/contact/socialmediaService";

interface SocialMediaState {
  socialMediaList: SocialMedia[];
  currentSocialMedia: SocialMedia | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSocialMedia: (params?: PaginationParams) => Promise<void>;
  fetchSocialMediaById: (id: string) => Promise<void>;
  createSocialMedia: (data: CreateSocialMediaData) => Promise<void>;
  updateSocialMedia: (id: string, data: UpdateSocialMediaData) => Promise<void>;
  deleteSocialMedia: (id: string) => Promise<void>;
  setCurrentSocialMedia: (sm: SocialMedia | null) => void;
  clearError: () => void;
  clearCurrentSocialMedia: () => void;
}

export const useSocialMediaStore = create<SocialMediaState>((set, get) => ({
  socialMediaList: [],
  currentSocialMedia: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchSocialMedia: async (params?: PaginationParams) => {
    set({ isLoading: true, error: null });

    try {
      const response: SocialMediaResponse =
        await socialMediaService.getSocialMedia(params);

      set({
        socialMediaList: response.data,
        total: response.total,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch social media";
      set({
        error: errorMessage,
        isLoading: false,
        socialMediaList: [],
        total: 0,
      });
      throw error;
    }
  },

  fetchSocialMediaById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const sm = await socialMediaService.getSocialMediaById(id);

      set({
        currentSocialMedia: sm,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch social media entry";
      set({
        error: errorMessage,
        isLoading: false,
        currentSocialMedia: null,
      });
      throw error;
    }
  },

  createSocialMedia: async (data: CreateSocialMediaData) => {
    set({ isLoading: true, error: null });

    try {
      const newSM = await socialMediaService.createSocialMedia(data);
      const { socialMediaList, total } = get();

      set({
        socialMediaList: [newSM, ...socialMediaList],
        total: total + 1,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create social media entry";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  updateSocialMedia: async (id: string, data: UpdateSocialMediaData) => {
    set({ isLoading: true, error: null });

    try {
      const updatedSM = await socialMediaService.updateSocialMedia(id, data);
      const { socialMediaList, currentSocialMedia } = get();

      const updatedList = socialMediaList.map((sm) =>
        sm.id === id ? updatedSM : sm
      );

      set({
        socialMediaList: updatedList,
        currentSocialMedia:
          currentSocialMedia?.id === id ? updatedSM : currentSocialMedia,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update social media entry";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  deleteSocialMedia: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await socialMediaService.deleteSocialMedia(id);
      const { socialMediaList, total, currentSocialMedia } = get();

      const filteredList = socialMediaList.filter((sm) => sm.id !== id);

      set({
        socialMediaList: filteredList,
        total: total - 1,
        currentSocialMedia: currentSocialMedia?.id === id ? null : currentSocialMedia,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete social media entry";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  setCurrentSocialMedia: (sm: SocialMedia | null) => {
    set({ currentSocialMedia: sm });
  },

  clearError: () => {
    set({ error: null });
  },

  clearCurrentSocialMedia: () => {
    set({ currentSocialMedia: null });
  },
}));

// 🔥 Optional helper hooks for easier usage
export const useSocialMediaList = () => useSocialMediaStore((state) => state.socialMediaList);
export const useCurrentSocialMedia = () =>useSocialMediaStore((state) => state.currentSocialMedia);
export const useSocialMediaTotal = () =>
  useSocialMediaStore((state) => state.total);
export const useSocialMediaLoading = () =>
  useSocialMediaStore((state) => state.isLoading);
export const useSocialMediaError = () =>
  useSocialMediaStore((state) => state.error);
