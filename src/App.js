import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HRHome from "./pages/HRHome/HRHome";
import StaffDashboard from "./pages/StaffDashboard/StaffDashboard";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/DashBoard" component={StaffDashboard} />
        <Route path="/HRhome" component={HRHome} />
      </Switch>
    </BrowserRouter>
    // <HRHome/>
  );
}

export default App;
