import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { usePDF } from "react-to-pdf";

import {
  Feedback,
  Main,
  Summary,
  Block,
  Progress,
  Bottom,
  Dater,
  Heading,
  ChartSection,
  Top,
} from "./Reporting.styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
const Reporting = ({ User }) => {
  const [tasks, settasks] = useState(null);
  const [Projects, setProjects] = useState(new Set());
  const [projectTimeMap, setProjectTimeMap] = useState({});
  const [hours, setHours] = useState(null);

  const [feedback, setfeedback] = useState(null);
  const [sortFeed, setSortfeed] = useState(null);

  const [Active, setActive] = useState(0);
  const [inActive, setinActive] = useState(0);
  const [TotalHours, setTotalHours] = useState(0);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [chooseHour, setchooseHour] = useState(150);
  const [percentage, setpercentage] = useState(0);

  const fetchFeedback = (Emp_ID) => {
    fetch(`/api/feedback?Emp_ID=${Emp_ID}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        // setLocalStorage({ key: "Feedback", value: data.data });
        // setFirstLoad(true);

        const filteredFeedback = data.data.filter(
          (feedback) => feedback.Receive_ID === Emp_ID
        );

        // Set the filtered feedback data to state
        setfeedback(filteredFeedback);
        setSortfeed(filteredFeedback);
      });
  };

  const GetAllTasks = (Emp_ID) => {
    fetch(`/api/Tasks/?Emp_ID=${Emp_ID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.data);
        settasks(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    GetAllTasks(User.Emp_ID);
    fetchFeedback(User.Emp_ID);
  }, [User]);

  useEffect(() => {
    const projectMap = {};
    let activecount = 0;
    let inactivecount = 0;
    let hours = 0;

    if (tasks) {
      tasks.forEach((task) => {
        const taskDate = new Date(task.Date);
        const taskYear = taskDate.getFullYear();
        const taskMonth = taskDate.getMonth() + 1;

        if (taskYear === selectedYear && taskMonth === selectedMonth) {
          task.Active === true ? activecount++ : inactivecount++; //chnage
          if (!projectMap[task.Project]) {
            projectMap[task.Project] = 0;
          }
          projectMap[task.Project] += task.Time;
          hours += task.Time;
        }
      });
      setProjects(new Set(Object.keys(projectMap)));
      setProjectTimeMap(projectMap);
      setActive(activecount);
      // console.log(activecount, "no");
      setinActive(inactivecount);
      // console.log(activecount, "nocap");

      setTotalHours(hours);
    }
  }, [selectedYear, selectedMonth, tasks]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  const colors = [
    "rgb(49, 20, 78)",
    "rgb(189, 189, 189)",
    "rgb(81, 77, 116)",
    "rgb(63, 33, 130)",
    "rgb(155, 103, 168)",
  ];

  const data = Object.keys(projectTimeMap).map((project, index) => ({
    x: [project],
    y: [projectTimeMap[project] / 3600],
    type: "bar",
    marker: {
      color: colors[index % colors.length],
    },
  }));

  const layout = {
    title: {
      text: "Time Spent on Tasks by Project",
      font: {
        color: "white",
      },
    },
    color: "white",
    xaxis: {
      title: "Projects",
      automargin: true,
      tickangle: 45,
      color: "white",
      margin: {
        t: 50, // Top margin
        l: 50, // Left margin
        r: 50, // Right margin
        b: 150, // Bottom margin to ensure x-axis labels fit
      },
      height: "60vh",
    },
    yaxis: { title: "Time Spent (hours)", color: "white" },
    // paper_bgcolor: "#bdbdbd",
    plot_bgcolor: "transparent",
    paper_bgcolor: "transparent",
    animate: true,
    color: "white",
    animation: {
      duration: 10000, // Animation duration in milliseconds
      easing: "ease-in", // Easing function for the animation
    },
    showlegend: false,
  };
  const datapie = [
    {
      values: [Active, inActive],
      labels: ["Completed", "In progress"],
      type: "pie",

      marker: { colors: ["#e8cdde", "#9B67A8"] },
      textinfo: "percent", // Show both label and percentage
      insidetextorientation: "horizontal", // Orientation of the text
      textposition: "inside", // Text inside the pie slices
      textfont: {
        color: "white", // Make the text white
      },
    },
  ];

  // Layout options for the plot
  const layoutpie = {
    title: {
      text: "Task Status Distribution",
      font: {
        color: "white",
      },
    },
    paper_bgcolor: "transparent",
    showlegend: true,
    legend: {
      font: {
        color: "white", // Make the legend labels white
      },
    },
  };

  const { toPDF, targetRef } = usePDF({
    filename: User.Name ? User.Name + "-Report.pdf" : +"My-Report.pdf",
  });

  useEffect(() => {
    // Sort comments by date in descending order (from latest to earliest)

    const monthFeed = [];
    if (feedback) {
      feedback.forEach((comment) => {
        const comDate = new Date(comment.Date);
        console.log(comDate);
        const comYear = comDate.getFullYear();
        const comMonth = comDate.getMonth() + 1;
        if (comYear === selectedYear && comMonth === selectedMonth) {
          monthFeed.push(comment);
        }
      });
    }
    const sortedFeedback = [...monthFeed].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setfeedback(sortedFeedback);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const total = TotalHours
      ? Math.floor((TotalHours / 3600 / chooseHour) * 100)
      : 0;

    setpercentage(total > 100 ? 100 : total);
  }, [chooseHour, TotalHours]);

  const handlehourChange = (event) => {
    setchooseHour(event.target.value);
  };
  return (
    <>
      <main ref={targetRef}>
        <Heading>
          <h2> {User.Name ? "Report for " + User.Name : "My Report"}</h2>

          <button onClick={() => toPDF()}>
            <ArrowDownTrayIcon width={24} height={24} /> Download
          </button>
        </Heading>
        <Dater>
          <article>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
            />
          </article>
          <article>
            <label htmlFor="month">Month:</label>
            <input
              type="number"
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              min="1"
              max="12"
            />
          </article>
        </Dater>

        <Main>
          <ChartSection>
            <Plot
              data={data}
              layout={layout}
              style={{
                width: "100vh",
                height: "70vh",
                margin: "3vw",
                border: "2px solid white",
                borderRadius: "20px",
              }}
            />
            <Feedback>
              <h2>Notifications</h2>
              <section className="text">
                {sortFeed
                  ? sortFeed.map((item, index) => (
                      <p key={index} className="messagebox">
                        {/* <strong>
                            {item.Name}:</strong> */}
                        <strong> Message: {item.Message}</strong>
                        <br />
                        <strong>date:{item.Date.split("T")[0]}</strong>
                      </p>
                    ))
                  : null}
              </section>
            </Feedback>
          </ChartSection>

          <Bottom>
            <Summary>
              <Plot
                data={datapie}
                layout={layoutpie}
                style={{
                  width: "100%",
                  height: "50vh",
                  margin: "40px",
                  border: "2px solid white",
                  borderRadius: "20px",
                }}
              />
            </Summary>

            <Progress>
              <p>Productivity rate per {chooseHour} hours</p>

              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathTransition: "linear",
                  pathTransitionDuration: 0.5,
                  rotation: 0.5 + (1 - percentage / 100) / 2,

                  // Colors
                  pathColor: "#31174b",
                  textColor: "white",
                  trailColor: "#bdbdbd",
                  backgroundColor: "#white",
                })}
              />
              <input
                type="number"
                value={chooseHour}
                onChange={handlehourChange}
                min="1"
              ></input>
            </Progress>
          </Bottom>
        </Main>
      </main>
    </>
  );
};

export default Reporting;
