import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Interactive from './pages/Interactive';
import Static from './pages/Static';
import Questions from './pages/Questions';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interactive" element={<Interactive />} />
          <Route path="/static" element={<Static />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;