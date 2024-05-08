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

  useEffect(() => {
    // Get All the info you need on this page once (AllFeedback,AllUsers)
    // Get from storage
    setLocalStorage({ key: "Users", value: MockUsers });
    setLocalStorage({ key: "Feedback", value: MockFeedBack });
    setReceiver(MockUsers[2]);
    setUsers(MockUsers);
    setAllFeedBack(MockFeedBack);
    setFirstLoad(true);
  }, []);

  const handleUserClick = (user) => {
    // Filter allfeedback users
    const fullFeedback = fetchStorageData({ key: "Feedback" }) ?? [];
    // console.log(fullFeedback.filter);
    // fullFeedback.filter(f => f.Send_ID === user.Emp_ID);
    setAllFeedBack(fullFeedback.filter((f) => f.Receive_ID === user.Emp_ID));
    setReceiver(user);
  };

  const handleSendFeedback = (sender, receiver, message) => {
    //create new message to be sent into the database
    // Database should give back the Message_ID
    const Message_ID = Math.random()*1000;
    const Date = "2015-08-08";
    console.log("Sender",sender);
    console.log("Receiver",receiver);


    const feedback = {
      Message_ID: Message_ID,
      Send_ID: sender.Emp_ID,
      Receive_ID: receiver.Emp_ID,
      Send_Name: sender.Name,
      Date: Date,
      Message: message,
    };
    const storageChange = [...fetchStorageData({key: "Feedback"}),feedback];
    setLocalStorage({key: "Feedback",value: storageChange})
    setAllFeedBack(prev =>  [feedback,...prev]);
    toast.success(`Message successfully sent to ${receiver.Name}!`)

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
