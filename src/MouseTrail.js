// src/MouseTrail.js
import React, { useState, useEffect, useRef } from 'react';
import './MouseTrail.css'; // For styling

const MouseTrail = () => {
  const [trail, setTrail] = useState([]);
  const trailLength = 10; // Number of trail dots
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = [{ x: e.clientX, y: e.clientY }, ...trail];
      if (newTrail.length > trailLength) {
        newTrail.pop();
      }
      setTrail(newTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [trail]);

  return (
    <div className="mouse-trail">
      {trail.map((dot, index) => (
        <div
          key={index}
          className="trail-dot"
          style={{
            left: dot.x - 5, // Center dot on mouse position
            top: dot.y - 5,  // Center dot on mouse position
            opacity: 1 - index / trailLength, // Fade out effect
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;
