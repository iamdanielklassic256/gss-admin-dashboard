import Modal from '@/components/commons/Modal';
import React from 'react';
import type { StudentLeaderFormData } from './StudentLeaderForm';
import StudentLeaderForm from './StudentLeaderForm';

export interface StudentLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentLeaderFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  initialData?: StudentLeaderFormData;
  isEditing?: boolean;
}

const StudentLeaderModal: React.FC<StudentLeaderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { name: '', title: '', image: '' },
  isEditing = false,
}) => {
  const title = isEditing ? 'Edit Student Leader' : 'Add New Student Leader';

  const handleFormSubmit = (data: StudentLeaderFormData) => {
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <StudentLeaderForm
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

export default StudentLeaderModal;
