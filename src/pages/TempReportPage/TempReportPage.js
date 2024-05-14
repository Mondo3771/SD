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
import { fetchStorageData, setLocalStorage } from "../../helper";
import { toast } from "react-toastify";

export const TempReportPage = () => {
  const [Users, setUsers] = useState(MockUsers);
  const [Receiver, setReceiver] = useState({});
  const [AllFeedback, setAllFeedBack] = useState(MockFeedBack);
  const [firstLoad, setFirstLoad] = useState(false);
  const Emp_ID = 83;
  const PostFeedback = (feedback) => {
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: feedback.Message,
        Send_ID: feedback.Send_ID,
        Rec_ID: feedback.Receive_ID,
        Date: feedback.Date,
      }),
    });
  };

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
    const fullFeedback = fetchStorageData({ key: "Feedback" }) ?? [];
    // fullFeedback.filter(f => f.Send_ID === user.Emp_ID);
    const t = [
      ...fullFeedback.filter((f) => f.Sent_ID === user.Emp_ID),
      ...fullFeedback.filter((f) => f.Receive_ID === user.Emp_ID),
    ];
    console.log(t);
    setAllFeedBack(t);
    setReceiver(user);
  };

  const handleSendFeedback = (sender, receiver, message) => {
    //create new message to be sent into the database
    // Database should give back the Message_ID
    const Message_ID = Math.random() * 1000;
    const Date = "2015-08-08";
    console.log("Sender", sender);
    console.log("Receiver", receiver);

    const feedback = {
      Message_ID: Message_ID,
      Send_ID: sender.Emp_ID,
      Receive_ID: receiver.Emp_ID,
      Send_Name: sender.Name,
      Date: Date,
      Message: message,
    };
    const storageChange = [...fetchStorageData({ key: "Feedback" }), feedback];
    setLocalStorage({ key: "Feedback", value: storageChange });
    setAllFeedBack((prev) => [feedback, ...prev]);
    toast.success(`Message successfully sent to ${receiver.Name}!`);
  };

  return (
    <Body>
      <ShowUsers Users={Users} onUserClick={handleUserClick} />
      <FeedBack
        FeedBackArray={AllFeedback}
        User={MockUser}
        Receiver={Receiver}
        onSendFeedBack={handleSendFeedback}
      />
    </Body>
  );
};
