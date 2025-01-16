import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Interactive from './pages/Interactive';
import Static from './pages/Static';
import Questions from './pages/Questions';
import SDK from './pages/SDK';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interactive" element={<Interactive />} />
          <Route path="/static" element={<Static />} />
          <Route path="/sdk" element={<SDK />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;