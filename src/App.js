import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import VerbTimelinePage from './pages/VerbTimeline';
import VerbTransformPage from './pages/VerbTransform';
import FluentFlowPage from './pages/FluentFlow';
import ChunkMasterPage from './pages/ChunkMaster';
import StoryForgePage from './pages/StoryForge';
import ScenarioSimPage from './pages/ScenarioSim';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="verb-timeline" element={<VerbTimelinePage />} />
          <Route path="verb-transform" element={<VerbTransformPage />} />
          <Route path="fluent-flow" element={<FluentFlowPage />} />
          <Route path="chunk-master" element={<ChunkMasterPage />} />
          <Route path="story-forge" element={<StoryForgePage />} />
          <Route path="scenario-sim" element={<ScenarioSimPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;