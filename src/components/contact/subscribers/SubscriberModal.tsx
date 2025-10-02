import React from 'react'
import Modal from '@/components/commons/Modal'
import type { SubscriberFormData } from './SubscriberForm'
import SubscriberForm from './SubscriberForm'

export interface SubscriberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SubscriberFormData) => void
  isLoading?: boolean
  error?: string | null
  initialData?: SubscriberFormData
  isEditing?: boolean
}

const SubscriberModal: React.FC<SubscriberModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { email: '' },
  isEditing = false
}) => {
  const title = isEditing ? 'Edit Subscriber' : 'Add New Subscriber'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <SubscriberForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onClose}
        isLoading={isLoading}
        error={error}
        isEditing={isEditing}
      />
    </Modal>
  )
}

export default SubscriberModal
