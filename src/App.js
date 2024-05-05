import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import HRHome from "./pages/HRHome/HRHome";

import StaffDashboard from "./pages/StaffDashboard/StaffDashboard";

import LandingNew from "./pages/LandingNew/LandingNew";
import HRMeals from "./pages/HRMeals/HRMeals";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingNew} index/>
        <Route path="/DashBoard" component={StaffDashboard} />
        <Route path="/HRhome" component={HRHome} />
        <Route path="/HRMeals" component={HRMeals} />
        {/* <Route path="/" component={StaffDashboard} /> */}
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
