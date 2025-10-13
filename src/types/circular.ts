// types/circular.ts
export interface Circular {
  circularId: string;
  title: string;
  date: string;
  category: 'Academic' | 'Administration' | 'Events' | 'General';
  priority: 'low' | 'normal' | 'high';
  excerpt: string;
  content: string;
  attachments: string[];
  icon: string;
  targetAudience: string;
  expiryDate: string;
}

export interface CreateCircularDto {
  title: string;
  category: Circular['category'];
  priority: Circular['priority'];
  excerpt: string;
  content: string;
  attachments: string[];
  targetAudience: string;
  expiryDate: string;
}