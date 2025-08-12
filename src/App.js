import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import VerbTimelinePage from './pages/VerbTimeline';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="verb-timeline" element={<VerbTimelinePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;