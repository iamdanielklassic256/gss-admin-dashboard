import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import {
	useCoCurriculumStore,
	useCoCurriculums,
	useCoCurriculumsLoading,
	useCoCurriculumsError,
} from '@/stores/coCurriculumStore'
import type {
	CreateCoCurriculumData,
	CoCurriculum,
	UpdateCoCurriculumData,
} from '@/services/academic/co-curriculum-service'
import type { Column } from '@/components/commons/Table'
import ActionButtons from '@/components/commons/ActionButtons'
import Table from '@/components/commons/Table'
import CoCurricularModal from '@/components/academics/cocurriculum/CoCurricularModal'

const CoCurriculumPage = () => {
	// Store hooks
	const coCurriculums = useCoCurriculums()
	const isLoading = useCoCurriculumsLoading()
	const error = useCoCurriculumsError()
	const {
		fetchCoCurriculums,
		createCoCurriculum,
		updateCoCurriculum,
		deleteCoCurriculum,
		clearError,
	} = useCoCurriculumStore()

	const [editingItem, setEditingItem] = useState<CoCurriculum | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
		key: 'createdAt',
		direction: 'desc',
	})

	// Load co-curriculum on mount
	useEffect(() => {
		fetchCoCurriculums({
			limit: 12,
			offset: 0,
			sortField: sortConfig.key,
			sortOrder: sortConfig.direction,
		})
	}, [fetchCoCurriculums, sortConfig])

	// Clear error when modal closes
	useEffect(() => {
		if (!isModalOpen) clearError()
	}, [isModalOpen, clearError])

	const handleSubmit = async (formData: CoCurriculum) => {
		try {
			if (editingItem) {
				// update
				const updateData: UpdateCoCurriculumData = {
					name: formData.name,
					image: formData.image,
					description: formData.description,
				}
				await updateCoCurriculum(editingItem.id!, updateData)
			} else {
				// create
				const createData: CreateCoCurriculumData = {
					name: formData.name,
					image: formData.image,
					description: formData.description,
				}
				await createCoCurriculum(createData)
			}
			resetForm()
		} catch (err) {
			console.error('Failed to save co-curriculum activity:', err)
		}
	}

	const handleEdit = (item: CoCurriculum) => {
		setEditingItem(item)
		setIsModalOpen(true)
		clearError()
	}

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this co-curriculum activity?')) {
			try {
				await deleteCoCurriculum(id)
			} catch (err) {
				console.error('Failed to delete co-curriculum activity:', err)
			}
		}
	}

	const handleSort = (key: string, direction: 'asc' | 'desc') => {
		setSortConfig({ key, direction })
	}

	const resetForm = () => {
		setEditingItem(null)
		setIsModalOpen(false)
		clearError()
	}

	const openAddModal = () => {
		resetForm()
		setIsModalOpen(true)
	}

	// Initial data for form
	const getInitialFormData = (): CoCurriculum => {
		if (editingItem) {
			return {
				name: editingItem.name,
				image: editingItem.image,
				description: editingItem.description,
				id: editingItem.id,
				createdAt: editingItem.createdAt,
				updatedAt: editingItem.updatedAt,
			}
		}
		return {
			name: '',
			image: '',
			description: '',
			id: '',
			createdAt: '',
			updatedAt: '',
		}
	}

	// Table columns
	const columns: Column<CoCurriculum>[] = [
		{
			key: 'name',
			header: 'Name',
			sortable: true,
			render: (value) => <span className="font-medium text-gray-900">{value}</span>,
		},
		{
			key: 'description',
			header: 'Description',
			sortable: true,
			render: (value) => <span className="text-gray-600 text-sm">{value}</span>,
		},
		{
			key: 'image',
			header: 'Image',
			render: (value, row) =>
				value && value !== 'string' ? (
					<img
						src={value}
						alt={row.name}
						className="w-12 h-12 rounded-lg object-cover shadow-sm"
					/>
				) : (
					<span className="inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gray-200 font-bold text-gray-600">
						{row.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
					</span>
				),
		},
		{
			key: 'createdAt',
			header: 'Created At',
			sortable: true,
			render: (value) => (
				<span className="text-gray-500">{new Date(value).toLocaleDateString()}</span>
			),
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
							disabled: isLoading,
						},
						{
							label: 'Delete',
							onClick: handleDelete,
							variant: 'danger',
							disabled: isLoading,
						},
					]}
				/>
			),
		},
	]

	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-800">Co-Curriculum Activities</h1>
					<button
						onClick={openAddModal}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Add Activity'}
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
					data={coCurriculums}
					columns={columns}
					loading={isLoading}
					emptyMessage="No co-curriculum activities found. Add your first one!"
					onSort={handleSort}
					sortKey={sortConfig.key}
					sortDirection={sortConfig.direction}
					rowKey="id"
					striped
					hover
				/>

				{/* Reusable Modal */}
				<CoCurricularModal
					isOpen={isModalOpen}
					onClose={resetForm}
					onSubmit={handleSubmit}
					isLoading={isLoading}
					error={error}
					initialData={getInitialFormData()}
					isEditing={!!editingItem}
				/>
			</div>
		</DashboardLayout>
	)
}

export default CoCurriculumPage
