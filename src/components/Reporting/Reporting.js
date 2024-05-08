import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { usePDF } from 'react-to-pdf';

import { Feedback,Main, Summary ,Block} from './Reporting.styles';

const mockGraph = [
    {
        Project: "Standard bank App",
        Time: 234409, //this is in seconds
        Date: '2024-04-02 00:00:00.000'
    },
    {
        Project: "Finance Management System",
        Time: 187602,
        Date: '2024-04-04 00:00:00.000'
    },
    {
        Project: "E-commerce Platform",
        Time: 291754,
        Date: '2024-04-07 00:00:00.000'
    },
    {
        Project: "Standard bank App",
        Time: 1823,
        Date: '2024-04-09 00:00:00.000'
    },
    {
        Project: "Healthcare Management App",
        Time: 219301,
        Date: '2024-04-12 00:00:00.000'
    },
    {
        Project: "Standard bank App",
        Time: 409,
        Date: '2024-04-14 00:00:00.000'
    },
    {
        Project: "Online Learning Platform",
        Time: 245830,
        Date: '2024-04-17 00:00:00.000'
    },
    {
        Project: "Standard bank App",
        Time: 173509,
        Date: '2024-04-19 00:00:00.000'
    },
    {
        Project: "Inventory Management System",
        Time: 196845,
        Date: '2024-04-22 00:00:00.000'
    },
    {
        Project: "Standard bank App",
        Time: 2173,
        Date: '2024-04-24 00:00:00.000'
    },
    {
        Project: "HR Management Software",
        Time: 183729,
        Date: '2024-04-27 00:00:00.000'
    },
    {
        Project: "Standard bank App",
        Time: 2501,
        Date: '2024-04-29 00:00:00.000'
    },
    {
        Project: "Standard bank App",
        Time: 25602,
        Date: '2024-04-06 00:00:00.000'
    },
    {
        Project: "Data Analysis Platform",
        Time: 176804,
        Date: '2024-04-11 00:00:00.000'
    },
    {
        Project: "Project Management Tool",
        Time: 229013,
        Date: '2024-04-16 00:00:00.000'
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
        date: '2024-04-21 00:00:00.000'
    },
    {
        Name: "Daniel",
        Comment: "Fantastic job on this task!",
        date: '2024-04-24 00:00:00.000'
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




const Reporting = () => {
    const [Projects, setProjects] = useState(new Set());
    const [projectTimeMap, setProjectTimeMap] = useState({});
    const [hours, setHours] = useState(null);
    const[feedback,setfeedback]=useState(null);

//use effect for get timeSheets

//use effect fro get feedback
// useEffect(() => {
//     setfeedback(mockFeed);
    
// }, []);



    useEffect(() => {
        const projectMap = {};
        mockGraph.forEach(task => {
            if (!projectMap[task.Project]) {
                projectMap[task.Project] = 0;
            }
            projectMap[task.Project] += task.Time;
        });
        setProjects(new Set(Object.keys(projectMap)));
        setProjectTimeMap(projectMap);
    }, []);


    const data = Object.keys(projectTimeMap).map(project => ({
        x: [project],
        y: [projectTimeMap[project] / 3600], // Convert seconds to hours
        type: 'bar',
        marker: { color: 'purple' },
    }));

    // Layout options for the plot
    const layout = {
        title: 'Time Spent on Tasks by Project',
        xaxis: { title: 'Projects' },
        yaxis: { title: 'Time Spent (hours)' },
        showlegend:false
    };

    const { toPDF, targetRef } = usePDF({ filename: 'report.pdf' });

    useEffect(() => {
        // Sort comments by name
        let sortedFeedback = [...mockFeed].sort((a, b) => a.Name.localeCompare(b.Name));
        sortedFeedback = [...mockFeed].sort((a, b) => new Date(a.date) - new Date(b.date));
        setfeedback(sortedFeedback);
    }, []);
    

    return (
        <>
         
            <main ref={targetRef}>
            <h2>My report</h2>
           

            <Main  >
                <Plot
                    data={data}
                    layout={layout}
                    style={{ width: '60%', height: '100%',margin:'40px' }}
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
            <Summary><h2>NONOO</h2></Summary>

            </main>
           

            <button onClick={() => toPDF()}>Download PDF</button>
         
        </>
    );
};

export default Reporting;
