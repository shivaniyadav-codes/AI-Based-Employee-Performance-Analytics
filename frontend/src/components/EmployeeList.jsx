import React, { useState, useEffect } from 'react';
import API from '../api';
import SearchFilter from './SearchFilter';
import { Briefcase, Clock, Award, TrendingUp } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployees = async (department = '') => {
    try {
      setLoading(true);
      const url = department ? `/employees/search?department=${department}` : '/employees';
      const res = await API.get(url);
      setEmployees(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getScoreClass = (score) => {
    if (score >= 75) return 'score-high';
    if (score >= 50) return 'score-mid';
    return 'score-low';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Outstanding';
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Employee Directory</h1>
        <p>View, search, and manage all registered employees and their performance metrics</p>
      </div>

      <SearchFilter onSearch={fetchEmployees} />

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <p className="text-center" style={{ color: 'var(--text-muted)', padding: '60px 0' }}>Loading employees...</p>
      ) : employees.length === 0 ? (
        <p className="text-center" style={{ color: 'var(--text-muted)', padding: '60px 0' }}>No employees found. Add your first employee to get started.</p>
      ) : (
        <>
          <p className="page-meta text-center">{employees.length} employee{employees.length !== 1 ? 's' : ''} found</p>
          <div className="grid">
            {employees.map((emp, index) => (
              <div key={emp._id} className="card" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="card-header">
                  <div>
                    <div className="card-name">{emp.name}</div>
                    <div className="card-email">{emp.email}</div>
                  </div>
                  <span className={`score-badge ${getScoreClass(emp.performanceScore)}`}>
                    <TrendingUp size={12} />
                    {emp.performanceScore}
                  </span>
                </div>

                <div className="card-meta">
                  <div className="card-meta-row">
                    <Briefcase size={14} style={{ color: 'var(--accent-light)' }} />
                    {emp.department}
                  </div>
                  <div className="card-meta-row">
                    <Clock size={14} style={{ color: 'var(--warning)' }} />
                    {emp.experience} {emp.experience === 1 ? 'year' : 'years'} experience
                  </div>
                  <div className="card-meta-row">
                    <Award size={14} style={{ color: 'var(--success)' }} />
                    {getScoreLabel(emp.performanceScore)}
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  {emp.skills.map((skill, i) => (
                    <span key={i} className="badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
