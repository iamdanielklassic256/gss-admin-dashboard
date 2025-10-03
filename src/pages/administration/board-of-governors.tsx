import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import {
  useGovernorsStore,
  useGovernors,
  useGovernorsLoading,
  useGovernorsError,
} from '@/stores/governorsStore'
import type { CreateGovernorData, UpdateGovernorData } from '@/services/administration/bogService'
import type { Column } from '@/components/commons/Table'
import ActionButtons from '@/components/commons/ActionButtons'
import Table from '@/components/commons/Table'
import type { GovernorFormData } from '@/components/administration/governors/GovernorForm'
import GovernorModal from '@/components/administration/governors/GovernorModal'

const BoardGovernorPage = () => {
  // Store hooks
  const governors = useGovernors()
  const isLoading = useGovernorsLoading()
  const error = useGovernorsError()
  const {
    fetchGovernors,
    createGovernor,
    updateGovernor,
    deleteGovernor,
    clearError,
  } = useGovernorsStore()

  const [editingGovernor, setEditingGovernor] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc',
  })

  // Load governors on mount
  useEffect(() => {
    fetchGovernors({
      limit: 12,
      offset: 0,
      sortField: sortConfig.key,
      sortOrder: sortConfig.direction,
    })
  }, [fetchGovernors, sortConfig])

  // Clear error when modal closes
  useEffect(() => {
    if (!isModalOpen) clearError()
  }, [isModalOpen, clearError])

  const handleSubmit = async (formData: GovernorFormData) => {
    try {
      if (editingGovernor) {
        // update
        const updateData: UpdateGovernorData = {
          name: formData.name,
          title: formData.title,
          image: formData.image,
        }
        await updateGovernor(editingGovernor.id, updateData)
      } else {
        // create
        const createData: CreateGovernorData = {
          name: formData.name,
          title: formData.title,
          image: formData.image,
        }
        await createGovernor(createData)
      }
      resetForm()
    } catch (err) {
      console.error('Failed to save governor:', err)
    }
  }

  const handleEdit = (governor: any) => {
    setEditingGovernor(governor)
    setIsModalOpen(true)
    clearError()
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this governor?')) {
      try {
        await deleteGovernor(id)
      } catch (err) {
        console.error('Failed to delete governor:', err)
      }
    }
  }

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction })
  }

  const resetForm = () => {
    setEditingGovernor(null)
    setIsModalOpen(false)
    clearError()
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  // Initial data for form
  const getInitialFormData = (): GovernorFormData => {
    if (editingGovernor) {
      return {
        name: editingGovernor.name,
        title: editingGovernor.title,
        image: editingGovernor.image,
      }
    }
    return { name: '', title: '', image: '' }
  }

  // Table columns
  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (value) => <span className="font-medium text-gray-900">{value}</span>,
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      render: (value) => <span className="text-gray-500">{value}</span>,
    },
    {
      key: 'image',
      header: 'Image',
      render: (value, row) =>
        value && value !== 'string' ? (
          <img src={value} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
            {row.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
          </span>
        ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (value) => (
        <span className="text-gray-500">{new Date(value).toLocaleDateString()}</span>
      ),
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
              disabled: isLoading,
            },
            {
              label: 'Delete',
              onClick: handleDelete,
              variant: 'danger',
              disabled: isLoading,
            },
          ]}
        />
      ),
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Board of Governors</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Add New Governor'}
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
          data={governors}
          columns={columns}
          loading={isLoading}
          emptyMessage="No governors found. Add your first governor!"
          onSort={handleSort}
          sortKey={sortConfig.key}
          sortDirection={sortConfig.direction}
          rowKey="id"
          striped
          hover
        />

        {/* Reusable Governor Modal */}
        <GovernorModal
          isOpen={isModalOpen}
          onClose={resetForm}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          initialData={getInitialFormData()}
          isEditing={!!editingGovernor}
        />
      </div>
    </DashboardLayout>
  )
}

export default BoardGovernorPage
