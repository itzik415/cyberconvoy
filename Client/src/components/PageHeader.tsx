import React from "react";
import { IoBarChartSharp } from "react-icons/io5";

const PageHeader: React.FC = () => {
  return (
    <div className="flex items-center border-b pb-2 border-teal-500 px-4 mb-6">
      <span className="inline-block mr-2">
        <IoBarChartSharp />
      </span>
      <h1 className="text-2xl font-semibold text-gray-800 flex-1">
        Employees Dashboard
      </h1>
    </div>
  );
};

export default PageHeader;
