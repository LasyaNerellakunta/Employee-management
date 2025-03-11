// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register-employee" element={<EmployeeRegistration />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
