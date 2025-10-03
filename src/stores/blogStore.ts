import { create } from 'zustand';
import {
  blogService,
  type Blog,
  type BlogResponse,
  type PaginationParams,
  type CreateBlogData,
  type UpdateBlogData,
} from '@/services/contact/blogService';

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBlogs: (params?: PaginationParams) => Promise<void>;
  fetchBlogById: (id: string) => Promise<void>;
  createBlog: (data: CreateBlogData) => Promise<void>;
  updateBlog: (id: string, data: UpdateBlogData) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  setCurrentBlog: (blog: Blog | null) => void;
  clearError: () => void;
  clearCurrentBlog: () => void;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  currentBlog: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchBlogs: async (params?: PaginationParams) => {
    set({ isLoading: true, error: null });

    try {
      const response: BlogResponse = await blogService.getBlogs(params);
      set({
        blogs: response.data,
        total: response.meta.total || response.data.length,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch blogs';
      set({ error: errorMessage, isLoading: false, blogs: [], total: 0 });
      throw error;
    }
  },

  fetchBlogById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const blog = await blogService.getBlogById(id);
      set({ currentBlog: blog, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch blog';
      set({ error: errorMessage, isLoading: false, currentBlog: null });
      throw error;
    }
  },

  createBlog: async (data: CreateBlogData) => {
    set({ isLoading: true, error: null });

    try {
      const newBlog = await blogService.createBlog(data);
      const { blogs, total } = get();
      set({ blogs: [newBlog, ...blogs], total: total + 1, isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create blog';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateBlog: async (id: string, data: UpdateBlogData) => {
    set({ isLoading: true, error: null });

    try {
      const updatedBlog = await blogService.updateBlog(id, data);
      const { blogs, currentBlog } = get();

      const updatedBlogs = blogs.map(blog => (blog.id === id ? updatedBlog : blog));

      set({
        blogs: updatedBlogs,
        currentBlog: currentBlog?.id === id ? updatedBlog : currentBlog,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update blog';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  deleteBlog: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await blogService.deleteBlog(id);
      const { blogs, total, currentBlog } = get();
      set({
        blogs: blogs.filter(blog => blog.id !== id),
        total: total - 1,
        currentBlog: currentBlog?.id === id ? null : currentBlog,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete blog';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  setCurrentBlog: (blog: Blog | null) => set({ currentBlog: blog }),
  clearError: () => set({ error: null }),
  clearCurrentBlog: () => set({ currentBlog: null }),
}));

// Optional helper hooks
export const useBlogs = () => useBlogStore(state => state.blogs);
export const useCurrentBlog = () => useBlogStore(state => state.currentBlog);
export const useBlogsTotal = () => useBlogStore(state => state.total);
export const useBlogsLoading = () => useBlogStore(state => state.isLoading);
export const useBlogsError = () => useBlogStore(state => state.error);
