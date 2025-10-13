// src/components/dashboard/uneb-performance/SubjectManager.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Edit, Plus, Trash2 } from 'lucide-react';
import type { AcademicYear, SubjectPerformance } from '@/types/uneb-performance';

interface SubjectManagerProps {
  selectedYear: AcademicYear;
  onUpdate: () => void;
}

const API_BASE_URL = 'http://localhost:5001';

export const SubjectManager = ({ selectedYear, onUpdate }: SubjectManagerProps) => {
  const [subjects, setSubjects] = useState<SubjectPerformance[]>([]);
  const [editingSubject, setEditingSubject] = useState<SubjectPerformance | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    passRate: 0,
    distinctionRate: 0,
    level: 'olevel' as 'olevel' | 'alevel'
  });

  useEffect(() => {
    loadSubjects();
  }, [selectedYear]);

  const loadSubjects = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/subject-performance`);
      // console.log('response', response)
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to load subjects:', error);
      setError('Failed to load subjects. Please try again.');
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
    setError(null);
  };

  const handleSave = async () => {
    if (!formData.name || formData.passRate < 0 || formData.distinctionRate < 0) {
      setError('Please fill in all fields with valid values');
      return;
    }

    if (formData.passRate > 100 || formData.distinctionRate > 100) {
      setError('Rates cannot exceed 100%');
      return;
    }

    if (formData.distinctionRate > formData.passRate) {
      setError('Distinction rate cannot exceed pass rate');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        yearId: selectedYear.id,
        name: formData.name.trim(),
        passRate: parseFloat(formData.passRate.toString()),
        distinctionRate: parseFloat(formData.distinctionRate.toString()),
        level: formData.level
      };

      if (editingSubject) {
        // Update existing subject
        await axios.put(
          `${API_BASE_URL}/subject-performance/${editingSubject.id}`,
          payload
        );
      } else {
        // Create new subject
        await axios.post(
          `${API_BASE_URL}/subject-performance`,
          payload
        );
      }

      resetForm();
      await loadSubjects();
      onUpdate();
    } catch (error: any) {
      console.error('Failed to save subject:', error);
      setError(
        error.response?.data?.message || 
        'Failed to save subject. Please try again.'
      );
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
    setError(null);
  };

  const handleDelete = async (subjectId: string) => {
    if (!confirm('Are you sure you want to delete this subject?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_BASE_URL}/subject-performance/${subjectId}`);
      await loadSubjects();
      onUpdate();
    } catch (error: any) {
      console.error('Failed to delete subject:', error);
      setError(
        error.response?.data?.message || 
        'Failed to delete subject. Please try again.'
      );
    } finally {
      setLoading(false);
    }
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
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

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
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Level *</label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value: 'olevel' | 'alevel') => updateField('level', value)}
                  disabled={loading}
                >
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
                  step="0.01"
                  value={formData.passRate}
                  onChange={(e) => updateField('passRate', parseFloat(e.target.value) || 0)}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Distinction Rate (%) *</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.distinctionRate}
                  onChange={(e) => updateField('distinctionRate', parseFloat(e.target.value) || 0)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : editingSubject ? 'Update' : 'Create'} Subject
              </Button>
              <Button variant="outline" onClick={resetForm} disabled={loading}>
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
          <Button 
            onClick={() => setIsCreating(true)} 
            disabled={isCreating || !!editingSubject || loading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </CardHeader>
        <CardContent>
          {olevelSubjects.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No O-Level subjects found</p>
          ) : (
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
                        disabled={loading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(subject.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
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
          )}
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
          {alevelSubjects.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No A-Level subjects found</p>
          ) : (
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
                        disabled={loading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(subject.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};