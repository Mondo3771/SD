import './App.css';
import {  Route, BrowserRouter,Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import FakeHomePage from './pages/FakeHomePage/FakeHomePage';
import HRHome from './pages/HRHome/HRHome';

function App() {
  return (
    // <BrowserRouter>
    //   <Switch>
    //   <Route exact path="/" component={LandingPage} />
    //     <Route path="/Fake" component={FakeHomePage} />
    //     <Route path="/HRhome" component={HRHome} />

    //   </Switch>
    // </BrowserRouter>
    <HRHome/>
  );
}

export default App;
