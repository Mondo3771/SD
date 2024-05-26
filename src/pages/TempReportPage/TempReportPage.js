// react imports
import React, { useEffect,useState } from "react";

//components
import { ShowUsers } from "../../components/ShowUsers/ShowUsers";
import { FeedBack } from "../../components/FeedBackComponent/FeedBack";
import Reporting from "../../components/Reporting/Reporting";
import Loader from "../../components/Loader/Loader";
import StaffHeader from "../../components/StaffHeader/StaffHeader";

// styles
import { Body, Wrapper, Heading } from "./TempReportPage.styles";

//helpers
import { fetchStorageData, formatDate, setLocalStorage } from "../../helper";

//toasts
import { toast } from "react-toastify";


export const TempReportPage = () => {
  // const location = useLocation();

  //fetch the user information from local storage
  const employee = fetchStorageData({ key: "User" });

  //initialize the variables/states
  const [Users, setUsers] = useState([]);
  const [Receiver, setReceiver] = useState({});
  const [AllFeedback, setAllFeedBack] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true); //change

  const [UserClicked, setuserClicked] = useState(false);
  const [ReportUser, setReportUser] = useState(null);

  // storing the employee id in a separate const variable
  const Emp_ID = employee.Emp_ID;

  // A fetch function that does a get and fetches all the feedback sent by and sent to the employee 
  // on the page
  // This function set the feedback array to the result of the fetch function and stores the feedback
  //  in local storage
  const feedback = () => {
    fetch(`/api/feedback?Emp_ID=${Emp_ID}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Message);
        // While getting feedback, also fetch the Users/Employees
        get();
        setAllFeedBack(data.data);
        setLocalStorage({ key: "Feedback", value: data.data });
        // the first load is set to true to display compononents after data has been fetched
        setFirstLoad(true);
      });
  };

  // The get function is a fetch theat gets all the employees form the database, stored in local storage
  //  and the Users array  to populate thew showUsers component 
  const get = () => {
    fetch(`/api/AllEmployees`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Message);
        const mainUser = fetchStorageData({ key: "User" });
        // Filter the Users array  to only allow the user to see and interact with people in their department
        const arr = data.data.filter(
          (p) => p.Department === mainUser.Department
        );
        setUsers(arr);
      })
      .catch();
  };

  useEffect(() => {

    // At the start of the page rendering all fetches and stores are done and rendering 
    // only happens after all the after the fetches and stores
    feedback();
  }, []);

  // This function is what happens whe a user is clicked from the SHowUsers component,
  // Given a user it sets the recipient to be the user, and if the user is a manager, display 
  // the users report and filter the feedback messaages by the user clicked
  const handleUserClick = (user) => {
    console.log(user, "user");
    setuserClicked(true);
    setReportUser(user);
    const fullFeedback = fetchStorageData({ key: "Feedback" }) ?? [];

    // filter feedback by the user clicked in the showUsers component
    const t = fullFeedback.filter(
      (f) => f.Sent_ID === user.Emp_ID || f.Receive_ID === user.Emp_ID
    );

    // this sets the allfeedback array to the filter version and re-renders the feedback component
    setAllFeedBack(t);
    setReceiver(user);
  };

  // this function sends a feedback message to the database

  const handleSendFeedback = (sender, receiver, feedback) => {
    // Formatting todays date
    const today = new Date().toISOString().slice(0, 10);

    // create the new message which will be added to the allfeedback array to appear on the front-end
    const newMessage = {
      Message: feedback,
      Sent_ID: sender.Emp_ID,
      Receive_ID: receiver.Emp_ID,
      Date: today,
      // the Message_ID is changed to any random number boefore getting its actual value in the post method
      Message_ID: Math.random() * 1000,
    };

    newMessage.Date = formatDate(newMessage.Date);

    // POST method that sends the new message to the database
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: feedback,
        Send_ID: sender.Emp_ID,
        Rec_ID: receiver.Emp_ID,
        Date: today,
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        newMessage.Message_ID = data.Message_ID;
        newMessage.Date = formatDate(newMessage.Date);
        const storageChange = [
          ...fetchStorageData({ key: "Feedback" }),
          newMessage,
        ];
        // Update local storage to add the new feedback message and allfeedback array
        setLocalStorage({ key: "Feedback", value: storageChange });
        setAllFeedBack((prev) => [newMessage, ...prev]);
        
        // Message of success
        toast.success(`Message successfully sent!`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // If the main User on the page is a manager this function will be called to close a report
  // component for a selected user in the ShowUsers component.
  const closeReport = () => {
    setuserClicked(false);
  };

  return (
    <>
      <StaffHeader></StaffHeader>
      <Wrapper>
        {firstLoad ? (
          <>
            <Reporting User={employee}></Reporting>
            {console.log(employee)}
            <Heading>
              <h2>Feedback</h2>
            </Heading>
            <Body>
              <ShowUsers Users={Users} onUserClick={handleUserClick} />
              <FeedBack
                FeedBackArray={AllFeedback}
                User={employee}
                Receiver={Receiver}
                onSendFeedBack={handleSendFeedback}
              />
            </Body>
            {UserClicked && employee.EMP_type === "Manager" ? ( //change
              <>
                <Reporting User={ReportUser}></Reporting>
                <button onClick={closeReport}>close</button>
              </>
            ) : null}
          </>
        ) : (
          <Loader></Loader>
        )}
      </Wrapper>
    </>
  );
};
