import React from "react";
import { FiDownload } from "react-icons/fi";
import { CSVLink } from "react-csv";
import { Employee } from "../types/index";

interface ExportCSVButtonProps {
  employees: Employee[];
  filename?: string;
}

const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({
  employees,
  filename = "employee_list.csv",
}) => {
  const headers =
    employees.length > 0
      ? Object.keys(employees[0]).map((key) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
          key: key,
        }))
      : [];

  return (
    <CSVLink
      data={employees}
      headers={headers}
      filename={filename}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center font-light text-sm"
      target="_blank"
    >
      <FiDownload className="mr-2" />
      Export to CSV
    </CSVLink>
  );
};

export default ExportCSVButton;
