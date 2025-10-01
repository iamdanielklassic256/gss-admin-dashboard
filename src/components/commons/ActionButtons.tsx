// components/common/ActionButtons.tsx
import React from 'react';

export interface ActionButton {
  label: string;
  onClick: (id: string) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ActionButtonsProps {
  id: string;
  actions: ActionButton[];
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  actions,
  className = ''
}) => {
  const getVariantClasses = (variant: ActionButton['variant'] = 'secondary') => {
    const baseClasses = 'text-sm font-medium transition-colors duration-150 disabled:opacity-50';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} text-blue-600 hover:text-blue-900`;
      case 'danger':
        return `${baseClasses} text-red-600 hover:text-red-900`;
      case 'warning':
        return `${baseClasses} text-orange-600 hover:text-orange-900`;
      default:
        return `${baseClasses} text-gray-600 hover:text-gray-900`;
    }
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => action.onClick(id)}
          className={getVariantClasses(action.variant)}
          disabled={action.disabled}
        >
          {action.icon && <span className="mr-1">{action.icon}</span>}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;