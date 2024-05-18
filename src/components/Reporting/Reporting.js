import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { usePDF } from 'react-to-pdf';

import { Feedback,Main, Summary ,Block,Progress,Bottom,Dater} from './Reporting.styles';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';




const mockGraph = [
    {
        Project: "Standard bank App",
        Time: 249,
        Date: '2024-04-02 00:00:00.000',
        Active: 1
    },
    {
        Project: "Finance Management System",
        Time: 1802,
        Date: '2024-04-04 00:00:00.000',
        Active: 0
    },
    {
        Project: "E-commerce Platform",
        Time: 2954,
        Date: '2024-04-07 00:00:00.000',
        Active: 0
    },
    {
        Project: "Standard bank App",
        Time: 23,
        Date: '2024-04-09 00:00:00.000',
        Active: 1
    },
    {
        Project: "Healthcare Management App",
        Time: 2191,
        Date: '2024-04-12 00:00:00.000',
        Active: 0
    },
    {
        Project: "Standard bank App",
        Time: 409,
        Date: '2024-06-14 00:00:00.000',
        Active: 1
    },
    {
        Project: "Online Learning Platform",
        Time: 2430,
        Date: '2024-04-17 00:00:00.000',
        Active: 0
    },
    {
        Project: "Standard bank App",
        Time: 1309,
        Date: '2024-05-19 00:00:00.000',
        Active: 1
    },
    {
        Project: "Inventory Management System",
        Time: 1945,
        Date: '2024-04-22 00:00:00.000',
        Active: 0
    },
    {
        Project: "Standard bank App",
        Time: 733,
        Date: '2024-04-24 00:00:00.000',
        Active: 1
    },
    {
        Project: "HR Management Software",
        Time: 18239,
        Date: '2023-04-27 00:00:00.000',
        Active: 0
    },
    {
        Project: "Standard bank App",
        Time: 2031,
        Date: '2024-04-29 00:00:00.000',
        Active: 1
    },
    {
        Project: "Standard bank App",
        Time: 2502,
        Date: '2024-04-06 00:00:00.000',
        Active: 1
    },
    {
        Project: "Data Analysis Platform",
        Time: 1704,
        Date: '2024-04-11 00:00:00.000',
        Active: 0
    },
    {
        Project: "Project Management Tool",
        Time: 2213,
        Date: '2024-04-16 00:00:00.000',
        Active: 0
    }
];


// a query that joins employee with feedback for specfic employee
const mockFeed = [
    {
        Name: "Nathan",
        Comment: "Good job in completing task",
        date: '2024-04-11 00:00:00.000'
    },
    {
        Name: "Emily",
        Comment: "Impressive work! Keep it up!",
        date: '2024-04-15 00:00:00.000'
    },
    {
        Name: "Michael",
        Comment: "Well done! Your efforts are appreciated.",
        date: '2024-04-18 00:00:00.000'
    },
    {
        Name: "Sophia",
        Comment: "Great progress! Looking forward to more updates.",
        date: '2023-04-21 00:00:00.000'
    },
    {
        Name: "Daniel",
        Comment: "Fantastic job on this task!",
        date: '2024-05-24 00:00:00.000'
    },
    {
        Name: "Nathan",
        Comment: "Keep up the good work!",
        date: '2024-04-27 00:00:00.000'
    },
    {
        Name: "Olivia",
        Comment: "Excellent work! Your dedication is evident.",
        date: '2024-04-30 00:00:00.000'
    },
    {
        Name: "Emily",
        Comment: "Impressive work! Keep it up!",
        date: '2024-04-16 00:00:00.000'
    }
];




