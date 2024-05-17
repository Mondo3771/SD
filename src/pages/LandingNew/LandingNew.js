import logo from "../../Images/logo3.svg";
import tasks from "./Images/icon2.PNG";
import report from "./Images/reportingnew.PNG";
import manage from "./Images/icon3.PNG";
import book from "./Images/icon4.PNG";
import LoginButton from "../../components/Log/LoginButton";
import { useAuth0, getAccessTokenSilently } from "@auth0/auth0-react";

import {
  Header,
  DropDown,
  Element,
  LandingPageBack,
  Features,
  About,
} from "./LandingNew.styles";
// =======
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../components/Loader/Loader";
import { fetchStorageData, setLocalStorage } from "../../helper";
// import { jwt } from "jsonwebtoken";

const LandingNew = () => {
  const history = useHistory();
  const { isAuthenticated, user } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [Loaded, setLoaded] = useState(false); //to perfrom login()
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false); //for Loader
  const [data, setData] = useState("");
  const childToParent = (childdata) => {
    // console.log("childToParent", childdata);
    setData(childdata);
    setLoaded(true);
  };
  // console.log(user);
  if (isAuthenticated && !Loaded) {
    childToParent(user);
    // token = gettoke();
    // console.log(token);\]
  }

  const login = async () => {
    const token = await getAccessTokenSilently();
    // localStorage.setItem("token", token)
    fetch(`/api/login?Token=${data.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((DB) => {
        console.log("Success:", DB.message);
        if (DB.message === "No user found") {
          const get = () =>
            fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                Department: null,
                EMP_type: "Staff",
                Token: data.sub,
              }),
            })
              .then((response) => response.json())
              .then((DB) => {
                console.log("Success:", DB);
                setLocalStorage({key: "User", value:DB.data})
                setLoaded(true);
                history.push(`/DashBoard`, { params: DB.data });
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          get();
        } else {
            setLocalStorage({key: "User", value:DB.data})
            const Us = fetchStorageData({key:"User"})
          console.log(DB.data);
          if (DB.data.EMP_type === "HR") {
            // localStorage.setItem("User", data);
            history.push(`/HRhome`, { params: DB.data });
          } else {
            history.push(`/DashBoard`, { params: DB.data });
          }
          // x
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // >>>>>>> UImakeOver
  useEffect(() => {
    if (data) {
      setLoading(true);
      login();
    }
  }, [data]);
  return (
    <>
      <LandingPageBack>
        <Header>
          <section className="heading">
            <img src={logo} width="55vw" height="55vh"></img>
            <h1> SYNERGY</h1>
          </section>

          <section className="description">
            <p
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              Features
            </p>

            <p
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              About
            </p>
          </section>
        </Header>
        {loading && <Loader />}

        {isDropdownOpen && (
          <DropDown>
            <Element>
              <Features>
                <img src={tasks} width="60%" height="80%"></img>
                <p>
                  Keep track of the time spent on each task to improve
                  productivity and efficiency. Easily monitor progress and
                  identify areas for improvement.
                </p>
              </Features>
            </Element>
            <Element>
              <Features>
                <img src={report} width="60%" height="80%"></img>
                <p>
                  {" "}
                  Automatically generate timesheets based on the tracked time
                  for each task. Streamline payroll and ensure accurate
                  reporting.
                </p>
              </Features>
            </Element>
            <Element>
              <Features>
                {" "}
                <img src={book} width="60%" height="80%"></img>
                <p>
                  Access comprehensive reports to gain insights into employee
                  productivity, project progress, and resource allocation. Make
                  informed decisions to optimize workflow and performance.
                </p>
              </Features>
            </Element>
            <Element>
              <Features>
                <img src={manage} width="60%" height="80%"></img>
                <p>
                  Simplify lunchtime arrangements by allowing staff to book
                  their meals directly through the app. Streamline meal planning
                  and ensure efficient catering.
                </p>
              </Features>
            </Element>
          </DropDown>
        )}
        {isAboutOpen && (
          <DropDown>
            <About>
              <img src={manage} width="60%" height="80%"></img>
              <p>
                Welcome to Synergy! We're dedicated to revolutionizing staff
                relations management and boosting productivity in your
                workplace. Our platform provides innovative tools for tracking
                task duration, generating timesheets, accessing detailed
                reports, and streamlining lunch meal bookings. With a
                user-friendly interface and powerful features, we aim to empower
                organizations to optimize their operations and enhance employee
                satisfaction. Join us on this journey to transform the way you
                manage your team and achieve greater success together.
              </p>
            </About>
          </DropDown>
        )}
        {isDropdownOpen || isAboutOpen ? (
          <section className="open">
            Connecting Teams, Boosting Productivity Together!
            {/* <Index data-testid="Login" child={childToParent} /> */}
            <LoginButton />
          </section>
        ) : (
          <section className="text">
            Connecting Teams, Boosting Productivity Together!
            {/* <Index data-testid="Login" child={childToParent} /> */}
            <LoginButton />
          </section>
        )}
      </LandingPageBack>
    </>
  );
};

export default LandingNew;
