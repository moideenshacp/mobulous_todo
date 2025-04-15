// Filter button component
interface FilterButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }
  
  export const FilterButton: React.FC<FilterButtonProps> = ({
    active,
    onClick,
    children,
  }) => {
    return (
      <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
          active
            ? "bg-blue-100 text-blue-700 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {children}
      </button>
    );
  };
  