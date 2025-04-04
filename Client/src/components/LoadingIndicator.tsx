import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-white rounded shadow">
      <div className="flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" />
        <p className="text-gray-600">Loading employees...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
