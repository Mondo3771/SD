import './App.css';
import {Route,Routes, BrowserRouter} from 'react-router-dom'



//components
import Tracker from './components/Tracker/Tracker';
import LandingPage from './pages/LandingPage/LandingPage';
import FakeHomePage from './pages/FakeHomePage/FakeHomePage';
function App() {
  return (<>

      {/* <Tracker>
      </Tracker> */}
      <LandingPage/>

      <BrowserRouter>
      

      <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/FakeHomePage" element={<FakeHomePage/>}/>


      

      </Routes>
     
     
 
    
    </BrowserRouter>
 
  
  
  
  </>
  
);
}

export default App;
