// src/components/dashboard/uneb-performance/PerformanceManager.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, X } from 'lucide-react';
import type { PerformanceOverview } from '@/types/uneb-performance';
import { unebPerformanceApi } from '@/services/academic/uneb-performance-api';

interface PerformanceManagerProps {
  year: string;
  performanceData: PerformanceOverview | null;
  onUpdate: () => void;
}

export const PerformanceManager = ({ year, performanceData, onUpdate }: PerformanceManagerProps) => {
  const [editingLevel, setEditingLevel] = useState<'olevel' | 'alevel' | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const startEditing = (level: 'olevel' | 'alevel') => {
    const existingData = performanceData?.[level];
    setFormData(existingData || {
      year,
      level,
      totalCandidates: 0,
      passRate: 0,
      divisions: level === 'olevel' ? {
        division1: 0,
        division2: 0,
        division3: 0,
        division4: 0
      } : {
        principal: 0,
        subsidiary: 0,
        failed: 0
      },
      highlights: ['']
    });
    setEditingLevel(level);
  };

  const handleSave = async () => {
    if (!editingLevel || !formData) return;

    setLoading(true);
    try {
      if (performanceData?.[editingLevel]) {
        // Update existing
        await unebPerformanceApi.updatePerformanceData(year, editingLevel, formData);
      } else {
        // Create new
        await unebPerformanceApi.createPerformanceData(formData);
      }
      setEditingLevel(null);
      setFormData(null);
      onUpdate();
    } catch (error) {
      console.error('Failed to save performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateDivision = (division: string, value: number) => {
    setFormData((prev: any) => ({
      ...prev,
      divisions: {
        ...prev.divisions,
        [division]: value
      }
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    updateField('highlights', newHighlights);
  };

  const addHighlight = () => {
    updateField('highlights', [...formData.highlights, '']);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_: string, i: number) => i !== index);
    updateField('highlights', newHighlights);
  };

  if (editingLevel) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Edit {editingLevel === 'olevel' ? 'O-Level' : 'A-Level'} Performance - {year}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Total Candidates</label>
              <Input
                type="number"
                value={formData.totalCandidates}
                onChange={(e) => updateField('totalCandidates', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Pass Rate (%)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.passRate}
                onChange={(e) => updateField('passRate', parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-medium mb-3">Division Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {editingLevel === 'olevel' ? (
                <>
                  <div>
                    <label className="text-sm">Division I</label>
                    <Input
                      type="number"
                      value={formData.divisions.division1}
                      onChange={(e) => updateDivision('division1', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Division II</label>
                    <Input
                      type="number"
                      value={formData.divisions.division2}
                      onChange={(e) => updateDivision('division2', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Division III</label>
                    <Input
                      type="number"
                      value={formData.divisions.division3}
                      onChange={(e) => updateDivision('division3', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Division IV</label>
                    <Input
                      type="number"
                      value={formData.divisions.division4}
                      onChange={(e) => updateDivision('division4', parseInt(e.target.value))}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm">2+ Principals</label>
                    <Input
                      type="number"
                      value={formData.divisions.principal}
                      onChange={(e) => updateDivision('principal', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm">1 Principal + Sub</label>
                    <Input
                      type="number"
                      value={formData.divisions.subsidiary}
                      onChange={(e) => updateDivision('subsidiary', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Failed</label>
                    <Input
                      type="number"
                      value={formData.divisions.failed}
                      onChange={(e) => updateDivision('failed', parseInt(e.target.value))}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Key Highlights</h4>
              <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                <Plus className="h-4 w-4 mr-1" />
                Add Highlight
              </Button>
            </div>
            <div className="space-y-2">
              {formData.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    placeholder="Enter performance highlight..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeHighlight(index)}
                    disabled={formData.highlights.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setEditingLevel(null)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* O-Level Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>O-Level (UCE) Performance</CardTitle>
            <CardDescription>
              Manage O-Level examination results and statistics
            </CardDescription>
          </div>
          <Button onClick={() => startEditing('olevel')}>
            {performanceData?.olevel ? 'Edit Data' : 'Add Data'}
          </Button>
        </CardHeader>
        <CardContent>
          {performanceData?.olevel ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">{performanceData.olevel.totalCandidates}</div>
                  <div className="text-sm text-gray-600">Total Candidates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{performanceData.olevel.passRate}%</div>
                  <div className="text-sm text-gray-600">Pass Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{performanceData.olevel.divisions.division1}</div>
                  <div className="text-sm text-gray-600">Division I</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{performanceData.olevel.divisions.division2}</div>
                  <div className="text-sm text-gray-600">Division II</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No O-Level data available for {year}</p>
          )}
        </CardContent>
      </Card>

      {/* A-Level Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>A-Level (UACE) Performance</CardTitle>
            <CardDescription>
              Manage A-Level examination results and statistics
            </CardDescription>
          </div>
          <Button onClick={() => startEditing('alevel')}>
            {performanceData?.alevel ? 'Edit Data' : 'Add Data'}
          </Button>
        </CardHeader>
        <CardContent>
          {performanceData?.alevel ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">{performanceData.alevel.totalCandidates}</div>
                  <div className="text-sm text-gray-600">Total Candidates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{performanceData.alevel.passRate}%</div>
                  <div className="text-sm text-gray-600">Pass Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{performanceData.alevel.divisions.principal}</div>
                  <div className="text-sm text-gray-600">2+ Principals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{performanceData.alevel.divisions.subsidiary}</div>
                  <div className="text-sm text-gray-600">1 Principal + Sub</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No A-Level data available for {year}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};