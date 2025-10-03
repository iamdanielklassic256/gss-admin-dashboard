import { api } from "@/app/api";

export interface Governors {
  id: string;
  name: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface GovernorsResponse {
  data: Governors[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateGovernorData {
  name: string;
  title: string;
  image: string;
}

export interface UpdateGovernorData extends Partial<CreateGovernorData> {}

export const governorsService = {
  /** ✅ Get all governors (with pagination & sorting) */
  async getGovernors(params: PaginationParams = {}): Promise<GovernorsResponse> {
    const response = await api.get<GovernorsResponse>("/board-of-governors", {
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

  /** ✅ Get a single governor by ID */
  async getGovernorById(id: string): Promise<Governors> {
    const response = await api.get<Governors>(`/board-of-governors/${id}`);
    return response.data;
  },

  /** ✅ Create a new governor */
  async createGovernor(governorData: CreateGovernorData): Promise<Governors> {
    const response = await api.post<Governors>("/board-of-governors", governorData);
    return response.data;
  },

  /** ✅ Update an existing governor */
  async updateGovernor(id: string, governorData: UpdateGovernorData): Promise<Governors> {
    const response = await api.patch<Governors>(`/board-of-governors/${id}`, governorData);
    return response.data;
  },

  /** ✅ Delete a governor */
  async deleteGovernor(id: string): Promise<void> {
    await api.delete(`/board-of-governors/${id}`);
  },
};
