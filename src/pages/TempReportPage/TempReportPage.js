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
import { Body, Wrapper, Heading } from "./TempReportPage.styles";
import { fetchStorageData, formatDate, setLocalStorage } from "../../helper";
import { toast } from "react-toastify";
import Reporting from "../../components/Reporting/Reporting";
import Loader from "../../components/Loader/Loader";

import StaffHeader from "../../components/StaffHeader/StaffHeader";

export const TempReportPage = () => {
  // const location = useLocation();
  // const employee = location.state.params;
  setLocalStorage({ key: "User", value: MockUser });

  const employee = fetchStorageData({ key: "User" });

  const [Users, setUsers] = useState(MockUsers);
  const [Receiver, setReceiver] = useState({});
  const [AllFeedback, setAllFeedBack] = useState(MockFeedBack);
  const [firstLoad, setFirstLoad] = useState(true); //change

  const [UserClicked, setuserClicked] = useState(false);
  const [ReportUser, setReportUser] = useState(null);
  const Emp_ID = employee.Emp_ID;

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
          console.log(data.data);
          setAllFeedBack(data.data);
          setLocalStorage({ key: "Feedback", value: data.data });
          setFirstLoad(true);
          setUsers(MockUsers);
        });
    };
    // feedback();

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
  const handleSendFeedback = (sender, receiver, feedback) => {
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
    newMessage.Date = formatDate(newMessage.Date);
    const storageChange = [
      ...fetchStorageData({ key: "Feedback" }),
      newMessage,
    ];
    setLocalStorage({ key: "Feedback", value: storageChange });
    setAllFeedBack((prev) => [newMessage, ...prev]);
    toast.success(`Message successfully sent!`);

    // fetch("/api/feedback", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     Message: feedback,
    //     Sent_ID: sender.Emp_ID,
    //     Rec_ID: receiver.Emp_ID,
    //     Date: today,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     newMessage.Message_ID = data.Message_ID;
    //     newMessage.Date = formatDate(newMessage.Date)
    //     const storageChange = [
    //       ...fetchStorageData({ key: "Feedback" }),
    //       newMessage,
    //     ];
    //     setLocalStorage({ key: "Feedback", value: storageChange });
    //     setAllFeedBack((prev) => [newMessage, ...prev]);
    //     toast.success(`Message successfully sent!`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const closeReport = () => {
    setuserClicked(false);
  };

  return (
    <>
      <StaffHeader></StaffHeader>
      <>
        {firstLoad ? (
          <Wrapper>
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

            {UserClicked && MockUser.EMP_type === "Manager" ? ( //change
              <>
                <Reporting User={ReportUser}></Reporting>
                <button onClick={closeReport}>close</button>
              </>
            ) : null}
          </Wrapper>
        ) : (
          <Loader></Loader>
        )}
      </>
    </>
  );
};
