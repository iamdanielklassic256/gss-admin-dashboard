'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, X, Save } from 'lucide-react';
import { API_BASE_URL } from '@/app/api';

// 🧩 Types
interface AcademicYear {
  id: string;
  year: string;
  isCurrent: boolean;
}

interface Divisions {
  division1?: number;
  division2?: number;
  division3?: number;
  division4?: number;
  principal?: number;
  subsidiary?: number;
  failed?: number;
}

interface PerformanceRecord {
  id?: string;
  yearId: string;
  level: 'olevel' | 'alevel';
  totalCandidates: number;
  passRate: number;
  divisions: Divisions;
  highlights: string[];
}

interface PerformanceManagerProps {
  selectedYear: AcademicYear;
  onUpdate: () => void;
}

export const PerformanceManager = ({ selectedYear, onUpdate }: PerformanceManagerProps) => {
  const [level, setLevel] = useState<'olevel' | 'alevel'>('olevel');
  const [data, setData] = useState<PerformanceRecord | null>(null);
  const [formData, setFormData] = useState<PerformanceRecord>({
    yearId: selectedYear.id,
    level: 'olevel',
    totalCandidates: 0,
    passRate: 0,
    divisions: {},
    highlights: [''],
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch performance data whenever year or level changes
  useEffect(() => {
    if (!selectedYear) return;
    fetchPerformanceData();
  }, [selectedYear, level]);

  async function fetchPerformanceData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/uneb-performance/${selectedYear.id}/${level}`
      );
      setData(res.data);
      setFormData(res.data);
    } catch (err) {
      setData(null);
      setFormData({
        yearId: selectedYear.id,
        level,
        totalCandidates: 0,
        passRate: 0,
        divisions: {},
        highlights: [''],
      });
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Update form fields
  function updateField(field: keyof PerformanceRecord, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function updateDivision(division: keyof Divisions, value: number) {
    setFormData((prev) => ({
      ...prev,
      divisions: { ...prev.divisions, [division]: value },
    }));
  }

  function updateHighlight(index: number, value: string) {
    const highlights = [...formData.highlights];
    highlights[index] = value;
    updateField('highlights', highlights);
  }

  function addHighlight() {
    updateField('highlights', [...formData.highlights, '']);
  }

  function removeHighlight(index: number) {
    const highlights = formData.highlights.filter((_, i) => i !== index);
    updateField('highlights', highlights.length ? highlights : ['']);
  }

  // 🔹 Save or update
  async function handleSave() {
    setLoading(true);
    try {
      if (data) {
        await axios.patch(
          `${API_BASE_URL}/uneb-performance/${selectedYear.id}/${level}`,
          formData
        );
        alert('Performance data updated!');
      } else {
        await axios.post(`${API_BASE_URL}/uneb-performance`, formData);
        alert('Performance data created!');
      }
      fetchPerformanceData();
      onUpdate();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save performance data');
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Delete
  async function handleDelete() {
    if (!data) return;
    if (!confirm('Are you sure you want to delete this performance data?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/uneb-performance/${selectedYear.id}/${level}`);
      alert('Performance data deleted!');
      setData(null);
      setFormData({
        yearId: selectedYear.id,
        level,
        totalCandidates: 0,
        passRate: 0,
        divisions: {},
        highlights: [''],
      });
      onUpdate();
    } catch (err) {
      console.error(err);
      alert('Failed to delete performance data');
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Division fields based on level
  const divisionFields =
    level === 'olevel'
      ? ['division1', 'division2', 'division3', 'division4']
      : ['principal', 'subsidiary', 'failed'];

  return (
    <Card className="max-w-4xl mx-auto mt-6 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle>UNEB Performance ({selectedYear.year})</CardTitle>
        <CardDescription>Manage O-Level / A-Level performance data</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Level Selector */}
        <div className="flex gap-2">
          <Button variant={level === 'olevel' ? 'default' : 'outline'} onClick={() => setLevel('olevel')}>
            O-Level
          </Button>
          <Button variant={level === 'alevel' ? 'default' : 'outline'} onClick={() => setLevel('alevel')}>
            A-Level
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-6">
            <Loader2 className="animate-spin w-6 h-6" />
          </div>
        ) : (
          <div className="space-y-3">
            {/* Total Candidates */}
            <Input
              type="number"
              value={formData.totalCandidates}
              onChange={(e) => updateField('totalCandidates', parseInt(e.target.value))}
              placeholder="Total Candidates"
            />

            {/* Pass Rate */}
            <Input
              type="number"
              step="0.01"
              value={formData.passRate}
              onChange={(e) => updateField('passRate', parseFloat(e.target.value))}
              placeholder="Pass Rate (%)"
            />

            {/* Divisions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {divisionFields.map((field) => (
                <div key={field}>
                  <label className="block text-sm capitalize">{field}</label>
                  <Input
                    type="number"
                    value={formData.divisions[field as keyof Divisions] || 0}
                    onChange={(e) =>
                      updateDivision(field as keyof Divisions, parseInt(e.target.value))
                    }
                  />
                </div>
              ))}
            </div>
            {/* Highlights */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Highlights</label>
                <Button variant="outline" size="sm" onClick={addHighlight}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.highlights.map((h, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Textarea
                      value={h}
                      onChange={(e) => updateHighlight(idx, e.target.value)}
                      placeholder="Enter highlight"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeHighlight(idx)}
                      disabled={formData.highlights.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-3">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-1" /> {data ? 'Update' : 'Save'}
              </Button>
              {data && (
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
