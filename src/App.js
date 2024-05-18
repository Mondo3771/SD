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

import { fetchStorageData,setLocalStorage } from "./helper";
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
  console.log(isAuthenticated,"authen");
  console.log(user,"user");
  setLocalStorage({ key: "Profile", value: user });

  const employee = fetchStorageData({ key: "User" });
  

  const HRallowed=()=>{
      if(employee.EMP_type==='HR' || isAuthenticated){
          return true
      }
      else{
        return false;
      }



  }


  return (
    <>
       <BrowserRouter>
       <Switch>
         <Route exact path="/" component={LandingNew} index />
         <GuardedRoute path='/Dashboard' component={StaffDashboard} auth ={isAuthenticated} />
         <GuardedRoute path="/HRhome" component={HRHome} auth ={HRallowed()} />
         <GuardedRoute path="/HRMeals" component={HRMeals} auth ={HRallowed()} />
         <GuardedRoute path="/HRBookings" component={HRBookings} auth ={HRallowed()} />
         <GuardedRoute path="/staffBooking" component={Carousel} auth ={isAuthenticated}/>
         <GuardedRoute path="/Reports" component={TempReportPage} auth ={isAuthenticated}/>
      </Switch>
     </BrowserRouter>
     {/* <ToastContainer/> */}
    </> // <StaffDashboard/>
    // <Reporting></Reporting>
  );
}

export default App;
