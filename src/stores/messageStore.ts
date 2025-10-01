import { create } from "zustand";
import {
  messageService,
  type Message,
  type MessageResponse,
  type PaginationParams,
} from "@/services/contact/messageService";

interface MessageState {
  messages: Message[];
  currentMessage: Message | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchMessages: (params?: PaginationParams) => Promise<void>;
  fetchMessageById: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  setCurrentMessage: (message: Message | null) => void;
  clearError: () => void;
  clearCurrentMessage: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  currentMessage: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchMessages: async (params?: PaginationParams) => {
    set({ isLoading: true, error: null });
    try {
      const response: MessageResponse = await messageService.getMessages(params);
      console.log('fetching messages.........')
      console.log(response.data)
      set({
        messages: response.data,
        total: response.total,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch messages";
      set({
        error: errorMessage,
        isLoading: false,
        messages: [],
        total: 0,
      });
      throw error;
    }
  },

  fetchMessageById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // if you later add getMessageById in service
      const response = await messageService.getMessages({ limit: 1, offset: 0 });
      const message = response.data.find((m) => m.id === id) || null;
      set({
        currentMessage: message,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch message";
      set({
        error: errorMessage,
        isLoading: false,
        currentMessage: null,
      });
      throw error;
    }
  },

  deleteMessage: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await messageService.deleteMessage(id);
      const { messages, total, currentMessage } = get();

      const filteredMessages = messages.filter((msg) => msg.id !== id);
      set({
        messages: filteredMessages,
        total: total - 1,
        currentMessage: currentMessage?.id === id ? null : currentMessage,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete message";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  setCurrentMessage: (message: Message | null) => {
    set({ currentMessage: message });
  },

  clearError: () => {
    set({ error: null });
  },

  clearCurrentMessage: () => {
    set({ currentMessage: null });
  },
}));

// Optional hooks for consuming
export const useMessages = () => useMessageStore((state) => state.messages);
export const useCurrentMessage = () => useMessageStore((state) => state.currentMessage);
export const useMessagesTotal = () => useMessageStore((state) => state.total);
export const useMessagesLoading = () => useMessageStore((state) => state.isLoading);
export const useMessagesError = () => useMessageStore((state) => state.error);
