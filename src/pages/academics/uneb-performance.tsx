// src/app/dashboard/uneb-performance/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {  
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
} from 'lucide-react';
import { PerformanceManager } from '@/components/academics/uneb/PerformanceManager';
import { TopPerformersManager } from '@/components/academics/uneb/TopPerformerManager';
import { AcademicYearManager } from '@/components/academics/uneb/AcademicYearManager';
import { SubjectManager } from '@/components/academics/uneb/SubjectManager';

interface ApiAcademicYear {
  id: string;
  year: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PerformanceOverview {
  selectedYear: ApiAcademicYear;
  olevel?: {
    totalCandidates: number;
    passRate: number;
    divisions: {
      division1: number;
      division2: number;
      division3: number;
      division4: number;
    };
  };
  alevel?: {
    totalCandidates: number;
    passRate: number;
    divisions: {
      principal: number;
      subsidiary: number;
      failed: number;
    };
  };
}

const UnebPerformancePage = () => {
  const [overview, setOverview] = useState<PerformanceOverview | null>(null);
  const [academicYears, setAcademicYears] = useState<ApiAcademicYear[]>([]);
  const [selectedYear, setSelectedYear] = useState<ApiAcademicYear | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch academic years from your API
      const yearsResponse = await fetch('http://localhost:5001/academic-years');
      if (!yearsResponse.ok) throw new Error('Failed to fetch academic years');
      const yearsData: ApiAcademicYear[] = await yearsResponse.json();
      
      // Fetch current academic year
      const currentResponse = await fetch('http://localhost:5001/academic-years/current');
      if (!currentResponse.ok) throw new Error('Failed to fetch current academic year');
      const currentYearData: ApiAcademicYear = await currentResponse.json();
      
      setAcademicYears(yearsData);
      
      // Set selected year to current year object
      setSelectedYear(currentYearData);
      
      // For now, set empty overview since we don't have performance API
      setOverview({
        selectedYear: currentYearData
      });
      
    } catch (error) {
      console.error('Failed to load data:', error);
      // Set empty states on error
      setAcademicYears([]);
      setSelectedYear(null);
      setOverview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = async (yearId: string) => {
    const selectedYearObj = academicYears.find(year => year.id === yearId);
    if (selectedYearObj) {
      setSelectedYear(selectedYearObj);
      // Update overview with selected year object
      setOverview({
        selectedYear: selectedYearObj
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading UNEB Performance Data...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!selectedYear) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">No academic year data available</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">UNEB Performance Management</h1>
            <p className="text-gray-600 mt-2">
              Manage academic performance data, top performers, and subject statistics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedYear.id}
              onChange={(e) => handleYearChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {academicYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.year} {year.isCurrent && '(Current)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((overview?.olevel?.totalCandidates || 0) + (overview?.alevel?.totalCandidates || 0)).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">
                Across O-Level & A-Level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(
                  overview?.olevel?.passRate || 0,
                  overview?.alevel?.passRate || 0
                ).toFixed(1)}%
              </div>
              <p className="text-xs text-gray-600">
                Best performing level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Division I/Principals</CardTitle>
              <Award className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((overview?.olevel?.divisions?.division1 || 0) + (overview?.alevel?.divisions?.principal || 0)).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">
                Top achievers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Academic Years</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{academicYears.length}</div>
              <p className="text-xs text-gray-600">
                Years of data
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance Data</TabsTrigger>
            <TabsTrigger value="performers">Top Performers</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="years">Academic Years</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="overview" className="space-y-6">
            <PerformanceOverview overview={overview} selectedYear={selectedYear} />
          </TabsContent> */}

          {/* <TabsContent value="performance">
            <PerformanceManager
              year={selectedYear} 
              performanceData={overview}
              onUpdate={loadData}
            />
          </TabsContent> */}

          {/* <TabsContent value="performers">
            <TopPerformersManager
              year={selectedYear}
              onUpdate={loadData}
            />
          </TabsContent> */}

          {/* <TabsContent value="subjects">
            <SubjectManager onUpdate={loadData} />
          </TabsContent> */}

          <TabsContent value="years">
            <AcademicYearManager
              academicYears={academicYears}
              onUpdate={loadData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Overview Component
const PerformanceOverview = ({ overview, selectedYear }: { overview: PerformanceOverview | null, selectedYear: ApiAcademicYear }) => {
  if (!overview) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{selectedYear.year} Performance Summary</CardTitle>
            <CardDescription>
              No performance data available for {selectedYear.year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Performance data will be displayed here once available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{selectedYear.year} Performance Summary</CardTitle>
          <CardDescription>
            Overview of O-Level and A-Level performance metrics
            {selectedYear.isCurrent && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Current Year
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* O-Level Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                O-Level (UCE) Performance
              </h3>
              {overview.olevel ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Candidates:</span>
                    <span className="font-semibold">{overview.olevel.totalCandidates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pass Rate:</span>
                    <span className="font-semibold text-green-600">{overview.olevel.passRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Division I:</span>
                    <span className="font-semibold">{overview.olevel.divisions.division1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Division II:</span>
                    <span className="font-semibold">{overview.olevel.divisions.division2}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No O-Level data available for {selectedYear.year}</p>
              )}
            </div>

            {/* A-Level Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                A-Level (UACE) Performance
              </h3>
              {overview.alevel ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Candidates:</span>
                    <span className="font-semibold">{overview.alevel.totalCandidates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pass Rate:</span>
                    <span className="font-semibold text-green-600">{overview.alevel.passRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2+ Principals:</span>
                    <span className="font-semibold">{overview.alevel.divisions.principal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Principal + Sub:</span>
                    <span className="font-semibold">{overview.alevel.divisions.subsidiary}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No A-Level data available for {selectedYear.year}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnebPerformancePage;