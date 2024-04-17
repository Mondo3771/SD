import { createRoutesFromElements, Router, RouterProvider } from "react-router";
import "./App.css";

//components
import LandingPage from "./pages/LandingPage/LandingPage";
import {
  StaffDashboard,
  StaffDashBoardLoader,
} from "./pages/StaffDashboard/StaffDashboard";

import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
} from "react-router-dom";
import StaffDashboardAction from "./helpers/StaffDashboardAction";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<StaffDashboard />}
      loader={StaffDashBoardLoader}
      action={StaffDashboardAction}
    ></Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
