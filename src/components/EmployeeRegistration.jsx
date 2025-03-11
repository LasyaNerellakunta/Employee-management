// src/components/EmployeeRegistration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeRegistration = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  const validate = () => {
    const newErrors = {};
    if (!employee.name) newErrors.name = "Name is required";
    if (!employee.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(employee.email)) newErrors.email = "Email is invalid";
    if (!employee.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d+$/.test(employee.phone)) newErrors.phone = "Phone must be numeric";
    if (!employee.designation) newErrors.designation = "Designation is required";
    if (!employee.department) newErrors.department = "Department is required";
    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Save employee details in localStorage (for demo purposes)
      let employees = JSON.parse(localStorage.getItem('employees')) || [];
      employees.push(employee);
      localStorage.setItem('employees', JSON.stringify(employees));
      navigate('/employees');
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Employee Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input 
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Employee name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input 
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Employee email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input 
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Employee phone"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Designation</label>
          <input 
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Designation"
          />
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Department</label>
          <input 
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Department"
          />
          {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Register Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeRegistration;
