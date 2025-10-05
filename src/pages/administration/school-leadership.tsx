import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import {
	useSchoolLeadershipStore,
	useSchoolLeaderships,
	useSchoolLeadershipLoading,
	useSchoolLeadershipError,
} from '@/stores/schoolLeadershipStore'
import type {
	CreateSchoolLeadershipData,
	SchoolLeadership,
	UpdateSchoolLeadershipData,
} from '@/services/administration/leadershipService'
import type { Column } from '@/components/commons/Table'
import ActionButtons from '@/components/commons/ActionButtons'
import Table from '@/components/commons/Table'
import SchoolLeadershipModal from '@/components/administration/leadership/SchoolLeadershipModal'

const SchoolLeadershipPage = () => {
	// Store hooks
	const schoolLeaderships = useSchoolLeaderships()
	const isLoading = useSchoolLeadershipLoading()
	const error = useSchoolLeadershipError()
	const {
		fetchSchoolLeaderships,
		createSchoolLeadership,
		updateSchoolLeadership,
		deleteSchoolLeadership,
		clearError,
	} = useSchoolLeadershipStore()

	const [editingLeadership, setEditingLeadership] = useState<any>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
		key: 'createdAt',
		direction: 'desc',
	})

	// Load school leadership on mount
	useEffect(() => {
		fetchSchoolLeaderships({
			limit: 12,
			offset: 0,
			sortField: sortConfig.key,
			sortOrder: sortConfig.direction,
		})
	}, [fetchSchoolLeaderships, sortConfig])

	// Clear error when modal closes
	useEffect(() => {
		if (!isModalOpen) clearError()
	}, [isModalOpen, clearError])

	const handleSubmit = async (formData: SchoolLeadership) => {
		try {
			if (editingLeadership) {
				// update
				const updateData: UpdateSchoolLeadershipData = {
					name: formData.name,
					title: formData.title,
					subtitle: formData.subtitle,
					image: formData.image,
				}
				await updateSchoolLeadership(editingLeadership.id, updateData)
			} else {
				// create
				const createData: CreateSchoolLeadershipData = {
					name: formData.name,
					title: formData.title,
					subtitle: formData.subtitle,
					image: formData.image,
				}
				await createSchoolLeadership(createData)
			}
			resetForm()
		} catch (err) {
			console.error('Failed to save school leadership member:', err)
		}
	}

	const handleEdit = (leadership: any) => {
		setEditingLeadership(leadership)
		setIsModalOpen(true)
		clearError()
	}

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this school leadership member?')) {
			try {
				await deleteSchoolLeadership(id)
			} catch (err) {
				console.error('Failed to delete school leadership member:', err)
			}
		}
	}

	const handleSort = (key: string, direction: 'asc' | 'desc') => {
		setSortConfig({ key, direction })
	}

	const resetForm = () => {
		setEditingLeadership(null)
		setIsModalOpen(false)
		clearError()
	}

	const openAddModal = () => {
		resetForm()
		setIsModalOpen(true)
	}

	// Initial data for form
	const getInitialFormData = (): SchoolLeadership => {
		if (editingLeadership) {
			return {
				name: editingLeadership.name,
				title: editingLeadership.title,
				subtitle: editingLeadership.subtitle,
				image: editingLeadership.image,
			}
		}
		return { name: '', title: '', subtitle: '', image: '' }
	}

	// Table columns
	const columns: Column<any>[] = [
		{
			key: 'name',
			header: 'Name',
			sortable: true,
			render: (value) => <span className="font-medium text-gray-900">{value}</span>,
		},
		{
			key: 'title',
			header: 'Title',
			sortable: true,
			render: (value) => <span className="text-gray-500">{value}</span>,
		},
		{
			key: 'subtitle',
			header: 'Subtitle',
			sortable: true,
			render: (value) => <span className="text-gray-400 text-sm">{value}</span>,
		},
		{
			key: 'image',
			header: 'Image',
			render: (value, row) =>
				value && value !== 'string' ? (
					<img src={value} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
				) : (
					<span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
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
					id={row.id}
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
					<h1 className="text-2xl font-bold text-gray-800">School Leadership</h1>
					<button
						onClick={openAddModal}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Add Leadership Member'}
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
					data={schoolLeaderships}
					columns={columns}
					loading={isLoading}
					emptyMessage="No leadership members found. Add your first one!"
					onSort={handleSort}
					sortKey={sortConfig.key}
					sortDirection={sortConfig.direction}
					rowKey="id"
					striped
					hover
				/>

				{/* Reusable School Leadership Modal */}
				<SchoolLeadershipModal
					isOpen={isModalOpen}
					onClose={resetForm}
					onSubmit={handleSubmit}
					isLoading={isLoading}
					error={error}
					initialData={getInitialFormData()}
					isEditing={!!editingLeadership}
				/>
			</div>
		</DashboardLayout>
	)
}

export default SchoolLeadershipPage
