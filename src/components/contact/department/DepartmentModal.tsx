// components/department/DepartmentModal.tsx
import type { DepartmentFormData } from '@/components/commons/DepartmentForm';
import DepartmentForm from '@/components/commons/DepartmentForm';
import Modal from '@/components/commons/Modal';
import React from 'react';

export interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  initialData?: DepartmentFormData;
  isEditing?: boolean;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { name: '', email: '' },
  isEditing = false
}) => {
  const title = isEditing ? 'Edit Department' : 'Add New Department';

  const handleFormSubmit = (data: DepartmentFormData) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
    >
      <DepartmentForm
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

export default DepartmentModal;