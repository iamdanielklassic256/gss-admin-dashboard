import { api } from "@/app/api";


export interface DepartmentContact {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentContactsResponse {
  data: DepartmentContact[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateDepartmentContactData {
  name: string;
  email: string;
}

export interface UpdateDepartmentContactData extends Partial<CreateDepartmentContactData> {}

export const departmentContactService = {
  async getContacts(params: PaginationParams = {}): Promise<DepartmentContactsResponse> {
    const response = await api.get<DepartmentContactsResponse>('/department-contacts', {
      params: {
        limit: 12,
        offset: 0,
        sortField: 'createdAt',
        sortOrder: 'desc',
        ...params,
      },
    });
    return response.data;
  },

  async getContactById(id: string): Promise<DepartmentContact> {
    const response = await api.get<DepartmentContact>(`/department-contacts/${id}`);
    return response.data;
  },

  async createContact(contactData: CreateDepartmentContactData): Promise<DepartmentContact> {
    const response = await api.post<DepartmentContact>('/department-contacts', contactData);
    return response.data;
  },

  async updateContact(id: string, contactData: UpdateDepartmentContactData): Promise<DepartmentContact> {
    const response = await api.patch<DepartmentContact>(`/department-contacts/${id}`, contactData);
    return response.data;
  },

  async deleteContact(id: string): Promise<void> {
    await api.delete(`/department-contacts/${id}`);
  },
};