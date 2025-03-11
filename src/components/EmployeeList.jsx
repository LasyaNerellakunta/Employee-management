// src/components/EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    department: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(employeesData);
  }, []);

  const handleEdit = (employee, index) => {
    setEditEmployee(index);
    setForm(employee);
  }

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    }
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map((emp, index) => 
      index === editEmployee ? form : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEditEmployee(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      designation: '',
      department: ''
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Employee List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Designation</th>
            <th className="py-2 px-4 border">Department</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{employee.name}</td>
              <td className="py-2 px-4 border">{employee.email}</td>
              <td className="py-2 px-4 border">{employee.phone}</td>
              <td className="py-2 px-4 border">{employee.designation}</td>
              <td className="py-2 px-4 border">{employee.department}</td>
              <td className="py-2 px-4 border">
                <button 
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(employee, index)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editEmployee !== null && (
        <div className="mt-6 p-4 border rounded shadow max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Edit Employee</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input 
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input 
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone</label>
              <input 
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Designation</label>
              <input 
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Department</label>
              <input 
                type="text"
                name="department"
                value={form.department}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Update Employee
            </button>
          </form>
        </div>
      )}
      <div className="mt-4 text-center">
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate('/register-employee')}
        >
          Register New Employee
        </button>
      </div>
    </div>
  );
}

export default EmployeeList;
