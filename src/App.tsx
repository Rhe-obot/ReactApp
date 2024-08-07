import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Analytics from './component/Analytics/Analytics';
import Display from './component/Display/Display';
import { ClickProvider } from './component/Click/ClickContext';
import React from 'react';


const App = () => {
  return (
    <ClickProvider>
      <React.Suspense>
    <Router>
    <Routes>
    <Route path="/" element={<Display />} />
    <Route path="/analytics" element={<Analytics />} />
    </Routes>
    </Router>
    </React.Suspense>
    </ClickProvider>
    
    
  )
}

export default App