import React, { useState, useEffect } from 'react';
import './Sparkle.css';

const Sparkle = () => {
  const [sparkles, setSparkles] = useState([]);

  const handleMouseMove = (e) => {
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: `${e.clientX}-${e.clientY}-${i}`,
      x: e.clientX,
      y: e.clientY,
      color: getRandomColor(),
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.some((n) => n.id === s.id)));
    }, 300);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            backgroundColor: s.color,
          }}
        />
      ))}
    </div>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Sparkle;

