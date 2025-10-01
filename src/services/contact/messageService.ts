import { api } from "@/app/api";

export interface Message {
  id: string;
  name: string;
  email: string;
  telephone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageResponse {
  data: Message[];
  total: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateMessageData {
  name: string;
  email: string;
  telephone: string;
  message: string;
}

export interface UpdateMessageData extends Partial<CreateMessageData> {}

export const messageService = {
  async getMessages(params: PaginationParams = {}): Promise<MessageResponse> {
    const response = await api.get<MessageResponse>("/contact", {
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



  async deleteMessage(id: string): Promise<void> {
    await api.delete(`/contact/${id}`);
  },
};
