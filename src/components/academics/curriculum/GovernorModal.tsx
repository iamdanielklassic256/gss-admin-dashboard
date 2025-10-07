import Modal from '@/components/commons/Modal';
import React from 'react';
import type { GovernorFormData } from './GovernorForm';
import GovernorForm from './GovernorForm';

export interface GovernorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GovernorFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  initialData?: GovernorFormData;
  isEditing?: boolean;
}

const GovernorModal: React.FC<GovernorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { name: '', title: '', image: '' },
  isEditing = false
}) => {
  const title = isEditing ? 'Edit Governor' : 'Add New Governor';

  const handleFormSubmit = (data: GovernorFormData) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
    >
      <GovernorForm
        initialData={initialData}
        onSubmit={handleFormSubmit}
        onCancel={onClose}
        isLoading={isLoading}
        error={error}
        isEditing={isEditing}
      />
    </Modal>
  );
};

export default GovernorModal;
