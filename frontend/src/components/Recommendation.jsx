import React, { useState } from 'react';
import API from '../api';
import { Sparkles, Loader, FileText } from 'lucide-react';

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateInsights = async () => {
    try {
      setLoading(true);
      setError('');
      setRecommendation('');
      const res = await API.post('/ai/recommend', {});
      setRecommendation(res.data.recommendation);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate AI insights.');
    } finally {
      setLoading(false);
    }
  };

  const formatMarkdown = (text) => {
    let html = text
      .replace(/### (.*?)(\n|$)/g, '<h3 style="color:#f0f0f5;margin-top:20px;margin-bottom:8px;font-size:1rem;font-weight:700;">$1</h3>')
      .replace(/## (.*?)(\n|$)/g, '<h2 style="color:#f0f0f5;margin-top:24px;margin-bottom:10px;font-size:1.15rem;font-weight:700;">$1</h2>')
      .replace(/# (.*?)(\n|$)/g, '<h1 style="color:#f0f0f5;margin-top:28px;margin-bottom:12px;font-size:1.3rem;font-weight:800;">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*?)$/gm, '<li style="margin-left:16px;margin-bottom:4px;">$1</li>')
      .replace(/^\d+\. (.*?)$/gm, '<li style="margin-left:16px;margin-bottom:4px;">$1</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');

    return <div className="ai-text" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="fade-in">
      <div className="ai-hero">
        <h1>
          <span className="gradient-text">AI-Powered</span> Analytics
        </h1>
        <p>
          Generate comprehensive promotion recommendations, employee rankings, training suggestions, and personalized feedback using AI analysis.
        </p>
      </div>

      <div className="ai-generate-btn">
        <button
          className="btn"
          onClick={generateInsights}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader size={20} className="spin" />
              Analyzing employee data...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate AI Report
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ maxWidth: '860px', margin: '0 auto 20px' }}>
          {error}
        </div>
      )}

      {recommendation && (
        <div className="ai-result fade-in">
          <div className="ai-result-header">
            <FileText size={22} />
            <h2>Performance Insight Report</h2>
          </div>
          {formatMarkdown(recommendation)}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
