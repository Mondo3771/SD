import React, { useEffect } from "react";

import { ShowUsers } from "../../components/ShowUsers/ShowUsers";
import { MockUsers } from "../../components/ShowUsers/ShowUsers.styles";
import { FeedBack } from "../../components/FeedBackComponent/FeedBack";
import {
  MockFeedBack,
  MockUser,
} from "../../components/FeedBackComponent/FeedBack.styles";
import { useState } from "react";
import { Body } from "./TempReportPage.styles";
import { fetchStorageData, formatDate, setLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import Reporting from "../../components/Reporting/Reporting";
import Loader from "../../components/Loader/Loader";

export const TempReportPage = () => {
  const [Users, setUsers] = useState(MockUsers);
  const [Receiver, setReceiver] = useState({});
  const [AllFeedback, setAllFeedBack] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);

  const[ UserClicked,setuserClicked]=useState(false);
  const[ReportUser,setReportUser]=useState(null);
  const Emp_ID = 83;

  

  useEffect(() => {
    // Get All the info you need on this page once (AllFeedback,AllUsers)
    // Get from storage
    setLocalStorage({ key: "Users", value: MockUsers });

    const feedback = () => {
      fetch(`/api/feedback?Emp_ID=${Emp_ID}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setAllFeedBack(data.data);
          setLocalStorage({ key: "Feedback", value: data.data });
          setFirstLoad(true);
          setUsers(MockUsers);
        });
    };
    feedback();

    // setReceiver(MockUsers[2]);
  }, []);

  const handleUserClick = (user) => {
    // Filter allfeedback users
    console.log(user,'user');
    setuserClicked(true);
    setReportUser(user);
    const fullFeedback = fetchStorageData({ key: "Feedback" }) ?? [];
    // fullFeedback.filter(f => f.Send_ID === user.Emp_ID);
    const t =
      fullFeedback.filter((f) => f.Sent_ID === user.Emp_ID || f.Receive_ID === user.Emp_ID);
    console.log(t);
    setAllFeedBack(t);
    setReceiver(user);
  };

  const handleSendFeedback = (sender,receiver, feedback) => {
    console.log("Sender", sender);
    console.log("Receiver", receiver);
    const today = new Date().toISOString().slice(0, 10);
    const newMessage = {
      Message: feedback,
      Sent_ID: sender.Emp_ID,
      Receive_ID: receiver.Emp_ID,
      Date: today ,
      Message_ID: Math.random() * 1000,
    }

    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: feedback,
        Sent_ID: sender.Emp_ID,
        Rec_ID: receiver.Emp_ID,
        Date: today,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        newMessage.Message_ID = data.Message_ID;
        newMessage.Date = formatDate(newMessage.Date)
        const storageChange = [
          ...fetchStorageData({ key: "Feedback" }),
          newMessage,
        ];
        setLocalStorage({ key: "Feedback", value: storageChange });
        setAllFeedBack((prev) => [newMessage, ...prev]);
        toast.success(`Message successfully sent!`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeReport=()=>{
    setuserClicked(false);
  }

  return (
    <>
    {firstLoad ? (
      
      <>
         <Reporting User={MockUser}></Reporting>
      <Body>
       
            <ShowUsers Users={Users} onUserClick={handleUserClick} />
            <FeedBack
              FeedBackArray={AllFeedback}
              User={MockUser}
              Receiver={Receiver}
              onSendFeedBack={handleSendFeedback}
            />

            
          
       
      </Body>
      {UserClicked && MockUser.Emp_type==='Manager'?
      <>

            <Reporting User={ReportUser}>

            </Reporting>
            <button onClick={closeReport}>
              close
            </button>

        </>    
          :
          null
          
          }
      </>
      
   

    
      ):<Loader></Loader>}
    
    </>
     

  );
};
