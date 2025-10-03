import { api } from "@/app/api";

// Blog interfaces
export interface Blog {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  image: string;
  tags: string[];
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  data: Blog[];
  meta: {
    total: number;
    [key: string]: any;
  };
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateBlogData {
  title: string;
  slug: string;
  publishedAt: string;
  image: string;
  tags: string[];
  body: string;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {}

export const blogService = {
  async getBlogs(params: PaginationParams = {}): Promise<BlogResponse> {
    const response = await api.get<BlogResponse>('/blogs', {
      params: {
        limit: 10,
        offset: 0,
        sortField: 'publishedAt',
        sortOrder: 'desc',
        ...params,
      },
    });
    return response.data;
  },

  async getBlogById(id: string): Promise<Blog> {
    const response = await api.get<{ data: Blog }>(`/blogs/${id}`);
    return response.data.data;
  },

  async createBlog(blogData: CreateBlogData): Promise<Blog> {
    const response = await api.post<{ data: Blog }>('/blogs', blogData);
    return response.data.data;
  },

  async updateBlog(id: string, blogData: UpdateBlogData): Promise<Blog> {
    const response = await api.patch<{ data: Blog }>(`/blogs/${id}`, blogData);
    return response.data.data;
  },

  async deleteBlog(id: string): Promise<void> {
    await api.delete(`/blogs/${id}`);
  },
};
