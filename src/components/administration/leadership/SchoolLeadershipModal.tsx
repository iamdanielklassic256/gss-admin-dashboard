import Modal from '@/components/commons/Modal';
import React from 'react';
import type { SchoolLeadershipFormData } from './SchoolLeadershipForm';
import SchoolLeadershipForm from './SchoolLeadershipForm';

export interface SchoolLeadershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SchoolLeadershipFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  initialData?: SchoolLeadershipFormData;
  isEditing?: boolean;
}

const SchoolLeadershipModal: React.FC<SchoolLeadershipModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { name: '', title: '', subtitle: '', image: '' },
  isEditing = false
}) => {
  const title = isEditing ? 'Edit School Leader' : 'Add New School Leader';

  const handleFormSubmit = (data: SchoolLeadershipFormData) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
    >
      <SchoolLeadershipForm
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

export default SchoolLeadershipModal;
