import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import React, { useState, useEffect } from 'react'

interface Department {
  id: string;
  name: string;
  email: string;
}

const Department = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Load departments from localStorage on component mount
  useEffect(() => {
    const savedDepartments = localStorage.getItem('departments');
    if (savedDepartments) {
      setDepartments(JSON.parse(savedDepartments));
    }
  }, []);

  // Save departments to localStorage whenever departments change
  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (editingDepartment) {
      // Update existing department
      setDepartments(prev => 
        prev.map(dept => 
          dept.id === editingDepartment.id 
            ? { ...dept, ...formData }
            : dept
        )
      );
    } else {
      // Add new department
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...formData
      };
      setDepartments(prev => [...prev, newDepartment]);
    }

    resetForm();
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({ name: department.name, email: department.email });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(prev => prev.filter(dept => dept.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '' });
    setEditingDepartment(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            Add New Department
          </button>
        </div>

        {/* Departments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {departments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No departments found. Add your first department!
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((department) => (
                  <tr key={department.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {department.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {department.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(department)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(department.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingDepartment ? 'Edit Department' : 'Add New Department'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter department name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter department email"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  >
                    {editingDepartment ? 'Update' : 'Add'} Department
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Department