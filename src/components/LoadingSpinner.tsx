import React from "react";

interface LoadingSpinnerProps {
  className?: string; // Optional custom class for size or color adjustments
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center h-screen ${className}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8B0000]"></div>
    </div>
  );
};

export default LoadingSpinner;