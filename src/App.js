import "./App.css";
// import { Route, BrowserRouter, Switch } from "react-router-dom";
// import LandingPage from "./pages/LandingPage/LandingPage";
// import HRHome from "./pages/HRHome/HRHome";
// import StaffDashboard, { StaffDashBoardLoader } from "./pages/StaffDashboard/StaffDashboard";

import Bookings from "./components/Bookings/Bookings";
function App() {
  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/" component={LandingPage} />
    //     <Route path="/DashBoard" component={StaffDashboard}  />
    //     <Route path="/HRhome" component={HRHome} />
    //   </Switch>
    // </BrowserRouter>
    // <HRHome/>
    <Bookings></Bookings>
  );
}

export default App;
