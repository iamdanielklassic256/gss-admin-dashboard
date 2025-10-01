import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { useEffect, useState } from 'react'
import {
	useMessages,
	useMessagesLoading,
	useMessagesError,
	useMessageStore,
} from '@/stores/messageStore'
import ActionButtons from '@/components/commons/ActionButtons'
import Table from '@/components/commons/Table'

interface Message {
	id: string
	name: string
	email: string
	telephone: string
	message: string
	createdAt: string
}

const MessagePage = () => {
	// Store hooks
	const messages = useMessages()

	console.log('Mesafgesss::::', messages)
	const isLoading = useMessagesLoading()
	const error = useMessagesError()
	const { fetchMessages, deleteMessage } = useMessageStore()

	const [sortConfig, setSortConfig] = useState<{
		key: string
		direction: 'asc' | 'desc'
	}>({
		key: 'createdAt',
		direction: 'desc',
	})

	// Load messages on mount
	useEffect(() => {
		fetchMessages({
			limit: 12,
			offset: 0,
			sortField: sortConfig.key,
			sortOrder: sortConfig.direction,
		})
	}, [fetchMessages, sortConfig])

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this message?')) {
			try {
				await deleteMessage(id)
			} catch (error) {
				console.error('Failed to delete message:', error)
			}
		}
	}

	const handleSort = (key: string, direction: 'asc' | 'desc') => {
		setSortConfig({ key, direction })
	}

	// Define table columns
	const columns = [
		{
			key: 'name',
			header: 'Name',
			sortable: true,
			render: (value: string) => (
				<span className="font-medium text-gray-900">{value}</span>
			),
		},
		{
			key: 'email',
			header: 'Email',
			sortable: true,
			render: (value: string) => (
				<span className="text-gray-500">{value}</span>
			),
		},
		{
			key: 'telephone',
			header: 'Telephone',
			sortable: true,
			render: (value: string) => (
				<span className="text-gray-500">{value}</span>
			),
		},
		{
			key: 'message',
			header: 'Message',
			sortable: false,
			render: (value: string) => (
				<div className="text-gray-700 whitespace-normal break-words">
					{value}
				</div>
			),
		},
		{
			key: 'createdAt',
			header: 'Created At',
			sortable: true,
			render: (value: string) => (
				<span className="text-gray-500">
					{new Date(value).toLocaleDateString()}
				</span>
			),
		},
		{
			key: 'actions',
			header: 'Actions',
			width: '150px',
			render: (_: any, row: Message) => (
				<ActionButtons
					id={row.id}
					actions={[
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
					<h1 className="text-2xl font-bold text-gray-800">Messages</h1>
				</div>

				{/* Error Alert */}
				{error && (
					<div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
						{error}
					</div>
				)}

				{/* Reusable Table */}
				<Table
					data={messages}
					columns={columns}
					loading={isLoading}
					emptyMessage="No messages found."
					onSort={handleSort}
					sortKey={sortConfig.key}
					sortDirection={sortConfig.direction}
					rowKey="id"
					striped
					hover
				/>
			</div>
		</DashboardLayout>
	)
}

export default MessagePage