const Reporting = ({User}) => {
    const [tasks,settasks]=useState(null);
    const [Projects, setProjects] = useState(new Set());
    const [projectTimeMap, setProjectTimeMap] = useState({});
    const [hours, setHours] = useState(null);
    const[feedback,setfeedback]=useState(null);
    const[Active,setActive]=useState(0);
    const[inActive,setinActive]=useState(0)
    const[TotalHours,setTotalHours]=useState(0)

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 

    const[chooseHour,setchooseHour]=useState(150);
    const[percentage,setpercentage]=useState(0);

    useEffect(()=>{
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
          GetAllTasks(User.Emp_ID)

    },[User])

  

    useEffect(() => {
        const projectMap = {};
        let activecount = 0;
        let inactivecount = 0;
        let hours = 0;

    
          if(tasks){
            tasks.forEach(task => {
                const taskDate = new Date(task.Date);
                const taskYear = taskDate.getFullYear();
                const taskMonth = taskDate.getMonth() + 1; 
    
                if (taskYear === selectedYear && taskMonth === selectedMonth) {
                    task.Active === true ? activecount++ : inactivecount++;
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
            console.log(activecount,'no');
            setinActive(inactivecount);
            console.log(activecount,'nocap');

            setTotalHours(hours);

          }
      
    }, [selectedYear, selectedMonth,tasks]); 

    const handleYearChange = event => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handleMonthChange = event => {
        setSelectedMonth(parseInt(event.target.value));
    };
    




    const data = Object.keys(projectTimeMap).map(project => ({
        x: [project],
        y: [projectTimeMap[project] / 3600], 
        type: 'bar',
        marker: { color: 'purple' }
    }));

    const layout = {
        title: 'Time Spent on Tasks by Project',
        xaxis: { title: 'Projects' },
        yaxis: { title: 'Time Spent (hours)' },
        showlegend:false
    };
    const datapie = [
        {
            values: [Active, inActive],
            labels: ['Active', 'Inactive'],
            type: 'pie',
            marker: { colors: ['green', 'red'] }
        }
    ];

    // Layout options for the plot
    const layoutpie = {
        title: 'Task Status Distribution',
        showlegend: true
    };

    const { toPDF, targetRef } = usePDF({ filename: User.Name? User.Name+"-Report.pdf" : "My Report.pdf" });

    useEffect(() => {
        // Sort comments by date in descending order (from latest to earliest)
        
        const monthFeed=[];
        mockFeed.forEach(comment=>{
            const comDate = new Date(comment.date);
            const comYear = comDate.getFullYear();
            const comMonth = comDate.getMonth() + 1; 
            if (comYear === selectedYear && comMonth === selectedMonth) {
                monthFeed.push(comment)


            }
            

        });
        const sortedFeedback = [...monthFeed].sort((a, b) => new Date(b.date) - new Date(a.date));

        setfeedback(sortedFeedback);
    }, [selectedYear, selectedMonth]);
    
    
    useEffect(()=>{
        const total=TotalHours?Math.floor((TotalHours/3600)/ chooseHour*100):0;

        setpercentage( total>100?100:total);

    },[chooseHour,TotalHours])


    const handlehourChange=(event)=>{
        setchooseHour(event.target.value)

    }
    return (
        <>
         
            <main ref={targetRef}>
            <h2> {User.Name? 'Report for ' + User.Name: 'MyReport'}</h2>
           

            <Main  >
                <Dater>
                <article>
                        <label htmlFor="year">Year:</label>
                        <input type="number" id="year" value={selectedYear} onChange={handleYearChange} />
                    </article>
                    <article>
                        <label htmlFor="month">Month:</label>
                        <input type="number" id="month" value={selectedMonth} onChange={handleMonthChange} />
                    </article>

                </Dater>
     
                <Plot
                    data={data}
                    layout={layout}
                    style={{ width: '60%', height: '60vh',margin:'40px' }}
                />
                <Feedback>
                <h2>Hello</h2> 
                {feedback?feedback.map((item, index) => (
                    <p key={index}>
                        <p><strong>{item.Name}:</strong> {item.Comment}. date:{item.date}</p>
                    </p>
                )):null}


                </Feedback>

            </Main>
            <Bottom>
            <Summary>
                <Plot
                    data={datapie}
                    layout={layoutpie}
                    style={{ width: '60%', height: '50vh',margin:'40px' }}
                />


            </Summary>
        <Progress>
            <p>Did they Complete {chooseHour} hours this month</p>

            <CircularProgressbar
    value={percentage}
    text={`${percentage}%`}
    styles={buildStyles({
        
        pathTransition: 'linear',
        pathTransitionDuration: 0.5,
        rotation: 0.5 + (1 - percentage / 100) / 2,


        // Colors
        pathColor: 'red',
        textColor: '#f88',
        trailColor: 'rgb(125,125,125)',
        backgroundColor: 'pink',
    })}
/>

                 <input type="number"  value={chooseHour} onChange={handlehourChange} />

                
            </Progress>
            </Bottom>

          

            



            </main>
           

            <button onClick={() => toPDF()}>Download PDF</button>
         
        </>
    );
};

export default Reporting;



