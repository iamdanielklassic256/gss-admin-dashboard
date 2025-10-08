import { api } from "@/app/api";

export interface CoCurriculum {
  id?: string;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CoCurriculumResponse {
  data: CoCurriculum[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateCoCurriculumData {
  name: string;
  image: string;
  description: string;
}

export interface UpdateCoCurriculumData extends Partial<CreateCoCurriculumData> {}

export const coCurriculumService = {
  /** ✅ Get all co-curriculum activities (with pagination & sorting) */
  async getCoCurriculum(params: PaginationParams = {}): Promise<CoCurriculumResponse> {
    const response = await api.get<CoCurriculumResponse>("/co-curriculum", {
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

  /** ✅ Get a single co-curriculum activity by ID */
  async getCoCurriculumById(id: string): Promise<CoCurriculum> {
    const response = await api.get<CoCurriculum>(`/co-curriculum/${id}`);
    return response.data;
  },

  /** ✅ Create a new co-curriculum activity */
  async createCoCurriculum(data: CreateCoCurriculumData): Promise<CoCurriculum> {
    const response = await api.post<CoCurriculum>("/co-curriculum", data);
    return response.data;
  },

  /** ✅ Update an existing co-curriculum activity */
  async updateCoCurriculum(id: string, data: UpdateCoCurriculumData): Promise<CoCurriculum> {
    const response = await api.patch<CoCurriculum>(`/co-curriculum/${id}`, data);
    return response.data;
  },

  /** ✅ Delete a co-curriculum activity */
  async deleteCoCurriculum(id: string): Promise<void> {
    await api.delete(`/co-curriculum/${id}`);
  },
};
