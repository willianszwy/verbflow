import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import VerbTimelinePage from './pages/VerbTimeline';
import VerbTransformPage from './pages/VerbTransform';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="verb-timeline" element={<VerbTimelinePage />} />
          <Route path="verb-transform" element={<VerbTransformPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;