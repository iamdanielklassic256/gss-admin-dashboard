import React from 'react';

export interface SchoolLeadershipFormData {
  name: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface SchoolLeadershipFormProps {
  initialData?: SchoolLeadershipFormData;
  onSubmit: (data: SchoolLeadershipFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
  isEditing?: boolean;
}

const SchoolLeadershipForm: React.FC<SchoolLeadershipFormProps> = ({
  initialData = { name: '', title: '', subtitle: '', image: '' },
  onSubmit,
  onCancel,
  isLoading = false,
  error = null,
  isEditing = false
}) => {
  const [formData, setFormData] = React.useState<SchoolLeadershipFormData>(initialData);
  const [localError, setLocalError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (localError) setLocalError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.title.trim() || !formData.subtitle.trim() || !formData.image.trim()) {
      setLocalError('Please fill in all fields');
      return;
    }

    onSubmit(formData);
  };

  const displayError = error || localError;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {displayError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
          {displayError}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter leader's name"
          required
          disabled={isLoading}
        />
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title/Position *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Head Teacher"
          required
          disabled={isLoading}
        />
      </div>

      {/* Subtitle */}
      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
          Subtitle/Department *
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Science Department"
          required
          disabled={isLoading}
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL *
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/photo.jpg"
          required
          disabled={isLoading}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md disabled:opacity-50 transition-colors flex items-center"
          disabled={isLoading}
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? 'Saving...' : isEditing ? 'Update Leader' : 'Add Leader'}
        </button>
      </div>
    </form>
  );
};

export default SchoolLeadershipForm;
