import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Recommendation from './components/Recommendation';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-2">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/employees" element={
            <ProtectedRoute><EmployeeList /></ProtectedRoute>
          } />
          <Route path="/add-employee" element={
            <ProtectedRoute><EmployeeForm /></ProtectedRoute>
          } />
          <Route path="/ai-recommendations" element={
            <ProtectedRoute><Recommendation /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
