import { circularService } from "@/services/academic/circularService";
import type { Circular } from "@/types/circular";


interface CircularCardProps {
  circular: Circular;
  onDelete: (id: string) => void;
}

export const CircularCard = ({ circular, onDelete }: CircularCardProps) => {
  const priorityStyles = circularService.getPriorityStyles(circular.priority);
  const isExpired = new Date(circular.expiryDate) < new Date();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${
      isExpired ? 'border-gray-400 opacity-75' : 'border-blue-500'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{circular.icon}</span>
            <div>
              <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                {circular.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles.bg} ${priorityStyles.color}`}>
                  {priorityStyles.label}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {circular.category}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(circular.circularId)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            🗑️
          </button>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {circular.excerpt}
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-4 line-clamp-3">
          {circular.content}
        </p>

        {/* Target Audience */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="font-medium">Audience:</span>
          <span className="ml-2">{circular.targetAudience}</span>
        </div>

        {/* Attachments */}
        {circular.attachments.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {circular.attachments.map((attachment, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs"
                >
                  📎 {attachment}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Posted: {formatDate(circular.date)}</span>
          <span className={isExpired ? 'text-red-500 font-medium' : ''}>
            {isExpired ? 'Expired' : `Expires: ${formatDate(circular.expiryDate)}`}
          </span>
        </div>
      </div>
    </div>
  );
};