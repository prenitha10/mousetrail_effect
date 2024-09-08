import React, { useState, useEffect, useCallback } from 'react';
import './NumberTrail.css'; 

const NumberTrail = () => {
  const [trail, setTrail] = useState([]);
  const trailLength = 10; 
  const [numberCounter, setNumberCounter] = useState(1); 
  const handleMouseMove = useCallback((e) => {
    setTrail((prevTrail) => {
      const newNumber = numberCounter; 
      setNumberCounter((prevCounter) => (prevCounter % 10) + 1); 
      const newTrail = [
        { x: e.clientX, y: e.clientY, number: newNumber },
        ...prevTrail,
      ];
      if (newTrail.length > trailLength) {
        newTrail.pop(); 
      }
      return newTrail;
    });
  }, [numberCounter, trailLength]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="number-trail">
      {trail.map((item, index) => (
        <div
          key={index}
          className="trail-number"
          style={{
            left: item.x - 10, 
            top: item.y - 10,  
            opacity: 1 - index / trailLength, 
            transform: `translate(-50%, -50%) translate(${index * 10}px, ${index * 15}px)`, 
          }}
        >
          {item.number}
        </div>
      ))}
    </div>
  );
};
export default NumberTrail;
