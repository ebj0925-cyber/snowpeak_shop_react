import React from 'react';
import { useNavigate } from 'react-router-dom';

function ComingSoon({ title }) {
  const navigate = useNavigate();

  return (
    <main className="coming-soon-page">
      <div className="coming-soon-inner">
        <p className="coming-soon-label">SNOW PEAK</p>
        <h2>{title}</h2>
        <p>준비 중인 페이지입니다.</p>
        <button type="button" onClick={() => navigate('/')}>
          메인으로 이동
        </button>
      </div>
    </main>
  );
}

export default ComingSoon;
