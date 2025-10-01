import Modal from '@/components/commons/Modal';
import type { SocialMedia } from '@/services/contact/socialmediaService';
import React from 'react';
import SocialMediaForm from './SocialMediaForm';

export interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SocialMedia) => void;
  isLoading?: boolean;
  error?: string | null;
  initialData?: SocialMedia;
  isEditing?: boolean;
}

const SocialMediaModal: React.FC<SocialMediaModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { name: '', url: '' },
  isEditing = false
}) => {
  const title = isEditing ? 'Edit Social Media' : 'Add New Socail Media';

  const handleFormSubmit = (data: SocialMedia) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
    >
      <SocialMediaForm
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

export default SocialMediaModal;