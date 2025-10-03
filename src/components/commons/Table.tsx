// components/common/Table.tsx
import React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  rowKey?: keyof T | ((row: T) => string);
  className?: string;
  striped?: boolean;
  hover?: boolean;
  compact?: boolean;
}

const Table = <T,>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data found',
  onSort,
  sortKey,
  sortDirection,
  rowKey = 'id' as keyof T,
  className = '',
  striped = true,
  hover = true,
  compact = false
}: TableProps<T>) => {
  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    }
    return String(row[rowKey as keyof T]) || `row-${index}`;
  };

  const handleSort = (key: string) => {
    if (!onSort || !columns.find(col => col.key === key)?.sortable) return;

    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, direction);
  };

  const renderCell = (column: Column<T>, row: T, index: number) => {
    // Make sure row exists
    if (!row) return '';

    // Safe access for the column key
    const value = row[column.key as keyof T];

    // Use the render function if provided
    if (column.render) return column.render(value ?? '', row, index);

    // Fallback for missing values
    return String(value ?? '');
  };


  if (loading && data?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-8 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Loading data...</p>
        </div>
      </div>
    );
  }

  if (!loading && data?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-8 text-gray-500">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                    ${compact ? 'px-4 py-2' : 'px-6 py-3'}
                  `}
                  onClick={() => handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className={`flex items-center ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {column.header}
                    {column.sortable && sortKey === column.key && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`bg-white divide-y divide-gray-200 ${striped ? 'even:bg-gray-50' : ''}`}>
            {data?.map((row, index) => (
              <tr
                key={getRowKey(row, index)}
                className={`
                  ${hover ? 'hover:bg-gray-50 transition-colors duration-150' : ''}
                  ${compact ? 'px-4 py-2' : ''}
                `}
              >
                {columns.map((column) => (
                  <td
                    key={`${getRowKey(row, index)}-${column.key}`}
                    className={`
                      whitespace-nowrap text-sm
                      ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                      ${compact ? 'px-4 py-2' : 'px-6 py-4'}
                    `}
                  >
                    {renderCell(column, row, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;