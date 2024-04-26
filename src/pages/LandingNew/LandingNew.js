import React, { useState } from "react";
import logo from "./Images/synergyLogo.PNG";
import tasks from "./Images/icon2.PNG";
import report from "./Images/reportingnew.PNG";
import manage from "./Images/icon3.PNG";
import book from "./Images/icon4.PNG";
import {
  Header,
  DropDown,
  Element,
  LandingPageBack,
  features,
} from "./LandingNew.styles";

const LandingNew = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <LandingPageBack>
        <Header>
          <section className="heading">
            <img src={logo} width="45vw" height="45vh"></img>
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

        {isDropdownOpen && (
          <DropDown>
            <Element>
              <features>
                <img src={tasks} width="60%" height="80%"></img>
                <p>
                  Keep track of the time spent on each task to improve
                  productivity and efficiency. Easily monitor progress and
                  identify areas for improvement.
                </p>
              </features>
            </Element>
            <Element>
              <features>
                <img src={report} width="60%" height="80%"></img>
                <p>
                  {" "}
                  Automatically generate timesheets based on the tracked time
                  for each task. Streamline payroll and ensure accurate
                  reporting.
                </p>
              </features>
            </Element>
            <Element>
              <features>
                {" "}
                <img src={book} width="60%" height="80%"></img>
                <p>
                  Access comprehensive reports to gain insights into employee
                  productivity, project progress, and resource allocation. Make
                  informed decisions to optimize workflow and performance.
                </p>
              </features>
            </Element>
            <Element>
              <features>
                <img src={manage} width="60%" height="80%"></img>
                <p>
                  Simplify lunchtime arrangements by allowing staff to book
                  their meals directly through the app. Streamline meal planning
                  and ensure efficient catering.
                </p>
              </features>
            </Element>
          </DropDown>
        )}
        {isAboutOpen && (
          <DropDown>
            <p>
              Welcome to Synergy! We're dedicated to revolutionizing staff
              relations management and boosting productivity in your workplace.
              Our platform provides innovative tools for tracking task duration,
              generating timesheets, accessing detailed reports, and
              streamlining lunch meal bookings. With a user-friendly interface
              and powerful features, we aim to empower organizations to optimize
              their operations and enhance employee satisfaction. Join us on
              this journey to transform the way you manage your team and achieve
              greater success together.
            </p>
          </DropDown>
        )}
        <section className="text">
          <h2>Connecting Teams, Boosting Productivity Together!</h2>
        </section>
      </LandingPageBack>
    </>
  );
};

export default LandingNew;
