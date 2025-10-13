// src/components/dashboard/uneb-performance/TopPerformersManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, Edit, Trash2 } from 'lucide-react';
import type { TopPerformer } from '@/types/uneb-performance';
import { unebPerformanceApi } from '@/services/academic/uneb-performance-api';

interface TopPerformersManagerProps {
  year: string;
  onUpdate: () => void;
}

export const TopPerformersManager = ({ year, onUpdate }: TopPerformersManagerProps) => {
  const [performers, setPerformers] = useState<TopPerformer[]>([]);
  const [editingPerformer, setEditingPerformer] = useState<TopPerformer | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    level: 'O-Level' as 'O-Level' | 'A-Level',
    aggregate: '',
    subjects: '',
    achievement: '',
    category: 'overall' as 'overall' | 'science' | 'arts' | 'female',
    photoUrl: ''
  });

  useEffect(() => {
    loadPerformers();
  }, [year]);

  const loadPerformers = async () => {
    try {
      const data = await unebPerformanceApi.getTopPerformers(year);
      setPerformers(data);
    } catch (error) {
      console.error('Failed to load top performers:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'O-Level',
      aggregate: '',
      subjects: '',
      achievement: '',
      category: 'overall',
      photoUrl: ''
    });
    setEditingPerformer(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.aggregate || !formData.subjects || !formData.achievement) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingPerformer) {
        // await unebPerformanceApi.updateTopPerform(editingPerformer.id, {
        //   ...formData,
        //   year
        // });
      } else {
        await unebPerformanceApi.createTopPerformer({
          ...formData,
          year
        });
      }
      resetForm();
      loadPerformers();
      onUpdate();
    } catch (error) {
      console.error('Failed to save top performer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (performer: TopPerformer) => {
    setFormData({
      name: performer.name,
      level: performer.level,
      aggregate: performer.aggregate,
      subjects: performer.subjects,
      achievement: performer.achievement,
      category: performer.category,
      photoUrl: performer.photoUrl || ''
    });
    setEditingPerformer(performer);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this top performer?')) return;

    try {
      await unebPerformanceApi.deleteTopPerformer(id);
      loadPerformers();
      onUpdate();
    } catch (error) {
      console.error('Failed to delete top performer:', error);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {(isCreating || editingPerformer) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPerformer ? 'Edit Top Performer' : 'Add New Top Performer'}
            </CardTitle>
            <CardDescription>
              {editingPerformer ? 'Update performer details' : 'Add a new top performing student'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Student Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Level *</label>
                <Select value={formData.level} onValueChange={(value: 'O-Level' | 'A-Level') => updateField('level', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="O-Level">O-Level</SelectItem>
                    <SelectItem value="A-Level">A-Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Aggregate/Points *</label>
                <Input
                  value={formData.aggregate}
                  onChange={(e) => updateField('aggregate', e.target.value)}
                  placeholder="e.g., 8 or 15 points"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category *</label>
                <Select value={formData.category} onValueChange={(value: any) => updateField('category', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overall">Best Overall</SelectItem>
                    <SelectItem value="science">Best Science</SelectItem>
                    <SelectItem value="arts">Best Arts</SelectItem>
                    <SelectItem value="female">Best Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Subjects Performance *</label>
              <Textarea
                value={formData.subjects}
                onChange={(e) => updateField('subjects', e.target.value)}
                placeholder="e.g., Mathematics, Physics, Chemistry, Biology - D1"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Achievement Title *</label>
              <Input
                value={formData.achievement}
                onChange={(e) => updateField('achievement', e.target.value)}
                placeholder="e.g., Best Student Overall"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Photo URL (Optional)</label>
              <Input
                value={formData.photoUrl}
                onChange={(e) => updateField('photoUrl', e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {editingPerformer ? 'Update' : 'Create'} Performer
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List of Performers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Performers - {year}</CardTitle>
            <CardDescription>
              Manage outstanding students and their achievements
            </CardDescription>
          </div>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingPerformer}>
            <Plus className="h-4 w-4 mr-2" />
            Add Performer
          </Button>
        </CardHeader>
        <CardContent>
          {performers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No top performers added for {year}
            </div>
          ) : (
            <div className="space-y-4">
              {performers.map((performer) => (
                <div key={performer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{performer.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        performer.category === 'overall' ? 'bg-yellow-100 text-yellow-800' :
                        performer.category === 'science' ? 'bg-blue-100 text-blue-800' :
                        performer.category === 'arts' ? 'bg-purple-100 text-purple-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {performer.category}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Level:</span> {performer.level}
                      </div>
                      <div>
                        <span className="font-medium">Aggregate:</span> {performer.aggregate}
                      </div>
                      <div>
                        <span className="font-medium">Achievement:</span> {performer.achievement}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {performer.subjects}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(performer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(performer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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