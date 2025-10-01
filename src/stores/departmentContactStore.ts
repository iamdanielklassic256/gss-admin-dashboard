import { create } from 'zustand';
import { 
  departmentContactService, 
  type DepartmentContact, 
  type DepartmentContactsResponse,
  type PaginationParams,
  type CreateDepartmentContactData,
  type UpdateDepartmentContactData 
} from '@/services/contact/departmentContactService';

interface DepartmentContactState {
  contacts: DepartmentContact[];
  currentContact: DepartmentContact | null;
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchContacts: (params?: PaginationParams) => Promise<void>;
  fetchContactById: (id: string) => Promise<void>;
  createContact: (data: CreateDepartmentContactData) => Promise<void>;
  updateContact: (id: string, data: UpdateDepartmentContactData) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  setCurrentContact: (contact: DepartmentContact | null) => void;
  clearError: () => void;
  clearCurrentContact: () => void;
}

export const useDepartmentContactStore = create<DepartmentContactState>((set, get) => ({
  contacts: [],
  currentContact: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchContacts: async (params?: PaginationParams) => {
    set({ isLoading: true, error: null });
    
    try {
      const response: DepartmentContactsResponse = await departmentContactService.getContacts(params);
      
      set({
        contacts: response.data,
        total: response.total,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch contacts';
      set({
        error: errorMessage,
        isLoading: false,
        contacts: [],
        total: 0,
      });
      throw error;
    }
  },

  fetchContactById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const contact = await departmentContactService.getContactById(id);
      
      set({
        currentContact: contact,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch contact';
      set({
        error: errorMessage,
        isLoading: false,
        currentContact: null,
      });
      throw error;
    }
  },

  createContact: async (data: CreateDepartmentContactData) => {
    set({ isLoading: true, error: null });
    
    try {
      const newContact = await departmentContactService.createContact(data);
      const { contacts, total } = get();
      
      set({
        contacts: [newContact, ...contacts],
        total: total + 1,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create contact';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  updateContact: async (id: string, data: UpdateDepartmentContactData) => {
    set({ isLoading: true, error: null });
    
    try {
      const updatedContact = await departmentContactService.updateContact(id, data);
      const { contacts, currentContact } = get();
      
      const updatedContacts = contacts.map(contact => 
        contact.id === id ? updatedContact : contact
      );
      
      set({
        contacts: updatedContacts,
        currentContact: currentContact?.id === id ? updatedContact : currentContact,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update contact';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  deleteContact: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      await departmentContactService.deleteContact(id);
      const { contacts, total, currentContact } = get();
      
      const filteredContacts = contacts.filter(contact => contact.id !== id);
      
      set({
        contacts: filteredContacts,
        total: total - 1,
        currentContact: currentContact?.id === id ? null : currentContact,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete contact';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  setCurrentContact: (contact: DepartmentContact | null) => {
    set({ currentContact: contact });
  },

  clearError: () => {
    set({ error: null });
  },

  clearCurrentContact: () => {
    set({ currentContact: null });
  },
}));

// Optional: Helper hooks for easier consumption
export const useContacts = () => useDepartmentContactStore((state) => state.contacts);
export const useCurrentContact = () => useDepartmentContactStore((state) => state.currentContact);
export const useContactsTotal = () => useDepartmentContactStore((state) => state.total);
export const useContactsLoading = () => useDepartmentContactStore((state) => state.isLoading);
export const useContactsError = () => useDepartmentContactStore((state) => state.error);