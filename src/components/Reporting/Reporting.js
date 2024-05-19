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
} from "./Reporting.styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const mockGraph = [
  {
    Project: "Standard bank App",
    Time: 249,
    Date: "2024-04-02 00:00:00.000",
    Active: 1,
  },
  {
    Project: "Finance Management System",
    Time: 1802,
    Date: "2024-04-04 00:00:00.000",
    Active: 0,
  },
  {
    Project: "E-commerce Platform",
    Time: 2954,
    Date: "2024-04-07 00:00:00.000",
    Active: 0,
  },
  {
    Project: "Standard bank App",
    Time: 23,
    Date: "2024-04-09 00:00:00.000",
    Active: 1,
  },
  {
    Project: "Healthcare Management App",
    Time: 2191,
    Date: "2024-04-12 00:00:00.000",
    Active: 0,
  },
  {
    Project: "Standard bank App",
    Time: 409,
    Date: "2024-06-14 00:00:00.000",
    Active: 1,
  },
  {
    Project: "Online Learning Platform",
    Time: 2430,
    Date: "2024-04-17 00:00:00.000",
    Active: 0,
  },
  {
    Project: "Standard bank App",
    Time: 1309,
    Date: "2024-05-19 00:00:00.000",
    Active: 1,
  },
  {
    Project: "Inventory Management System",
    Time: 1945,
    Date: "2024-04-22 00:00:00.000",
    Active: 0,
  },
  {
    Project: "Standard bank App",
    Time: 733,
    Date: "2024-04-24 00:00:00.000",
    Active: 1,
  },
  {
    Project: "HR Management Software",
    Time: 18239,
    Date: "2023-04-27 00:00:00.000",
    Active: 0,
  },
  {
    Project: "Standard bank App",
    Time: 2031,
    Date: "2024-04-29 00:00:00.000",
    Active: 1,
  },
  {
    Project: "Standard bank App",
    Time: 2502,
    Date: "2024-04-06 00:00:00.000",
    Active: 1,
  },
  {
    Project: "Data Analysis Platform",
    Time: 1704,
    Date: "2024-04-11 00:00:00.000",
    Active: 0,
  },
  {
    Project: "Project Management Tool",
    Time: 2213,
    Date: "2024-04-16 00:00:00.000",
    Active: 0,
  },
];

// a query that joins employee with feedback for specfic employee
const mockFeed = [
  {
    Name: "Nathan",
    Comment: "Good job in completing task",
    date: "2024-04-11 00:00:00.000",
  },
  {
    Name: "Emily",
    Comment: "Impressive work! Keep it up!",
    date: "2024-04-15 00:00:00.000",
  },
  {
    Name: "Michael",
    Comment: "Well done! Your efforts are appreciated.",
    date: "2024-04-18 00:00:00.000",
  },
  {
    Name: "Sophia",
    Comment: "Great progress! Looking forward to more updates.",
    date: "2023-04-21 00:00:00.000",
  },
  {
    Name: "Daniel",
    Comment: "Fantastic job on this task!",
    date: "2024-05-24 00:00:00.000",
  },
  {
    Name: "Nathan",
    Comment: "Keep up the good work!",
    date: "2024-04-27 00:00:00.000",
  },
  {
    Name: "Olivia",
    Comment: "Excellent work! Your dedication is evident.",
    date: "2024-04-30 00:00:00.000",
  },
  {
    Name: "Emily",
    Comment: "Impressive work! Keep it up!",
    date: "2024-04-16 00:00:00.000",
  },
];

const Reporting = ({ User }) => {
  const [tasks, settasks] = useState(null);
  const [Projects, setProjects] = useState(new Set());
  const [projectTimeMap, setProjectTimeMap] = useState({});
  const [hours, setHours] = useState(null);
  const [feedback, setfeedback] = useState(null);
  const [Active, setActive] = useState(0);
  const [inActive, setinActive] = useState(0);
  const [TotalHours, setTotalHours] = useState(0);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [chooseHour, setchooseHour] = useState(150);
  const [percentage, setpercentage] = useState(0);

  useEffect(() => {
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
    GetAllTasks(User.Emp_ID);
  }, []);

  useEffect(() => {
    const projectMap = {};
    let activecount = 0;
    let inactivecount = 0;
    let hours = 0;

    //   if(tasks){
    mockGraph.forEach((task) => {
      const taskDate = new Date(task.Date);
      const taskYear = taskDate.getFullYear();
      const taskMonth = taskDate.getMonth() + 1;

      if (taskYear === selectedYear && taskMonth === selectedMonth) {
        task.Active === 1 ? activecount++ : inactivecount++; //chnage
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
    console.log(activecount, "no");
    setinActive(inactivecount);
    console.log(activecount, "nocap");

    setTotalHours(hours);

    //   }
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
      labels: ["In progress", "Completed"],
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

  const { toPDF, targetRef } = usePDF({ filename: User.Name + "-Report.pdf" });

  useEffect(() => {
    // Sort comments by date in descending order (from latest to earliest)

    const monthFeed = [];
    mockFeed.forEach((comment) => {
      const comDate = new Date(comment.date);
      const comYear = comDate.getFullYear();
      const comMonth = comDate.getMonth() + 1;
      if (comYear === selectedYear && comMonth === selectedMonth) {
        monthFeed.push(comment);
      }
    });
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
          <h2>Report for {User.Name}</h2>
          <button onClick={() => toPDF()}>Download PDF</button>
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
                borderRadius: "8%",
              }}
            />
            <Feedback>
              <h2>Notifications</h2>
              <section className="text">
                {feedback
                  ? feedback.map((item, index) => (
                      <p key={index}>
                        <p>
                          <strong>{item.Name}:</strong> {item.Comment}. date:
                          {item.date}
                        </p>
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
                  borderRadius: "8%",
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
            </Progress>
          </Bottom>
        </Main>
      </main>
    </>
  );
};

export default Reporting;
