import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './components/pages/HomePage';
import { ROIAnalysisPage } from './components/pages/ROIAnalysisPage';
import { TCOAnalysisPage } from './components/pages/TCOAnalysisPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roi-analysis" element={<ROIAnalysisPage />} />
          <Route path="/tco-analysis" element={<TCOAnalysisPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
