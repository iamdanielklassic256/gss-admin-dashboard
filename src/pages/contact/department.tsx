import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import {
  useDepartmentContactStore,
  useContacts,
  useContactsLoading,
  useContactsError
} from '@/stores/departmentContactStore'
import type { CreateDepartmentContactData, UpdateDepartmentContactData } from '@/services/contact/departmentContactService'
import type { DepartmentFormData } from '@/components/commons/DepartmentForm'
import DepartmentModal from '@/components/contact/department/DepartmentModal'
import type { Column } from '@/components/commons/Table'
import ActionButtons from '@/components/commons/ActionButtons'
import Table from '@/components/commons/Table'

interface Department {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const Department = () => {
  // Use the store hooks
  const contacts = useContacts();
  const isLoading = useContactsLoading();
  const error = useContactsError();
  const {
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    clearError
  } = useDepartmentContactStore();

  const [editingDepartment, setEditingDepartment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc'
  });

  // Load departments from API on component mount
  useEffect(() => {
    fetchContacts({
      limit: 12,
      offset: 0,
      sortField: sortConfig.key,
      sortOrder: sortConfig.direction
    });
  }, [fetchContacts, sortConfig]);

  // Clear errors when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      clearError();
    }
  }, [isModalOpen, clearError]);

  const handleSubmit = async (formData: DepartmentFormData) => {
    try {
      if (editingDepartment) {
        // Update existing department
        const updateData: UpdateDepartmentContactData = {
          name: formData.name,
          email: formData.email
        };
        await updateContact(editingDepartment.id, updateData);
      } else {
        // Add new department
        const createData: CreateDepartmentContactData = {
          name: formData.name,
          email: formData.email
        };
        await createContact(createData);
      }

      // Close modal on success
      resetForm();
    } catch (error) {
      // Error is already handled in the store
      console.error('Failed to save department:', error);
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setIsModalOpen(true);
    clearError();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteContact(id);
      } catch (error) {
        console.error('Failed to delete department:', error);
      }
    }
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
  };

  const resetForm = () => {
    setEditingDepartment(null);
    setIsModalOpen(false);
    clearError();
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Prepare initial data for the form
  const getInitialFormData = (): DepartmentFormData => {
    if (editingDepartment) {
      return {
        name: editingDepartment.name,
        email: editingDepartment.email
      };
    }
    return { name: '', email: '' };
  };

  // Define table columns
  const columns: Column<Department>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (value) => (
        <span className="text-gray-500">{value}</span>
      )
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (value) => (
        <span className="text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '200px',
      render: (_, row) => (
        <ActionButtons
          id={row.id}
          actions={[
            {
              label: 'Edit',
              onClick: () => handleEdit(row),
              variant: 'primary',
              disabled: isLoading
            },
            {
              label: 'Delete',
              onClick: handleDelete,
              variant: 'danger',
              disabled: isLoading
            }
          ]}
        />
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Department Contacts</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Add New Department'}
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Reusable Table */}
        <Table
          data={contacts}
          columns={columns}
          loading={isLoading}
          emptyMessage="No departments found. Add your first department!"
          onSort={handleSort}
          sortKey={sortConfig.key}
          sortDirection={sortConfig.direction}
          rowKey="id"
          striped
          hover
        />

        {/* Reusable Department Modal */}
        <DepartmentModal
          isOpen={isModalOpen}
          onClose={resetForm}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          initialData={getInitialFormData()}
          isEditing={!!editingDepartment}
        />
      </div>
    </DashboardLayout>
  )
}

export default Department