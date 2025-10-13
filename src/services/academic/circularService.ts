import type { Circular, CreateCircularDto } from "@/types/circular";

const API_BASE_URL = 'http://localhost:5001/circulars';

export const circularService = {
  // Fetch all circulars
  async getAllCirculars(): Promise<Circular[]> {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch circulars: ${response.status} ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching circulars:', error);
      throw error;
    }
  },

  // Fetch single circular
  async getCircularById(id: string): Promise<Circular> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch circular: ${response.status} ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching circular:', error);
      throw error;
    }
  },

  // Create new circular
  async createCircular(circularData: CreateCircularDto): Promise<Circular> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...circularData,
          date: new Date().toISOString(),
          circularId: Math.random().toString(36).substring(2, 11),
          icon: this.getCategoryIcon(circularData.category),
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create circular: ${response.status} ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating circular:', error);
      throw error;
    }
  },

  // Delete circular
  async deleteCircular(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete circular: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting circular:', error);
      throw error;
    }
  },

  // Helper function to get icons based on category
  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      Academic: '🎓',
      Administration: '📋',
      Events: '🎉',
      General: '📢',
    };
    return icons[category] || '📄';
  },

  // Helper function to get priority styles
  getPriorityStyles(priority: string) {
    const styles = {
      low: { color: 'text-green-600', bg: 'bg-green-100', label: 'Low' },
      normal: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Normal' },
      high: { color: 'text-red-600', bg: 'bg-red-100', label: 'High' },
    };
    return styles[priority as keyof typeof styles] || styles.normal;
  },
};