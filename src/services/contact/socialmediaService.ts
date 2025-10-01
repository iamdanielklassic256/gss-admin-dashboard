import { api } from "@/app/api";

export interface SocialMedia {
  id?: string;
  name: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialMediaResponse {
  data: SocialMedia[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateSocialMediaData {
  name: string;
  url: string;
}

export interface UpdateSocialMediaData extends Partial<CreateSocialMediaData> {}

export const socialMediaService = {
  /**
   * Get all social media entries with pagination & sorting
   */
  async getSocialMedia(
    params: PaginationParams = {}
  ): Promise<SocialMediaResponse> {
    const response = await api.get<SocialMediaResponse>("/social-media", {
      params: {
        limit: 12,
        offset: 0,
        sortField: "createdAt",
        sortOrder: "desc",
        ...params,
      },
    });
    return response.data;
  },

  /**
   * Get a single social media entry by ID
   */
  async getSocialMediaById(id: string): Promise<SocialMedia> {
    const response = await api.get<SocialMedia>(`/social-media/${id}`);
    return response.data;
  },

  /**
   * Create a new social media entry
   */
  async createSocialMedia(
    socialMediaData: CreateSocialMediaData
  ): Promise<SocialMedia> {
    const response = await api.post<SocialMedia>(
      "/social-media",
      socialMediaData
    );
    return response.data;
  },

  /**
   * Update an existing social media entry
   */
  async updateSocialMedia(
    id: string,
    socialMediaData: UpdateSocialMediaData
  ): Promise<SocialMedia> {
    const response = await api.patch<SocialMedia>(
      `/social-media/${id}`,
      socialMediaData
    );
    return response.data;
  },

  /**
   * Delete a social media entry
   */
  async deleteSocialMedia(id: string): Promise<void> {
    await api.delete(`/social-media/${id}`);
  },
};
