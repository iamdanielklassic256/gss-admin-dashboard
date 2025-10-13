// src/components/dashboard/uneb-performance/TopPerformersManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, Edit, Trash2, Trophy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

interface AcademicYear {
  id: string;
  year: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TopPerformer {
  id: string;
  name: string;
  level: 'O-Level' | 'A-Level';
  aggregate: number;
  distinctions?: number;
  subjects: string;
  category: 'overall' | 'science' | 'arts' | 'female';
  photoUrl?: string;
  yearId: string;
  createdAt: string;
  updatedAt: string;
  academicYear?: AcademicYear;
}

interface TopPerformersResponse {
  oLevel: TopPerformer[];
  aLevel: TopPerformer[];
}

interface TopPerformersManagerProps {
  selectedYear: AcademicYear;
  onUpdate: () => void;
}

export const TopPerformersManager = ({ selectedYear, onUpdate }: TopPerformersManagerProps) => {
  const [oLevelPerformers, setOLevelPerformers] = useState<TopPerformer[]>([]);
  const [aLevelPerformers, setALevelPerformers] = useState<TopPerformer[]>([]);
  const [editingPerformer, setEditingPerformer] = useState<TopPerformer | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    level: 'O-Level' as 'O-Level' | 'A-Level',
    aggregate: '',
    distinctions: '',
    subjects: '',
    category: 'overall' as 'overall' | 'science' | 'arts' | 'female',
    photoUrl: ''
  });

  const API_BASE_URL = 'http://localhost:5001';

  useEffect(() => {
    loadPerformers();
  }, [selectedYear]);

  const loadPerformers = async () => {
    try {
      const response = await axios.get<TopPerformersResponse>(
        `${API_BASE_URL}/top-performers/year/${selectedYear.id}`
      );
      console.log('responsese')
      setOLevelPerformers(response.data.oLevel || []);
      setALevelPerformers(response.data.aLevel || []);
    } catch (error) {
      console.error('Failed to load top performers:', error);
      toast({
        title: "Error",
        description: "Failed to load top performers",
        variant: "destructive",
      });
    }
  };

  // console.log('oLevelPerformers', oLevelPerformers)

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'O-Level',
      aggregate: '',
      distinctions: '',
      subjects: '',
      category: 'overall',
      photoUrl: ''
    });
    setEditingPerformer(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.aggregate || !formData.subjects) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Aggregate, Subjects)",
        variant: "destructive",
      });
      return;
    }

    const aggregateNum = parseInt(formData.aggregate);
    if (isNaN(aggregateNum)) {
      toast({
        title: "Validation Error",
        description: "Aggregate must be a valid number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        level: formData.level,
        aggregate: aggregateNum,
        distinctions: formData.distinctions ? parseInt(formData.distinctions) : undefined,
        subjects: formData.subjects,
        category: formData.category,
        photoUrl: formData.photoUrl || undefined,
        yearId: selectedYear.id
      };

      if (editingPerformer) {
        await axios.patch(`${API_BASE_URL}/top-performers/${editingPerformer.id}`, payload);
        toast({
          title: "Success",
          description: "Top performer updated successfully",
        });
      } else {
        await axios.post(`${API_BASE_URL}/top-performers`, payload);
        toast({
          title: "Success",
          description: "Top performer created successfully",
        });
      }
      
      resetForm();
      loadPerformers();
      onUpdate();
    } catch (error: any) {
      console.error('Failed to save top performer:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Failed to save top performer";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (performer: TopPerformer) => {
    setFormData({
      name: performer.name,
      level: performer.level,
      aggregate: performer.aggregate.toString(),
      distinctions: performer.distinctions?.toString() || '',
      subjects: performer.subjects,
      category: performer.category,
      photoUrl: performer.photoUrl || ''
    });
    setEditingPerformer(performer);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this top performer? This action cannot be undone.')) return;

    setDeleteLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/top-performers/${id}`);
      toast({
        title: "Success",
        description: "Top performer deleted successfully",
      });
      loadPerformers();
      onUpdate();
    } catch (error: any) {
      console.error('Failed to delete top performer:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Failed to delete top performer";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const allPerformers = [...oLevelPerformers, ...aLevelPerformers];

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
              {editingPerformer ? 'Update performer details' : `Add a new top performing student for ${selectedYear.year}`}
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
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Level *</label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value: 'O-Level' | 'A-Level') => updateField('level', value)}
                  disabled={loading}
                >
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
                  type="number"
                  value={formData.aggregate}
                  onChange={(e) => updateField('aggregate', e.target.value)}
                  placeholder="e.g., 8 or 15"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Distinctions (Optional)</label>
                <Input
                  type="number"
                  value={formData.distinctions}
                  onChange={(e) => updateField('distinctions', e.target.value)}
                  placeholder="e.g., 8"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Category *</label>
              <Select 
                value={formData.category} 
                onValueChange={(value: any) => updateField('category', value)}
                disabled={loading}
              >
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

            <div>
              <label className="text-sm font-medium">Subjects Performance *</label>
              <Textarea
                value={formData.subjects}
                onChange={(e) => updateField('subjects', e.target.value)}
                placeholder="e.g., Mathematics, Physics, Chemistry, Biology"
                rows={2}
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Photo URL (Optional)</label>
              <Input
                value={formData.photoUrl}
                onChange={(e) => updateField('photoUrl', e.target.value)}
                placeholder="https://example.com/photo.jpg"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? (editingPerformer ? 'Updating...' : 'Creating...') : (editingPerformer ? 'Update' : 'Create')} Performer
              </Button>
              <Button variant="outline" onClick={resetForm} disabled={loading}>
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
            <CardTitle>Top Performers - {selectedYear.year}</CardTitle>
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
          {allPerformers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="font-medium">No top performers added for {selectedYear.year}</p>
              <p className="text-sm mt-1">Click "Add Performer" to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* O-Level Performers */}
              {oLevelPerformers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    O-Level Performers
                  </h3>
                  <div className="space-y-3">
                    {oLevelPerformers.map((performer) => (
                      <div key={performer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{performer.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              performer.category === 'overall' ? 'bg-yellow-100 text-yellow-800' :
                              performer.category === 'science' ? 'bg-blue-100 text-blue-800' :
                              performer.category === 'arts' ? 'bg-purple-100 text-purple-800' :
                              'bg-pink-100 text-pink-800'
                            }`}>
                              {performer.category.charAt(0).toUpperCase() + performer.category.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Level:</span> {performer.level}
                            </div>
                            <div>
                              <span className="font-medium">Aggregate:</span> {performer.aggregate}
                            </div>
                            {performer.distinctions && (
                              <div>
                                <span className="font-medium">Distinctions:</span> {performer.distinctions}
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Subjects:</span> {performer.subjects}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(performer)}
                            disabled={loading || deleteLoading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(performer.id)}
                            disabled={loading || deleteLoading}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* A-Level Performers */}
              {aLevelPerformers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-green-600" />
                    A-Level Performers
                  </h3>
                  <div className="space-y-3">
                    {aLevelPerformers.map((performer) => (
                      <div key={performer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{performer.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              performer.category === 'overall' ? 'bg-yellow-100 text-yellow-800' :
                              performer.category === 'science' ? 'bg-blue-100 text-blue-800' :
                              performer.category === 'arts' ? 'bg-purple-100 text-purple-800' :
                              'bg-pink-100 text-pink-800'
                            }`}>
                              {performer.category.charAt(0).toUpperCase() + performer.category.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Level:</span> {performer.level}
                            </div>
                            <div>
                              <span className="font-medium">Points:</span> {performer.aggregate}
                            </div>
                            {performer.distinctions && (
                              <div>
                                <span className="font-medium">Distinctions:</span> {performer.distinctions}
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Subjects:</span> {performer.subjects}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(performer)}
                            disabled={loading || deleteLoading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(performer.id)}
                            disabled={loading || deleteLoading}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};