import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import {
	useStudentLeadershipStore,
	useStudentLeaders,
	useStudentLeadersLoading,
	useStudentLeadersError,
} from '@/stores/stundentLeadStore'
import type {
	CreateStudentLeaderData,
	StudentLeader,
	UpdateStudentLeaderData,
} from '@/services/administration/studentleadService'
import type { Column } from '@/components/commons/Table'
import ActionButtons from '@/components/commons/ActionButtons'
import Table from '@/components/commons/Table'
import StudentLeaderModal from '@/components/administration/students/StudentLeaderModal'

const StudentLeadershipPage = () => {
	// Store hooks
	const studentLeaders = useStudentLeaders()
	const isLoading = useStudentLeadersLoading()
	const error = useStudentLeadersError()
	const {
		fetchStudentLeaders,
		createStudentLeader,
		updateStudentLeader,
		deleteStudentLeader,
		clearError,
	} = useStudentLeadershipStore()

	const [editingLeader, setEditingLeader] = useState<StudentLeader | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
		key: 'createdAt',
		direction: 'desc',
	})

	// Load student leadership data on mount
	useEffect(() => {
		fetchStudentLeaders({
			limit: 12,
			offset: 0,
			sortField: sortConfig.key,
			sortOrder: sortConfig.direction,
		})
	}, [fetchStudentLeaders, sortConfig])

	// Clear error when modal closes
	useEffect(() => {
		if (!isModalOpen) clearError()
	}, [isModalOpen, clearError])

	const handleSubmit = async (formData: StudentLeader) => {
		try {
			if (editingLeader) {
				const updateData: UpdateStudentLeaderData = {
					name: formData.name,
					title: formData.title,
					image: formData.image,
				}
				await updateStudentLeader(editingLeader.id!, updateData)
			} else {
				const createData: CreateStudentLeaderData = {
					name: formData.name,
					title: formData.title,
					image: formData.image,
				}
				await createStudentLeader(createData)
			}
			resetForm()
		} catch (err) {
			console.error('Failed to save student leader:', err)
		}
	}

	const handleEdit = (leader: StudentLeader) => {
		setEditingLeader(leader)
		setIsModalOpen(true)
		clearError()
	}

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this student leader?')) {
			try {
				await deleteStudentLeader(id)
			} catch (err) {
				console.error('Failed to delete student leader:', err)
			}
		}
	}

	const handleSort = (key: string, direction: 'asc' | 'desc') => {
		setSortConfig({ key, direction })
	}

	const resetForm = () => {
		setEditingLeader(null)
		setIsModalOpen(false)
		clearError()
	}

	const openAddModal = () => {
		resetForm()
		setIsModalOpen(true)
	}

	// Initial form data
	const getInitialFormData = (): StudentLeader => {
		if (editingLeader) {
			return {
				id: editingLeader.id,
				name: editingLeader.name,
				title: editingLeader.title,
				image: editingLeader.image,
				createdAt: editingLeader.createdAt,
				updatedAt: editingLeader.updatedAt,
			}
		}
		return {
			id: '',
			name: '',
			title: '',
			image: '',
			createdAt: '',
			updatedAt: '',
		}
	}

	// Table columns
	const columns: Column<StudentLeader>[] = [
		{
			key: 'name',
			header: 'Name',
			sortable: true,
			render: (value) => <span className="font-medium text-gray-900">{value}</span>,
		},
		{
			key: 'title',
			header: 'Position',
			sortable: true,
			render: (value) => <span className="text-gray-500">{value}</span>,
		},
		{
			key: 'image',
			header: 'Image',
			render: (value, row) =>
				value && value !== 'string' ? (
					<img src={value} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
				) : (
					<span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
						{row.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
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
					<h1 className="text-2xl font-bold text-gray-800">Student Leadership</h1>
					<button
						onClick={openAddModal}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Add Student Leader'}
					</button>
				</div>

				{/* Error Alert */}
				{error && (
					<div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
						{error}
					</div>
				)}

				{/* Table */}
				<Table
					data={studentLeaders}
					columns={columns}
					loading={isLoading}
					emptyMessage="No student leaders found. Add your first one!"
					onSort={handleSort}
					sortKey={sortConfig.key}
					sortDirection={sortConfig.direction}
					rowKey="id"
					striped
					hover
				/>

				{/* Modal */}
				<StudentLeaderModal
					isOpen={isModalOpen}
					onClose={resetForm}
					onSubmit={handleSubmit}
					isLoading={isLoading}
					error={error}
					initialData={getInitialFormData()}
					isEditing={!!editingLeader}
				/>
			</div>
		</DashboardLayout>
	)
}

export default StudentLeadershipPage
