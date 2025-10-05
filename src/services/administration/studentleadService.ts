import { api } from "@/app/api";

export interface StudentLeader {
  id?: string;
  name: string;
  title: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentLeadersResponse {
  data: StudentLeader[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateStudentLeaderData {
  name: string;
  title: string;
  image: string;
}

export interface UpdateStudentLeaderData extends Partial<CreateStudentLeaderData> {}

export const studentLeadershipService = {
  /** ✅ Get all student leaders (with pagination & sorting) */
  async getStudentLeaders(params: PaginationParams = {}): Promise<StudentLeadersResponse> {
    const response = await api.get<StudentLeadersResponse>("/student-leadership", {
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

  /** ✅ Get a single student leader by ID */
  async getStudentLeaderById(id: string): Promise<StudentLeader> {
    const response = await api.get<StudentLeader>(`/student-leadership/${id}`);
    return response.data;
  },

  /** ✅ Create a new student leader */
  async createStudentLeader(data: CreateStudentLeaderData): Promise<StudentLeader> {
    const response = await api.post<StudentLeader>("/student-leadership", data);
    return response.data;
  },

  /** ✅ Update an existing student leader */
  async updateStudentLeader(id: string, data: UpdateStudentLeaderData): Promise<StudentLeader> {
    const response = await api.patch<StudentLeader>(`/student-leadership/${id}`, data);
    return response.data;
  },

  /** ✅ Delete a student leader */
  async deleteStudentLeader(id: string): Promise<void> {
    await api.delete(`/student-leadership/${id}`);
  },
};
