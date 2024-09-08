import React from 'react';
import Particles from './Particles';
import Sparkle from './Sparkle';
import Squiggly from './Squiggly';
import MouseTrail from './MouseTrail';
import NumberTrail from './NumberTrail';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <h2 className="container-title">Particles Effect</h2>
        <Particles />
      </div>
      <div className="container">
        <h2 className="container-title">Sparkle Effect</h2>
        <Sparkle />
      </div>
      <div className="container">
        <h2 className="container-title">Squiggly Effect</h2>
        <Squiggly />
      </div>
      <div className="container">
        <h2 className="container-title">Mouse Trail Effect</h2>
        <MouseTrail />
      </div>
      <div className="container">
        <h2 className="container-title">Number Trail Effect</h2>
        <NumberTrail />
      </div>
    </div>
  );
};

export default App;

