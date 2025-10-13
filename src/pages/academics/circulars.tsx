import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import type { Circular, CreateCircularDto } from '@/types/circular';
import { circularService } from '@/services/academic/circularService';
import { CircularCard } from '@/components/academics/circulars/CircularCard';
import { CreateCircularModal } from '@/components/academics/circulars/CreateCircularModal';
import { CircularFilters } from '@/components/academics/circulars/CircularFilters';

export const CircularPage = () => {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [filteredCirculars, setFilteredCirculars] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    search: '',
  });

  useEffect(() => {
    loadCirculars();
  }, []);

  useEffect(() => {
    filterCirculars();
  }, [circulars, filters]);

  const loadCirculars = async () => {
    try {
      setLoading(true);
      const data = await circularService.getAllCirculars();
      setCirculars(data?.data);
    } catch (err) {
      setError('Failed to load circulars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterCirculars = () => {
    let filtered = circulars;

    if (filters.category !== 'all') {
      filtered = filtered.filter(circular => circular.category === filters.category);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(circular => circular.priority === filters.priority);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(circular =>
        circular.title.toLowerCase().includes(searchLower) ||
        circular.content.toLowerCase().includes(searchLower) ||
        circular.excerpt.toLowerCase().includes(searchLower)
      );
    }

    setFilteredCirculars(filtered);
  };

  const handleCreateCircular = async (circularData: CreateCircularDto) => {
    try {
      const newCircular = await circularService.createCircular(circularData);
      setCirculars(prev => [newCircular, ...prev]);
      setIsCreateModalOpen(false);
    } catch (err) {
      setError('Failed to create circular');
      console.error(err);
    }
  };

  const handleDeleteCircular = async (id: string) => {
    if (!confirm('Are you sure you want to delete this circular?')) return;

    try {
      await circularService.deleteCircular(id);
      setCirculars(prev => prev.filter(circular => circular.circularId !== id));
    } catch (err) {
      setError('Failed to delete circular');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
	<DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📢 Circular Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and important information
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-800">{circulars.length}</div>
            <div className="text-gray-600">Total Circulars</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-800">
              {circulars?.filter(c => new Date(c.expiryDate) > new Date()).length}
            </div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-gray-800">
              {circulars.filter(c => c.priority === 'high').length}
            </div>
            <div className="text-gray-600">High Priority</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              + New Circular
            </button>
          </div>
        </div>

        {/* Filters */}
        <CircularFilters filters={filters} onFiltersChange={setFilters} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Circulars Grid */}
        {filteredCirculars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No circulars found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new circular</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCirculars.map((circular) => (
              <CircularCard
                key={circular.circularId}
                circular={circular}
                onDelete={handleDeleteCircular}
              />
            ))}
          </div>
        )}

        {/* Create Modal */}
        <CreateCircularModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCircular}
        />
      </div>
    </div>
	</DashboardLayout>
  );
};

export default CircularPage