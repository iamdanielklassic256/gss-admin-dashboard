import ActionButtons from '@/components/commons/ActionButtons';
import type { Column } from '@/components/commons/Table';
import Table from '@/components/commons/Table';
import SocialMediaModal from '@/components/contact/social-media/SocialMediaModal';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import type { CreateSocialMediaData, SocialMedia, UpdateSocialMediaData } from '@/services/contact/socialmediaService';
import { useSocialMediaError, useSocialMediaList, useSocialMediaLoading, useSocialMediaStore } from '@/stores/socialmediastore';
import { useState, useEffect } from 'react'

const SocialMediaPage = () => {
	// Use the store hooks
	const social_medias = useSocialMediaList();
	const isLoading = useSocialMediaLoading();
	const error = useSocialMediaError();
	const {
		fetchSocialMedia,
		createSocialMedia,
		updateSocialMedia,
		deleteSocialMedia,
		clearError
	} = useSocialMediaStore();

	const [editingSocialMedia, setEditingSocialMedia] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
		key: 'createdAt',
		direction: 'desc'
	});

	// Load departments from API on component mount
	useEffect(() => {
		fetchSocialMedia({
			limit: 12,
			offset: 0,
			sortField: sortConfig.key,
			sortOrder: sortConfig.direction
		});
	}, [fetchSocialMedia, sortConfig]);

	// Clear errors when modal closes
	useEffect(() => {
		if (!isModalOpen) {
			clearError();
		}
	}, [isModalOpen, clearError]);

	const handleSubmit = async (formData: SocialMedia) => {
		try {
			if (editingSocialMedia) {
				// Update existing department
				const updateData: UpdateSocialMediaData = {
					name: formData.name,
					url: formData.url
				};
				await updateSocialMedia(editingSocialMedia.id, updateData);
			} else {
				// Add new department
				const createData: CreateSocialMediaData = {
					name: formData.name,
					url: formData.url
				};
				await createSocialMedia(createData);
			}

			// Close modal on success
			resetForm();
		} catch (error) {
			// Error is already handled in the store
			console.error('Failed to save department:', error);
		}
	};

	const handleEdit = (socialmedia: SocialMedia) => {
		setEditingSocialMedia(socialmedia);
		setIsModalOpen(true);
		clearError();
	};

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this social?')) {
			try {
				await deleteSocialMedia(id);
			} catch (error) {
				console.error('Failed to delete social media:', error);
			}
		}
	};

	const handleSort = (key: string, direction: 'asc' | 'desc') => {
		setSortConfig({ key, direction });
	};

	const resetForm = () => {
		setEditingSocialMedia(null);
		setIsModalOpen(false);
		clearError();
	};

	const openAddModal = () => {
		resetForm();
		setIsModalOpen(true);
	};

	// Prepare initial data for the form
	const getInitialFormData = (): SocialMedia => {
		if (editingSocialMedia) {
			return {
				name: editingSocialMedia.name,
				url: editingSocialMedia.url
			};
		}
		return { name: '', url: '' };
	};

	// Define table columns
	const columns: Column<SocialMedia>[] = [
		{
			key: 'name',
			header: 'Name',
			sortable: true,
			render: (value) => (
				<span className="font-medium text-gray-900">{value}</span>
			)
		},
		{
			key: 'url',
			header: 'Url',
			sortable: true,
			render: (value) => (
				<span className="text-gray-500">{value}</span>
			)
		},
		{
			key: 'createdAt',
			header: 'Created At',
			sortable: true,
			render: (value) => (
				<span className="text-gray-500">
					{new Date(value).toLocaleDateString()}
				</span>
			)
		},
		{
			key: 'actions',
			header: 'Actions',
			width: '200px',
			render: (_, row) => (
				<ActionButtons
					id={row.id!}
					actions={[
						{
							label: 'Edit',
							onClick: () => handleEdit(row),
							variant: 'primary',
							disabled: isLoading
						},
						{
							label: 'Delete',
							onClick: handleDelete,
							variant: 'danger',
							disabled: isLoading
						}
					]}
				/>
			)
		}
	];

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-800">Social Media Handles</h1>
					<button
						onClick={openAddModal}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Add New Handle'}
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
					data={social_medias}
					columns={columns}
					loading={isLoading}
					emptyMessage="No social media found. Add your first social media handle!"
					onSort={handleSort}
					sortKey={sortConfig.key}
					sortDirection={sortConfig.direction}
					rowKey="id"
					striped
					hover
				/>

				{/* Reusable Department Modal */}
				<SocialMediaModal
					isOpen={isModalOpen}
					onClose={resetForm}
					onSubmit={handleSubmit}
					isLoading={isLoading}
					error={error}
					initialData={getInitialFormData()}
					isEditing={!!editingSocialMedia}
				/>
			</div>
		</DashboardLayout>
	)
}

export default SocialMediaPage