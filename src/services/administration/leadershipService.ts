import { api } from "@/app/api";

export interface SchoolLeadership {
  id?: string;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SchoolLeadershipResponse {
  data: SchoolLeadership[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateSchoolLeadershipData {
  name: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface UpdateSchoolLeadershipData
  extends Partial<CreateSchoolLeadershipData> {}

export const schoolLeadershipService = {
  /** ✅ Get all school leadership members (with pagination & sorting) */
  async getSchoolLeaderships(
    params: PaginationParams = {}
  ): Promise<SchoolLeadershipResponse> {
    const response = await api.get<SchoolLeadershipResponse>("/school-leadership", {
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

  /** ✅ Get a single leadership member by ID */
  async getSchoolLeadershipById(id: string): Promise<SchoolLeadership> {
    const response = await api.get<SchoolLeadership>(`/school-leadership/${id}`);
    return response.data;
  },

  /** ✅ Create a new leadership member */
  async createSchoolLeadership(
    data: CreateSchoolLeadershipData
  ): Promise<SchoolLeadership> {
    const response = await api.post<SchoolLeadership>("/school-leadership", data);
    return response.data;
  },

  /** ✅ Update an existing leadership member */
  async updateSchoolLeadership(
    id: string,
    data: UpdateSchoolLeadershipData
  ): Promise<SchoolLeadership> {
    const response = await api.patch<SchoolLeadership>(
      `/school-leadership/${id}`,
      data
    );
    return response.data;
  },

  /** ✅ Delete a leadership member */
  async deleteSchoolLeadership(id: string): Promise<void> {
    await api.delete(`/school-leadership/${id}`);
  },
};
