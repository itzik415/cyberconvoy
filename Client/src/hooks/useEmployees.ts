import { useState, useEffect } from "react";
import { Employee } from "../types";
import { toast } from "react-toastify";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/employees");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setEmployees(data || []);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch employees";
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (employee: Omit<Employee, "id">) => {
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!res.ok) throw new Error("Failed to add employee");

      const data = await res.json();
      setEmployees([...employees, data.employee]);
      toast.success("Employee added successfully");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add employee";
      toast.error(errorMessage);
      return false;
    }
  };

  const updateEmployee = async (employee: Employee) => {
    try {
      const res = await fetch(`/api/employees/${employee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!res.ok) throw new Error("Failed to update employee");

      setEmployees(
        employees.map((emp) => (emp.id === employee.id ? employee : emp))
      );
      toast.success("Employee updated successfully");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update employee";
      toast.error(errorMessage);
      return false;
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete employee");

      setEmployees(employees.filter((emp) => emp.id !== id));
      toast.error("Employee deleted");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete employee";
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployees,
  };
};
