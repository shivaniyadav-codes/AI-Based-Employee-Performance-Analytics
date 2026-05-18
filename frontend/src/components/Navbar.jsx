import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Users, UserPlus, Sparkles, Brain } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Brain size={22} />
        PerformanceAI
      </Link>

      <div className="nav-links">
        {token ? (
          <>
            <Link to="/employees" className={isActive('/employees')}>
              <Users size={16} />
              <span>Employees</span>
            </Link>
            <Link to="/add-employee" className={isActive('/add-employee')}>
              <UserPlus size={16} />
              <span>Add New</span>
            </Link>
            <Link to="/ai-recommendations" className={isActive('/ai-recommendations')}>
              <Sparkles size={16} />
              <span>AI Insights</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              <LogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login')}>Login</Link>
            <Link to="/signup" className="btn btn-sm" style={{ width: 'auto' }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
