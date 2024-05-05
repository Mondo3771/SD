import "./App.css";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HRHome from "./pages/HRHome/HRHome";


import StaffDashboard, {
  StaffDashBoardLoader,
} from "./pages/StaffDashboard/StaffDashboard";

import LandingNew from "./pages/LandingNew/LandingNew";
import Carousel from "./components/Carousel/Carousel";

import { register } from 'swiper/element/bundle';
import Meals from "./pages/Meals/Meals";
// register Swiper custom elements
register(); 
function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingNew} />
        <Route path="/DashBoard" component={StaffDashboard} />
        <Route path="/HRhome" component={HRHome} />
        <Route path="/Lunch" component={Carousel} />


      </Switch>
    </BrowserRouter>
  //   <HRHome />
  //  <LandingNew/>
  //   <HRdatagrid/>
    // <Carousel></Carousel>
// <<<<<<< Tholwana/UIBookings
//     // <Meals></Meals>
// =======
// >>>>>>> Nathan-Bookings
  );
}

export default App;
