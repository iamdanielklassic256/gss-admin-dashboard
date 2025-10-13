// src/components/dashboard/uneb-performance/SubjectManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Edit, Plus } from 'lucide-react';
import type { SubjectPerformance } from '@/types/uneb-performance';
import { unebPerformanceApi } from '@/services/academic/uneb-performance-api';

interface SubjectManagerProps {
  onUpdate: () => void;
}

export const SubjectManager = ({ onUpdate }: SubjectManagerProps) => {
  const [subjects, setSubjects] = useState<SubjectPerformance[]>([]);
  const [editingSubject, setEditingSubject] = useState<SubjectPerformance | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    passRate: 0,
    distinctionRate: 0,
    level: 'olevel' as 'olevel' | 'alevel'
  });

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await unebPerformanceApi.getSubjectPerformance();
      // Flatten the subjects from both levels
      const allSubjects = [...data.olevel, ...data.alevel];
      setSubjects(allSubjects);
    } catch (error) {
      console.error('Failed to load subjects:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      passRate: 0,
      distinctionRate: 0,
      level: 'olevel'
    });
    setEditingSubject(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!formData.name || formData.passRate < 0 || formData.distinctionRate < 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    setLoading(true);
    try {
      // Since our API doesn't have create subject endpoint, we'll simulate it
      // In real implementation, you'd call the appropriate API endpoint
      alert('Subject management functionality would be implemented with proper backend endpoints');
      resetForm();
      loadSubjects();
      onUpdate();
    } catch (error) {
      console.error('Failed to save subject:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject: SubjectPerformance) => {
    setFormData({
      name: subject.name,
      passRate: subject.passRate,
      distinctionRate: subject.distinctionRate,
      level: subject.level
    });
    setEditingSubject(subject);
    setIsCreating(false);
  };

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const olevelSubjects = subjects.filter(s => s.level === 'olevel');
  const alevelSubjects = subjects.filter(s => s.level === 'alevel');

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {(isCreating || editingSubject) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSubject ? 'Edit Subject Performance' : 'Add New Subject'}
            </CardTitle>
            <CardDescription>
              {editingSubject ? 'Update subject performance metrics' : 'Add a new subject with performance data'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Subject Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Level *</label>
                <Select value={formData.level} onValueChange={(value: 'olevel' | 'alevel') => updateField('level', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="olevel">O-Level</SelectItem>
                    <SelectItem value="alevel">A-Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Pass Rate (%) *</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.passRate}
                  onChange={(e) => updateField('passRate', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Distinction Rate (%) *</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.distinctionRate}
                  onChange={(e) => updateField('distinctionRate', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {editingSubject ? 'Update' : 'Create'} Subject
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* O-Level Subjects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>O-Level Subjects</CardTitle>
            <CardDescription>
              Subject performance metrics for O-Level
            </CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingSubject}>
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {olevelSubjects.map((subject) => (
              <div key={subject.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{subject.name}</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(subject)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pass Rate</span>
                      <span className="font-medium text-green-600">{subject.passRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${subject.passRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Distinction Rate</span>
                      <span className="font-medium text-blue-600">{subject.distinctionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${subject.distinctionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* A-Level Subjects */}
      <Card>
        <CardHeader>
          <CardTitle>A-Level Subjects</CardTitle>
          <CardDescription>
            Subject performance metrics for A-Level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alevelSubjects.map((subject) => (
              <div key={subject.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{subject.name}</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(subject)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pass Rate</span>
                      <span className="font-medium text-green-600">{subject.passRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${subject.passRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Distinction Rate</span>
                      <span className="font-medium text-blue-600">{subject.distinctionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${subject.distinctionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};