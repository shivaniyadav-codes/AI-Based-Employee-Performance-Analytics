import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, UserPlus } from 'lucide-react';
import API from '../api';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };

      await API.post('/employees', dataToSubmit);
      setSuccess('Employee registered successfully!');
      setTimeout(() => navigate('/employees'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container fade-in" style={{ maxWidth: '580px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
        <UserPlus size={24} style={{ color: 'var(--accent)' }} />
        <h2>Register Employee</h2>
      </div>
      <p className="form-subtitle">Add a new employee to the performance tracking system</p>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" required className="form-input" placeholder="e.g. Aman Verma" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" name="email" required className="form-input" placeholder="e.g. aman@gmail.com" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Department</label>
          <input type="text" name="department" required className="form-input" placeholder="e.g. Development, Marketing, HR" value={formData.department} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Skills</label>
          <input type="text" name="skills" required className="form-input" placeholder="React, Node.js, MongoDB (comma-separated)" value={formData.skills} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Performance Score</label>
            <input type="number" name="performanceScore" min="0" max="100" required className="form-input" placeholder="0 – 100" value={formData.performanceScore} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Experience (Years)</label>
            <input type="number" name="experience" min="0" required className="form-input" placeholder="e.g. 3" value={formData.experience} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn mt-2" disabled={loading}>
          <Save size={18} />
          {loading ? 'Saving...' : 'Save Employee'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
