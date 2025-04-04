import React from "react";
import { DEPARTMENTS } from "../types";

interface DepartmentFilterProps {
  selectedDepartment: string;
  onDepartmentChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  selectedDepartment,
  onDepartmentChange,
}) => {
  return (
    <div className="flex items-center">
      <h2 className="text-lg font-light mr-3 text-gray-700">
        Filter by Department
      </h2>
      <div className="w-48">
        <select
          value={selectedDepartment}
          onChange={onDepartmentChange}
          className="block cursor-pointer w-full bg-white border border-gray-300 hover:border-gray-400 p-2 rounded text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DepartmentFilter;
