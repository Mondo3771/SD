import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import HRHome from "./pages/HRHome/HRHome";

import StaffDashboard, {
  StaffDashBoardLoader,
} from "./pages/StaffDashboard/StaffDashboard";

import LandingNew from "./pages/LandingNew/LandingNew";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingNew} />
        <Route path="/DashBoard" component={StaffDashboard} />
        <Route path="/HRhome" component={HRHome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
