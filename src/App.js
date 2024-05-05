import "./App.css";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import HRHome from "./pages/HRHome/HRHome";

import StaffDashboard, {
  StaffDashBoardLoader,
} from "./pages/StaffDashboard/StaffDashboard";

import LandingNew from "./pages/LandingNew/LandingNew";
import HRMeals from "./pages/HRMeals/HRMeals";
import HRBookings from "./pages/HRBookings/HRBookings";
import Carousel from "./components/Carousel/Carousel";

import { register } from 'swiper/element/bundle';
import Meals from "./pages/Meals/Meals";
// register Swiper custom elements
register(); 
function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingNew} index/>
        <Route path="/DashBoard" component={StaffDashboard} />
        <Route path="/HRhome" component={HRHome} />
        <Route path="/HRMeals" component={HRMeals} />
        <Route path="/HRBookings" component={HRBookings} />

        <Route path="/Lunch" component={Carousel} />


      </Switch>
    </BrowserRouter>
  );
}

export default App;
