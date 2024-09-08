import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './Particles.css';

const LINE_DURATION = 2;
const LINE_WIDTH_START = 5;

// Define the ease functions used for animation
const ease = {
  outQuad: (t) => t * (2 - t)
};

const Particles = () => {
  const containerRef = useRef(null);
  const sparks = useRef([]);
  const sparksIndex = useRef(0);
  const sparkCount = 100;
  const sparkParticleCount = 6;

  useEffect(() => {
    const container = containerRef.current;
    const lerp = (p1, p2, t) => p1 + (p2 - p1) * t;

    const circularRandom = (r) => {
      r = r * Math.sqrt(Math.abs(Math.random() - Math.random()));
      const theta = Math.random() * 2 * Math.PI;
      return { x: r * Math.cos(theta), y: r * Math.sin(theta), r };
    };

    // Create the sparks
    for (let i = 0; i <= sparkCount; i++) {
      const spark = { els: [] };

      for (let j = 0; j < sparkParticleCount; j++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        container.appendChild(dot);
        spark.els.push(dot);

        const particleSize = anime.random(5, 20);
        const sparkRadius = 20;
        const { x, y, r } = circularRandom(sparkRadius);

        dot.style.width = `${lerp(particleSize, 1, ease.outQuad(r / sparkRadius))}px`;
        dot.style.height = `${lerp(particleSize, 1, ease.outQuad(r / sparkRadius))}px`;
        dot.style.opacity = '0';
        dot.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }

      spark.anime = anime({
        targets: spark.els,
        loop: false,
        easing: 'linear',
        autoplay: false,
        delay: anime.stagger(8),
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 40 },
          { value: 0, duration: () => anime.random(500, 800) }
        ],
        width: { value: 2, duration: 500 },
        height: { value: 2, duration: 500 },
        translateX: {
          value: () => anime.random(-30, 30),
          duration: 800
        },
        translateY: {
          value: () => anime.random(-30, 30),
          duration: 800
        }
      });

      sparks.current.push(spark);
    }

    const handleMouseMove = (e) => {
      if (sparks.current.length > 0) {
        anime.set(sparks.current[sparksIndex.current].els, {
          left: e.pageX,
          top: e.pageY
        });
        sparks.current[sparksIndex.current].anime.restart();
        sparksIndex.current = (sparksIndex.current + 1) % sparks.current.length;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      sparks.current.forEach(spark => {
        spark.els.forEach(el => container.removeChild(el));
      });
    };
  }, []);

  return <div className="anime-container" ref={containerRef}></div>;
};

export default Particles;
