import "./App.css";
import ReactDOM from "react-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import HRHome from "./pages/HRHome/HRHome";

import StaffDashboard, {
  StaffDashBoardLoader,
} from "./pages/StaffDashboard/StaffDashboard";

import Reporting from "./components/Reporting/Reporting";

import LandingNew from "./pages/LandingNew/LandingNew";
import HRMeals from "./pages/HRMeals/HRMeals";
import HRBookings from "./pages/HRBookings/HRBookings";
import Carousel from "./components/Carousel/Carousel";
import StaffCarWash from "./components/StaffCarWash/StaffCarWash";
import { TempReportPage } from "./pages/TempReportPage/TempReportPage";
import StaffBookings from "./pages/StaffBookings/StaffBookings";

// import { register } from "swiper/element/bundle";
import LoginButton from "./components/Log/LoginButton";
import LogoutButton from "./components/Log/LogoutButton";
import { register } from "swiper/element/bundle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// register Swiper custom elements
register();

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function App() {
  const { logout, isAuthenticated, user } = useAuth0();

  return (
    <>
      {/* <BrowserRouter>
       <Switch>
         <Route exact path="/" component={LandingNew} index />
         <Route path="/DashBoard" component={StaffDashboard} />
         <GuardedRoute path='/Dashboard' component={StaffDashboard} auth ={true} />
         <GuardedRoute path="/HRhome" component={HRHome} auth ={true} />
         <GuardedRoute path="/HRMeals" component={HRMeals} auth ={true} />
         <GuardedRoute path="/HRBookings" component={HRBookings} auth ={true} />
         <GuardedRoute path="/Lunch" component={Carousel} auth ={true}/>
         <GuardedRoute path="/Reports" component={TempReportPage} auth ={true}/>
       </Switch>
     </BrowserRouter> */}
      {/* <StaffCarWash></StaffCarWash> */}
      {/* <TempReportPage></TempReportPage> */}
      {/* <Carousel></Carousel> */}
      <StaffBookings></StaffBookings>
    </> // <StaffDashboard/>
    // <Reporting></Reporting>
  );
}

export default App;
