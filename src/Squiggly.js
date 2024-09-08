import React, { useEffect, useRef, useState } from 'react';
import './Squiggly.css'; // Assuming you have a CSS file for styling

const LINE_DURATION = 2;
const LINE_WIDTH_START = 5;

const Squiggly = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [mode, setMode] = useState(1);
  const [pathMode, setPathMode] = useState(1);
  const [spread, setSpread] = useState(2);
  const [lineWidthStart, setLineWidthStart] = useState(LINE_WIDTH_START);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const resizeCanvas = (w, h) => {
      canvas.width = w;
      canvas.height = h;
    };

    const animatePoints = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const duration = (LINE_DURATION * 1000) / 60;
      let newPoints = [...points];

      newPoints.forEach((point, i) => {
        if (i > 0) {
          const lastPoint = newPoints[i - 1];
          point.lifetime += 1;

          if (point.lifetime > duration) {
            newPoints.splice(i, 1);
          } else {
            const inc = point.lifetime / duration;
            const dec = 1 - inc;

            const spreadRate = spread === 1
              ? lineWidthStart / (point.lifetime * 2)
              : lineWidthStart * (1 - inc);
            
            context.lineJoin = 'round';
            context.lineWidth = spreadRate;
            context.strokeStyle = `rgb(255, ${200 - 255 * dec}, ${200 - 255 * inc})`;

            const lastPoint = newPoints[i - 1];
            const distance = Point.distance(lastPoint, point);
            const midpoint = Point.midPoint(lastPoint, point);
            const angle = Point.angle(lastPoint, point);

            if (pathMode === 1) {
              context.beginPath();
            }

            if (mode === 1) {
              context.arc(midpoint.x, midpoint.y, distance / 2, angle, angle + Math.PI, point.flip);
            }

            if (mode === 2) {
              context.moveTo(lastPoint.x, lastPoint.y);
              context.lineTo(point.x, point.y);
            }

            if (pathMode === 1) {
              context.stroke();
              context.closePath();
            }
          }
        }
      });

      if (pathMode === 2) {
        context.stroke();
        context.closePath();
      }

      requestAnimationFrame(animatePoints);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPoints((prevPoints) => [...prevPoints, new Point(x, y, 0, Math.random() > 0.5)]);
    };

    const handleKeyPress = (e) => {
      if (e.key === '1') setMode(1);
      if (e.key === '2') setMode(2);

      if (e.key === 'q') setSpread(1);
      if (e.key === 'w') setSpread(2);

      if (e.key === 'a') setPathMode(1);
      if (e.key === 's') setPathMode(2);

      if (e.key === 'z') {
        setLineWidthStart((prev) => Math.min(100, prev + 1));
      }

      if (e.key === 'x') {
        setLineWidthStart((prev) => Math.max(1, prev - 1));
      }

      if (e.key === 'g') {
        if (canvasRef.current) {
          const poopx = [];
          const poopy = [];
          const gap = 10;
          const rows = 10;
          const cols = 3;

          for (let i = (canvas.width / 2) - (gap * rows); i < (canvas.width / 2) + (gap * rows); i += gap) {
            if (i % (gap * 2) === 0) {
              for (let j = (canvas.height / 2) - (gap * cols); j < (canvas.height / 2) + (gap * cols); j += gap) {
                poopx.push(i);
                poopy.push(j);
              }
            } else {
              for (let j = (canvas.height / 2) + (gap * cols) - gap; j > (canvas.height / 2) - (gap * cols) - gap; j -= gap) {
                poopx.push(i);
                poopy.push(j);
              }
            }
          }

          const asd = () => {
            if (poopx.length <= 0) {
              return;
            }
            const x = poopx.pop();
            const y = poopy.pop();
            setPoints((prev) => [...prev, new Point(x, y, 0, Math.random() > 0.5)]);
            setTimeout(asd, 10);
          };

          asd();
        }
      }
    };

    const init = () => {
      resizeCanvas(window.innerWidth, window.innerHeight);
      animatePoints();
    };

    window.addEventListener('resize', () => resizeCanvas(window.innerWidth, window.innerHeight));
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);

    init();

    return () => {
      window.removeEventListener('resize', () => resizeCanvas(window.innerWidth, window.innerHeight));
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [points, mode, pathMode, spread, lineWidthStart]);

  class Point {
    constructor(x, y, lifetime, flip) {
      this.x = x;
      this.y = y;
      this.lifetime = lifetime;
      this.flip = flip;
    }

    static distance(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    static midPoint(a, b) {
      const mx = a.x + (b.x - a.x) * 0.5;
      const my = a.y + (b.y - a.y) * 0.5;
      return new Point(mx, my);
    }

    static angle(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.atan2(dy, dx);
    }
  }

  return <canvas ref={canvasRef} id="myCanvas"></canvas>;
};

export default Squiggly;
