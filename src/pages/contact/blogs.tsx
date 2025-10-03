import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useState, useEffect } from 'react';
import {
	useBlogStore,
	useBlogs,
	useBlogsLoading,
	useBlogsError,
} from '@/stores/blogStore';
import type { Blog, CreateBlogData, UpdateBlogData } from '@/services/contact/blogService';
import BlogModal from '@/components/contact/blog/BlogModal';
import type { Column } from '@/components/commons/Table';
import ActionButtons from '@/components/commons/ActionButtons';
import Table from '@/components/commons/Table';
import type { BlogFormData } from '@/components/contact/blog/BlogForm';

const BlogPage = () => {
	const blogs = useBlogs();
	const isLoading = useBlogsLoading();
	const error = useBlogsError();

	const { fetchBlogs, createBlog, updateBlog, deleteBlog, clearError } = useBlogStore();

	const [editingBlog, setEditingBlog] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
		key: 'publishedAt',
		direction: 'desc',
	});

	useEffect(() => {
		fetchBlogs({
			limit: 12,
			offset: 0,
			sortField: sortConfig.key,
			sortOrder: sortConfig.direction,
		});
	}, [fetchBlogs, sortConfig]);

	useEffect(() => {
		if (!isModalOpen) clearError();
	}, [isModalOpen, clearError]);

	const handleSubmit = async (formData: BlogFormData) => {
		try {
			if (editingBlog) {
				const updateData: UpdateBlogData = {
					title: formData.title,
					slug: formData.slug,
					publishedAt: formData.publishedAt,
					image: formData.image,
					tags: formData.tags,
					body: formData.body,
				};
				await updateBlog(editingBlog.id, updateData);
			} else {
				const createData: CreateBlogData = {
					title: formData.title,
					slug: formData.slug,
					publishedAt: formData.publishedAt,
					image: formData.image,
					tags: formData.tags,
					body: formData.body,
				};
				await createBlog(createData);
			}
			resetForm();
		} catch (error) {
			console.error('Failed to save blog:', error);
		}
	};

	const handleEdit = (blog: any) => {
		setEditingBlog(blog);
		setIsModalOpen(true);
		clearError();
	};

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this blog?')) {
			try {
				await deleteBlog(id);
			} catch (error) {
				console.error('Failed to delete blog:', error);
			}
		}
	};

	const handleSort = (key: string, direction: 'asc' | 'desc') => {
		setSortConfig({ key, direction });
	};

	const resetForm = () => {
		setEditingBlog(null);
		setIsModalOpen(false);
		clearError();
	};

	const openAddModal = () => {
		resetForm();
		setIsModalOpen(true);
	};

	const getInitialFormData = (): BlogFormData => {
		if (editingBlog) {
			return {
				title: editingBlog.title,
				slug: editingBlog.slug,
				publishedAt: editingBlog.publishedAt,
				image: editingBlog.image,
				tags: editingBlog.tags,
				body: editingBlog.body,
			};
		}
		return { title: '', slug: '', publishedAt: new Date().toISOString(), image: '', tags: [], body: '' };
	};

	const columns: Column<Blog>[] = [
		{
			key: 'title',
			header: 'Title',
			render: (value) => value ?? '—', // fallback if title is missing
		},
		{
			key: 'slug',
			header: 'Slug',
			render: (value) => value ?? '—',
		},
		{
			key: 'publishedAt',
			header: 'Published At',
			render: (value) => value ? new Date(value).toLocaleDateString() : '—',
		},
		{
			key: 'actions',
			header: 'Actions',
			render: (_, row) => <ActionButtons id={row.id} actions={[/* ... */]} />,
		},
	];


	return (
		<DashboardLayout>
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
					<button
						onClick={openAddModal}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Add New Blog'}
					</button>
				</div>

				{error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

				<Table
					data={blogs}
					columns={columns}
					loading={isLoading}
					emptyMessage="No blogs found. Add your first blog!"
					onSort={handleSort}
					sortKey={sortConfig.key}
					sortDirection={sortConfig.direction}
					rowKey="id"
					striped
					hover
				/>

				<BlogModal
					isOpen={isModalOpen}
					onClose={resetForm}
					onSubmit={handleSubmit}
					isLoading={isLoading}
					error={error}
					initialData={getInitialFormData()}
					isEditing={!!editingBlog}
				/>
			</div>
		</DashboardLayout>
	);
};

export default BlogPage;
