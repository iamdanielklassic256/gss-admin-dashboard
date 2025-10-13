import type { AcademicYear, PerformanceData, SubjectPerformance, TopPerformer } from "@/types/uneb-performance";


const API_BASE_URL = 'http://localhost:5001';

class UnebPerformanceApi {
  private async fetchApi(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Academic Years
  async getAcademicYears(): Promise<AcademicYear[]> {
    return this.fetchApi('/academic-years');
  }

  async createAcademicYear(year: string, isCurrent: boolean = false): Promise<AcademicYear> {
    return this.fetchApi('/academic-years', {
      method: 'POST',
      body: JSON.stringify({ year, isCurrent }),
    });
  }

  async setCurrentAcademicYear(year: string): Promise<AcademicYear> {
    return this.fetchApi(`/academic-years/${year}/set-current`, {
      method: 'PUT',
    });
  }

  // Performance Data
  async getPerformanceOverview(year?: string) {
    const query = year ? `?year=${year}` : '';
    return this.fetchApi(`/uneb-performance/overview${query}`);
  }

  async createPerformanceData(data: any): Promise<PerformanceData> {
    return this.fetchApi('/uneb-performance/performance', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePerformanceData(year: string, level: string, data: any): Promise<PerformanceData> {
    return this.fetchApi(`/uneb-performance/years/${year}/performance/${level}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Top Performers
  async getTopPerformers(year: string): Promise<TopPerformer[]> {
    return this.fetchApi(`/uneb-performance/years/${year}/top-performers`);
  }

  async createTopPerformer(data: any): Promise<TopPerformer> {
    return this.fetchApi('/uneb-performance/top-performers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteTopPerformer(id: string): Promise<void> {
    return this.fetchApi(`/uneb-performance/top-performers/${id}`, {
      method: 'DELETE',
    });
  }

  // Subject Performance
  async getSubjectPerformance() {
    return this.fetchApi('/uneb-performance/subjects');
  }

  async updateSubjectPerformance(id: string, data: any): Promise<SubjectPerformance> {
    return this.fetchApi(`/uneb-performance/subjects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const unebPerformanceApi = new UnebPerformanceApi();