import { api } from "@/app/api";

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriberResponse {
  data: Subscriber[];
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateSubscriberData {
  email: string;
}

export interface UpdateSubscriberData extends Partial<CreateSubscriberData> {}

export const subscriberService = {
  async getSubscribers(params: PaginationParams = {}): Promise<SubscriberResponse> {
    const response = await api.get<SubscriberResponse>("/subscribers", {
      params: {
        limit: 12,
        offset: 0,
        sortField: "createdAt",
        sortOrder: "desc",
        ...params,
      },
    });
    // console.log('Sub Services:::::', response.data)
    return response.data;
  },

  async createSubscriber(data: CreateSubscriberData): Promise<Subscriber> {
    const response = await api.post<Subscriber>("/subscribers", data);
    // console.log('creatting aaa', response)
    return response.data;
  },

  async deleteSubscriber(id: string): Promise<void> {
    await api.delete(`/subscribers/${id}`);
  },
};
