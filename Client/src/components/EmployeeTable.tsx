import React from "react";
import { MdOutlineModeEditOutline, MdNotInterested } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { Employee } from "../types";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            <tr>
              {["ID", "Name", "Department", "Email", "Actions"].map(
                (col: string, i: number) => (
                  <th key={i} className="py-3 px-4 text-left font-medium">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-100 transition-colors duration-150 ease-in-out border-b border-gray-200"
                >
                  {Object.values(employee).map(
                    (employeeValue: string | number, i: number) => {
                      return (
                        <td key={i} className="py-3 px-4 font-thin">
                          {employeeValue}
                        </td>
                      );
                    }
                  )}
                  <td className="py-3 px-4 font-thin">
                    <button
                      onClick={() => onEdit(employee)}
                      className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-2 rounded mr-2 text-xs items-center inline-flex cursor-pointer"
                    >
                      <MdOutlineModeEditOutline className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(employee.id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-2 rounded text-xs items-center inline-flex cursor-pointer"
                    >
                      <CiTrash className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  <div className="flex items-center justify-center">
                    <MdNotInterested className="mr-2" />
                    No employees found.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
