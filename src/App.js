import './App.css';
import { Routes, Route, BrowserRouter,Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import FakeHomePage from './pages/FakeHomePage/FakeHomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/FakeHomePage" element={<FakeHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
