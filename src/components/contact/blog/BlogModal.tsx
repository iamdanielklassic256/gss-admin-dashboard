import type { BlogFormData } from './BlogForm';
import BlogForm from './BlogForm';
import Modal from '@/components/commons/Modal';
import React from 'react';

export interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  initialData?: BlogFormData;
  isEditing?: boolean;
}

const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
  initialData = { title: '', slug: '', publishedAt: new Date().toISOString(), image: '', tags: [], body: '' },
  isEditing = false,
}) => {
  const title = isEditing ? 'Edit Blog' : 'Add New Blog';

  const handleFormSubmit = (data: BlogFormData) => {
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <BlogForm
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

export default BlogModal;
