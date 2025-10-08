import Modal from '@/components/commons/Modal';
import React from 'react';
import type { CoCurricularFormData } from './CoCurricularForm';
import CoCurricularForm from './CoCurricularForm';

export interface CoCurricularModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CoCurricularFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  initialData?: CoCurricularFormData;
  isEditing?: boolean;
}

const CoCurricularModal: React.FC<CoCurricularModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { name: '', description: '', image: '' },
  isEditing = false
}) => {
  const title = isEditing ? 'Edit Co-Curricular Activity' : 'Add New Co-Curricular Activity';

  const handleFormSubmit = (data: CoCurricularFormData) => {
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <CoCurricularForm
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

export default CoCurricularModal;
