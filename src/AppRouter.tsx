import * as React from 'react'
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Analytics from './component/Analytics/Analytics';
import Display from './component/Display/Display';

const AppRouter = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
    <Router>
    <Routes>
    <Route path="/" element={<Display />} />
    <Route path="/analytics" element={<Analytics />} />
    </Routes>
    </Router>
    </React.Suspense>
  )
}

export default AppRouter