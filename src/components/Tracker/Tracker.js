import React, { useState, useEffect } from 'react';
import { Wrapper, Sheet ,Manual} from './Tracker.styles';

const Tracker = () => {
  const [counter, setCounter] = useState(0);
  const[taskCounter,settaskCounter]=useState(0);


  const [clicked, setClicked] = useState(false);
  const [task, setTask] = useState('');
  const [text, setText] = useState('Please Enter task');


  const [Array, setArray] = useState([]);

  //timer
  useEffect(() => {
    let interval;

    if (clicked ) {
      interval = setInterval(() => {
        setCounter(prevCounter => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(interval); // Clear the interval if not clicked
      settaskCounter(counter);
      setCounter(0);
    }

    return () => clearInterval(interval); // Cleanup function to clear the interval when component unmounts or when clicked changes
  }, [clicked]);

  //adding to databse

  const handleButtonClick = () => {
    setClicked(prevClicked => !prevClicked);
    // setFinalTask(task);

    //date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    //you would post this to the databses
    if(clicked){

        setArray(prevArray => {
            return prevArray.map((item, i) => {
              if (i === Array.length-1) {
                return { ...item, time:formatTime(counter) };
              }
              return item;
            });
          });

    }else{
        if(task===''){
            setText('Task cannot be empty')
        }
        else{
            setArray(prevArray => [
                ...prevArray,
                { project:Project ,task: task, time: "In progress", date:formattedDate}
              ]);
            setText('Please Enter task')
        }
        
    }
    
    setTask('');
  };
  

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };


  //removing from database
  const remove=(index)=>{


    setArray(prevArray => {
        const newArray = [...prevArray];
        newArray.splice(index, 1);
        return newArray;
    });
  };



  // Display items of Array
//   const renderArrayItems = () => {
//     return Array.map((item, index) => (
//       <section key={index}>
//         <Sheet>
//             <p>{item.project}</p>
//         <p>{item.task}</p>
//         <p>{item.time}</p>
//         <p>{item.date}</p>

//         <button id={index} onClick={() => remove(index)}>X</button>
//         </Sheet>
       
       
//       </section>
//     ));
//   };

const renderArrayItems = () => {
    // Get all unique projects
    const uniqueProjects = Array.reduce((projects, item) => {
      console.log(Array);
      if (!projects.includes(item.project)) {
        return [...projects, item.project];
      }
      return projects;
    }, []);
  
    // Render items for each project
    return uniqueProjects.map((project, index) => (
      <div key={index}>
        <h3>{project}</h3>
        {Array.filter(item => item.project === project).map((item, i) => (
          <section key={i}>
            <Sheet>
              <p>{item.task}</p>
              <p>{item.time}</p>
              <p>{item.date}</p>
              <button>
              Pause
               </button>
              <button onClick={() => remove(index)}>X</button>
            </Sheet>
          </section>
        ))}
      </div>
    ));
  };
  
  

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedTime, setSelectedTime] = useState('');



  const manualDate=(event)=>{
    setSelectedDate(event.target.value)
  }
  const manualTime=(event)=>{
    setSelectedTime(event.target.value)
  }
  const manualTask=(event)=>{
    setSelectedTask(event.target.value)
  }

  //adding to databse
  const manualButton=()=>{
    setArray(prevArray => [
        ...prevArray,
        { task: selectedTask, time: selectedTime+':00', date:selectedDate}
      ]);

      renderArrayItems();

    

  }

  //project setting up
  const [Project,setProject]=useState('');

  const projectChange=(event)=>{
    setProject(event.target.value);

  };

  return (
   <>
    <h1>{text} </h1>
    <Wrapper>
    <input type='text' placeholder='Project' value={Project} onChange={projectChange} />

      <input type='text' placeholder='Input task' value={task} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>
        {clicked ? 'Stop Timer' : 'Start Timer'}
      </button>
      <p>Countdown: {formatTime(counter)}</p>
      {console.log(Array)}
      {renderArrayItems()}
    </Wrapper>
    <Manual>
        <h1>Manual insertion</h1>
        <input type='text' placeholder='Task' value={selectedTask} onChange={manualTask} />
        <input type='time' placeholder='Time' value={selectedTime} onChange={manualTime} />
        <input type='date' placeholder='Date' value={selectedDate} onChange={manualDate} />
        <button onClick={manualButton}></button>



    </Manual>
    
    </>
  );
};

export default Tracker;
