import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUserPlus } from "react-icons/fi";

import PageHeader from "./components/PageHeader";
import DepartmentFilter from "./components/DepartmentFilter";
import LoadingIndicator from "./components/LoadingIndicator";
import EmployeeTable from "./components/EmployeeTable";
import EditEmployeeModal from "./components/EditEmployeeModal";
import AddEmployeeModal from "./components/AddEmployeeModal";
import ExportCSVButton from "./components/ExportCSVButton";

import { Employee } from "./types";
import { useEmployees } from "./hooks/useEmployees";

function App() {
  const { employees, loading, addEmployee, updateEmployee, deleteEmployee } =
    useEmployees();

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState<boolean>(false);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee({ ...employee });
  };

  const handleCloseEditModal = () => {
    setEditingEmployee(null);
  };

  const handleOpenAddModal = () => {
    setIsAddingEmployee(true);
  };

  const handleCloseAddModal = () => {
    setIsAddingEmployee(false);
  };

  const filteredSortedEmployees = employees
    .filter((employee: Employee) => {
      return !selectedDepartment || employee.department === selectedDepartment;
    })
    .sort((a, b) => a.id - b.id);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <div className="flex items-center mb-6 bg-gray-100 p-3 rounded shadow-sm">
          <DepartmentFilter
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
          />

          <button
            onClick={handleOpenAddModal}
            className="bg-green-500 hover:bg-green-600 ml-auto mr-2 text-white py-2 text-sm px-4 rounded flex items-center cursor-pointer"
          >
            <FiUserPlus className="mr-2" />
            Add Employee
          </button>

          <ExportCSVButton employees={filteredSortedEmployees} />
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <EmployeeTable
            employees={filteredSortedEmployees}
            onEdit={handleEdit}
            onDelete={deleteEmployee}
          />
        )}

        {editingEmployee && (
          <EditEmployeeModal
            employee={editingEmployee}
            onClose={handleCloseEditModal}
            onSave={updateEmployee}
          />
        )}

        {isAddingEmployee && (
          <AddEmployeeModal onClose={handleCloseAddModal} onAdd={addEmployee} />
        )}
      </div>
    </div>
  );
}

export default App;
