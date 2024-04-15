import { createRoutesFromElements, Router, RouterProvider } from "react-router";
import "./App.css";

//components
import Tracker from "./components/Tracker/Tracker";
import LandingPage from "./pages/LandingPage/LandingPage";
import { StaffDashboard } from "./pages/StaffDashboard/StaffDashboard";

import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<StaffDashboard />} ></Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
