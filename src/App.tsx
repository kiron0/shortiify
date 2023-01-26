import React from 'react';
import Navbar from './shared/Navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="bg-[url('./assets/bg.jpg')] h-screen bg-repeat">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
