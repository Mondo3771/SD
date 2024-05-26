import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";//for our plotting
import { usePDF } from "react-to-pdf";// to convert into pdf

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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";// circular progress bar
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
const Reporting = ({ User }) => {
  const [tasks, settasks] = useState(null);//to store tasks from timesheets for user so this is what we will use to graph
  const [Projects, setProjects] = useState(new Set());//to store projects from each task
  const [projectTimeMap, setProjectTimeMap] = useState({});// to store time spent on each project
  const [hours, setHours] = useState(null);

  const [feedback, setfeedback] = useState(null);// to stroe feedback from fetch
  const [sortFeed, setSortfeed] = useState(null);// to sort the feedback

  const [Active, setActive] = useState(0);// to store the no. of active tasks
  const [inActive, setinActive] = useState(0);///to store no. of inactive tasks
  const [TotalHours, setTotalHours] = useState(0);// to change circulare progress bar

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());// to change according to year the user selects
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);// tp change according to month user seleected

  const [chooseHour, setchooseHour] = useState(150);
  const [percentage, setpercentage] = useState(0);

  const fetchFeedback = (Emp_ID) => {// fetch all the feed back
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
          (feedback) => feedback.Receive_ID === Emp_ID//filter so that we only have the ones that were sent to us
        );

        // Set the filtered feedback data to state
        setfeedback(filteredFeedback);
        setSortfeed(filteredFeedback);
      });
  };

  const GetAllTasks = (Emp_ID) => {// to fetch all tasks from DB
    console.log("Startyimg");
    fetch(`/api/Tasks/?Emp_ID=${Emp_ID}`)
      .then((response) =>response.json()
      )
      .then((data) => {
        console.log("Success:", data.data);
        settasks(data.data);// sets it for us
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {//This was used to do all the fetches again if new User info is passed so that it can change according to the specific user
    GetAllTasks(User.Emp_ID);
    console.log("ge");
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

        if (taskYear === selectedYear && taskMonth === selectedMonth) {// sorting based on the year and month selected
          task.Active === true ? activecount++ : inactivecount++; //getting info for active vs inactive to display on pie chart
          if (!projectMap[task.Project]) {//this all done to sort the projects
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
  }, [selectedYear, selectedMonth, tasks]);// changing when the following changes

  const handleYearChange = (event) => {// cahnge according to user changing year
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {// cahnge according to user changing month
    setSelectedMonth(parseInt(event.target.value));
  };
  const colors = [
    "rgb(49, 20, 78)",
    "rgb(189, 189, 189)",
    "rgb(81, 77, 116)",
    "rgb(63, 33, 130)",
    "rgb(155, 103, 168)",
  ];

  const data = Object.keys(projectTimeMap).map((project, index) => ({// the data based on the projects to be displaeyd on bar graph
    x: [project],
    y: [projectTimeMap[project] / 3600],// it is in seconds in the DB so want to convert into hours
    type: "bar",
    marker: {
      color: colors[index % colors.length],
    },
  }));

  const layout = {// layout for bargraph
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
  const datapie = [// layout for pie chart
    {
      values: [Active, inActive],//the active vs inactive
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

  const { toPDF, targetRef } = usePDF({// what is ussed to downlaod the pdf
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

  useEffect(() => {//used to change according to what user specfies fro the circular progresser
    const total = TotalHours
      ? Math.floor((TotalHours / 3600 / chooseHour) * 100)
      : 0;

    setpercentage(total > 100 ? 100 : total);
  }, [chooseHour, TotalHours]);

  const handlehourChange = (event) => {// used to track change for the above useffect
    setchooseHour(event.target.value);
  };
  return (
    <>
    {/* {this targetRef is what is used to specific that its children is what needs to be downloaded} */}
      <main ref={targetRef}>
        <Heading>
          {/* {User.Name will be null if im viewing my own report } */}
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
          {/* 
                <Top>
                    
                    <Plot
                        data={data}
                        layout={layout}
                        style={{ width: '60%', height: '60vh',margin:'40px' }}
                    />
                    <Feedback>
                    <h2>Hello</h2> 
                    {sortFeed?sortFeed.map((item, index) => (
                        <p key={index}>
                            <p><strong>{item.Name}:</strong> {item.message}</p>
                        </p>
                    )):null}


                 </Feedback>

                </Top> */}
          <ChartSection>
            {/* {bar Graph to plot hours} */}
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
              {/* {Feedback that loops throgh feedback and displays it } */}

            <Feedback>
              <h2>Notifications</h2>
              <section className="text">
                {sortFeed
                  ? sortFeed.map((item, index) => (
                      <p key={index}>
                        <p className="messagebox">
                          {/* <strong>
                            {item.Name}:</strong> */}
                          <strong> Message: {item.Message}</strong>
                          <br />
                          <strong>date:{item.Date.split("T")[0]}</strong>
                        </p>
                      </p>
                    ))
                  : null}
              </section>
            </Feedback>
          </ChartSection>

          <Bottom>
            <Summary>
               {/* {pie Graph to plot active vs inactive} */}

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
             {/*the circular progress bar */}

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
