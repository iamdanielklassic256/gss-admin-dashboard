// src/components/dashboard/uneb-performance/AcademicYearManager.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Save, Plus, Check, Calendar, Trash2, Edit } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface AcademicYear {
  id: string;
  year: string;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AcademicYearManagerProps {
  academicYears: AcademicYear[];
  onUpdate: () => void;
}

export const AcademicYearManager = ({ academicYears, onUpdate }: AcademicYearManagerProps) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [newYear, setNewYear] = useState('');
  const [setAsCurrent, setSetAsCurrent] = useState(false);
  const [editYearValue, setEditYearValue] = useState('');
  const { toast } = useToast();

  const API_BASE_URL = 'http://localhost:5001';

  const handleCreateYear = async () => {
    if (!newYear || !/^\d{4}$/.test(newYear)) {
      toast({
        title: "Invalid Year",
        description: "Please enter a valid 4-digit year",
        variant: "destructive",
      });
      return;
    }

    if (academicYears.find(ay => ay.year === newYear)) {
      toast({
        title: "Year Exists",
        description: "Academic year already exists",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/academic-years`, {
        year: newYear,
        isCurrent: setAsCurrent
      });
      setNewYear('');
      setSetAsCurrent(false);
      setCreateDialogOpen(false);
      toast({
        title: "Success",
        description: `Academic year ${newYear} created successfully`,
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to create academic year:', error);
      toast({
        title: "Error",
        description: "Failed to create academic year. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetCurrent = async (year: string) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/academic-years/${year}/set-current`);
      toast({
        title: "Success",
        description: `Academic year ${year} is now the current year`,
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to set current year:', error);
      toast({
        title: "Error",
        description: "Failed to set current year. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateYear = async () => {
    if (!selectedYear) return;

    if (!editYearValue || !/^\d{4}$/.test(editYearValue)) {
      toast({
        title: "Invalid Year",
        description: "Please enter a valid 4-digit year",
        variant: "destructive",
      });
      return;
    }

    if (academicYears.find(ay => ay.year === editYearValue && ay.id !== selectedYear.id)) {
      toast({
        title: "Year Exists",
        description: "Academic year already exists",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.patch(`${API_BASE_URL}/academic-years/${selectedYear.id}`, {
        year: editYearValue
      });
      setEditDialogOpen(false);
      setSelectedYear(null);
      setEditYearValue('');
      toast({
        title: "Success",
        description: `Academic year updated to ${editYearValue}`,
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to update academic year:', error);
      toast({
        title: "Error",
        description: "Failed to update academic year. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteYear = async () => {
    if (!selectedYear) return;

    setDeleteLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/academic-years/${selectedYear.year}`);
      setDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: `Academic year ${selectedYear.year} deleted successfully`,
      });
      setSelectedYear(null);
      onUpdate();
    } catch (error: any) {
      console.error('Failed to delete academic year:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Failed to delete academic year. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const openEditDialog = (year: AcademicYear) => {
    setSelectedYear(year);
    setEditYearValue(year.year);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (year: AcademicYear) => {
    setSelectedYear(year);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Add New Year Card */}
      <Card>
        <CardHeader>
          <CardTitle>Add Academic Year</CardTitle>
          <CardDescription>
            Create new academic years to organize performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Academic Year
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Academic Year</DialogTitle>
                <DialogDescription>
                  Create a new academic year. Enter a 4-digit year value.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder="e.g., 2024"
                    maxLength={4}
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="setCurrent"
                    checked={setAsCurrent}
                    onCheckedChange={(checked) => setSetAsCurrent(checked as boolean)}
                    disabled={loading}
                  />
                  <Label htmlFor="setCurrent" className="font-normal">
                    Set as current year
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCreateDialogOpen(false);
                    setNewYear('');
                    setSetAsCurrent(false);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateYear} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Year'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Academic Years List */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Years</CardTitle>
          <CardDescription>
            Manage all academic years and set the current active year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicYears.map((year) => (
              <div key={year.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{year.year}</span>
                      {year.isCurrent && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Current Year
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Created: {new Date(year.createdAt).toLocaleDateString()}
                      {year.updatedAt !== year.createdAt && (
                        <span> • Updated: {new Date(year.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!year.isCurrent && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetCurrent(year.year)}
                        disabled={loading}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Set Current
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(year)}
                        disabled={loading}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(year)}
                        disabled={loading || deleteLoading}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </>
                  )}
                  {year.isCurrent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(year)}
                      disabled={loading}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {academicYears.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No academic years found</p>
                <p className="text-sm">Add your first academic year to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Academic Year</DialogTitle>
            <DialogDescription>
              Update the academic year value. Enter a 4-digit year.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editYear">Year *</Label>
              <Input
                id="editYear"
                value={editYearValue}
                onChange={(e) => setEditYearValue(e.target.value)}
                placeholder="e.g., 2024"
                maxLength={4}
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setEditDialogOpen(false);
                setSelectedYear(null);
                setEditYearValue('');
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateYear} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Updating...' : 'Update Year'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the academic year <strong>{selectedYear?.year}</strong>. 
              This action cannot be undone and may affect associated performance data.
              {selectedYear?.isCurrent && (
                <span className="block mt-2 text-red-600 font-medium">
                  Note: This is the current academic year. You cannot delete it until you set another year as current.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setSelectedYear(null);
                setDeleteDialogOpen(false);
              }}
              disabled={deleteLoading}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteYear}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};