import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DEPARTMENTS } from "../types";

interface AddEmployeeModalProps {
  onClose: () => void;
  onAdd: (employee: {
    name: string;
    department: string;
    email: string;
  }) => Promise<boolean>;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: DEPARTMENTS[0],
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await onAdd(newEmployee);

    if (success) {
      onClose();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center ml-2">
            Add New Employee
          </h2>
          <button
            className="text-white hover:text-gray-200 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleChange}
                  className="w-full py-2 px-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="department"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={newEmployee.department}
                  onChange={handleChange}
                  className="w-full py-2 px-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleChange}
                  className="w-full py-2 px-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded cursor-pointer"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  "Add Employee"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
