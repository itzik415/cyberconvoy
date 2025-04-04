import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Employee, DEPARTMENTS } from "../types";

interface EditEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
  onSave: (employee: Employee) => Promise<boolean>;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  employee,
  onClose,
  onSave,
}) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee>({
    ...employee,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEditingEmployee({ ...employee });
  }, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditingEmployee({
      ...editingEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await onSave(editingEmployee);

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
            Edit Employee
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
                  value={editingEmployee.name}
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
                  value={editingEmployee.department}
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
                  value={editingEmployee.email}
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
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
