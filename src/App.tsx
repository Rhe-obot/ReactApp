import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Display from './component/Display/Display';
import Analytics from './component/Analytics/Analytics';



const App: React.FC = () => {
  return (
    
    <React.Suspense fallback={<>Loading...</>}>
      
    <Router>
      <Routes>
         <Route path="/" element={<Display />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
      </React.Suspense>
  );
};

export default App;
