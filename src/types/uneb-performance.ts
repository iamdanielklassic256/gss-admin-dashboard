// src/types/uneb-performance.ts
export interface AcademicYear {
  id?: string
  year: string;
  isCurrent: boolean;
  createdAt: string;
  performanceData?: PerformanceData[];
  topPerformers?: TopPerformer[];
}

export interface PerformanceData {
  year: string;
  level: 'olevel' | 'alevel';
  totalCandidates: number;
  passRate: number;
  divisions: {
    division1?: number;
    division2?: number;
    division3?: number;
    division4?: number;
    principal?: number;
    subsidiary?: number;
    failed?: number;
  };
  highlights: string[];
}

export interface TopPerformer {
  id: string;
  name: string;
  year: string;
  level: 'O-Level' | 'A-Level';
  aggregate: string;
  subjects: string;
  achievement: string;
  category: 'overall' | 'science' | 'arts' | 'female';
  photoUrl?: string;
}

export interface SubjectPerformance {
  id: string;
  name: string;
  passRate: number;
  distinctionRate: number;
  level: 'olevel' | 'alevel';
  year?: string;
}

export interface PerformanceOverview {
  selectedYear: string;
  academicYears: string[];
  olevel?: PerformanceData;
  alevel?: PerformanceData;
}