import React, { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

import { ShowUsers } from "../../components/ShowUsers/ShowUsers";
import { MockUsers } from "../../components/ShowUsers/ShowUsers.styles";
import { FeedBack } from "../../components/FeedBackComponent/FeedBack";
import {
  MockFeedBack,
  MockUser,
} from "../../components/FeedBackComponent/FeedBack.styles";
import { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Body,UserReport } from "./TempReportPage.styles";
import { fetchStorageData, formatDate, setLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import Reporting from "../../components/Reporting/Reporting";
import Loader from "../../components/Loader/Loader";

import StaffHeader from "../../components/StaffHeader/StaffHeader";



export const TempReportPage = () => {
  const location = useLocation();

  const employee=fetchStorageData({key:"User"})

  const [Users, setUsers] = useState(MockUsers);
  const [Receiver, setReceiver] = useState({});
  const [AllFeedback, setAllFeedBack] = useState(MockFeedBack);
  const [firstLoad, setFirstLoad] = useState(true); //change

  const [UserClicked, setuserClicked] = useState(false);
  const [ReportUser, setReportUser] = useState(null);
  const Emp_ID = employee.Emp_ID;

  const get = () => {
    fetch(`/api/AllEmployees`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        const mainUser = fetchStorageData({ key: "User" });
        const arr = data.data.filter(
          (p) => p.Department === mainUser.Department
        );
        setUsers(arr);
      })
      .catch();
  };

  useEffect(() => {
    // Get All the info you need on this page once (AllFeedback,AllUsers)
    // Get from storage
    setLocalStorage({ key: "Users", value: MockUsers });
    setFirstLoad(true);
    setAllFeedBack(MockFeedBack);
    setLocalStorage({ key: "Feedback", value: MockFeedBack });

    const feedback = () => {
      fetch(`/api/feedback?Emp_ID=${Emp_ID}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.data);
          get();
          setAllFeedBack(data.data);
          setLocalStorage({ key: "Feedback", value: data.data });
          setFirstLoad(true);
        });
    };
    feedback();

    // setReceiver(MockUsers[2]);
  }, []);

  const handleUserClick = (user) => {
    // Filter allfeedback users
    console.log(user, "user");
    setuserClicked(true);
    setReportUser(user);
    const fullFeedback = fetchStorageData({ key: "Feedback" }) ?? [];
    // fullFeedback.filter(f => f.Send_ID === user.Emp_ID);
    const t = fullFeedback.filter(
      (f) => f.Sent_ID === user.Emp_ID || f.Receive_ID === user.Emp_ID
    );
    console.log(t);
    setAllFeedBack(t);
    setReceiver(user);
  };
  const handleSendFeedback = (sender,  receiver, feedback) => {
    console.log("Sender", sender);
    console.log("Receiver", receiver);
    const today = new Date().toISOString().slice(0, 10);
    const newMessage = {
      Message: feedback,
      Sent_ID: sender.Emp_ID,
      Receive_ID: receiver.Emp_ID,
      Date: today,
      Message_ID: Math.random() * 1000,
    };

    // newMessage.Message_ID = data.Message_ID;
    newMessage.Date = formatDate(newMessage.Date);;
    const storageChange = [
      ...fetchStorageData({ key: "Feedback" }),
      newMessage,
    ];
    setLocalStorage({ key: "Feedback", value: storageChange });
    setAllFeedBack((prev) => [newMessage, ...prev]);
    toast.success(`Message successfully sent!`);

  };

  const closeReport = () => {
    setuserClicked(false);
  };

  return (
    <>
      <StaffHeader></StaffHeader>
      {firstLoad ? (
        <>
          <Reporting User={employee}></Reporting>
          {console.log(employee)}
          <Body>
            <ShowUsers Users={Users} onUserClick={handleUserClick} />
            <FeedBack
              FeedBackArray={AllFeedback}
              User={employee}
              Receiver={Receiver}
              onSendFeedBack={handleSendFeedback}
            />
          </Body>
          {UserClicked && employee.EMP_type === "Manager" ? (
            <>
            {/* {toast.success("Scroll below to see their report")} */}
              <UserReport>
              <button className="close" onClick={closeReport}>    
                <XMarkIcon width="24" height="24" />
              </button>

              <Reporting User={ReportUser}></Reporting>

              </UserReport>
              
            </>
          ) : null}
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};
