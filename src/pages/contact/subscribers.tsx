import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import {
  useSubscriberStore,
  useSubscribers,
  useSubscribersLoading,
  useSubscribersError
} from '@/stores/subscriberStore'
import type { CreateSubscriberData } from '@/services/contact/subscriberService'
import type { Column } from '@/components/commons/Table'
import ActionButtons from '@/components/commons/ActionButtons'
import SubscriberModal from '@/components/contact/subscribers/SubscriberModal'
import Table from '@/components/commons/Table'


interface Subscriber {
  id: string
  email: string
  createdAt: string
}

const SubscribersPage = () => {
  const subscribers = useSubscribers()
  const isLoading = useSubscribersLoading()
  const error = useSubscribersError()
  const {
    fetchSubscribers,
    createSubscriber,
    deleteSubscriber,
    clearError
  } = useSubscriberStore()

  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc'
  })


  console.log('sucbbbbbb::::', subscribers)

  useEffect(() => {
    fetchSubscribers({
      limit: 12,
      offset: 0,
      sortField: sortConfig.key,
      sortOrder: sortConfig.direction
    })
  }, [ sortConfig])

  useEffect(() => {
    if (!isModalOpen) clearError()
  }, [isModalOpen, clearError])

  const handleSubmit = async (formData: { email: string }) => {
    try {
      if (editingSubscriber) {
      } else {
        const createData: CreateSubscriberData = { email: formData.email }
        await createSubscriber(createData)
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save subscriber:', error)
    }
  }

  

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await deleteSubscriber(id)
      } catch (error) {
        console.error('Failed to delete subscriber:', error)
      }
    }
  }

  const handleSort = (key: string, direction: 'asc' | 'desc') => setSortConfig({ key, direction })

  const resetForm = () => {
    setEditingSubscriber(null)
    setIsModalOpen(false)
    clearError()
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const getInitialFormData = () => {
    return editingSubscriber ? { email: editingSubscriber.email } : { email: '' }
  }

  const columns: Column<Subscriber>[] = [
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (value) => <span className="text-gray-900 font-medium">{value}</span>
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (value) => <span className="text-gray-500">{new Date(value).toLocaleDateString()}</span>
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '200px',
      render: (_, row) => (
        <ActionButtons
          id={row.id}
          actions={[
            // { label: 'Edit', onClick: () => handleEdit(row), variant: 'primary', disabled: isLoading },
            { label: 'Delete', onClick: handleDelete, variant: 'danger', disabled: isLoading }
          ]}
        />
      )
    }
  ]

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Subscribers</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Add New Subscriber'}
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Table
          data={subscribers}
          columns={columns}
          loading={isLoading}
          emptyMessage="No subscribers found. Add your first subscriber!"
          onSort={handleSort}
          sortKey={sortConfig.key}
          sortDirection={sortConfig.direction}
          rowKey="id"
          striped
          hover
        />

        <SubscriberModal
          isOpen={isModalOpen}
          onClose={resetForm}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          initialData={getInitialFormData()}
          isEditing={!!editingSubscriber}
        />
      </div>
    </DashboardLayout>
  )
}

export default SubscribersPage
