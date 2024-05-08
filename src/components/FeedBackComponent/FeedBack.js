import React, { useState } from "react";

//styles file
import { Message, Wrapper, Wrap, SendFeedBackWrapper } from "./FeedBack.styles";

//
import {
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

// parameters: feebackArray is an array of all the feedback in the database filtered for a person who was clicked
//              on on the showUsers component
//              User is the user who is on the page (Determines Manager/Staff)
export const FeedBack = ({ FeedBackArray, User }) => {
  const [InputMessage, setInputMessage] = useState("");

  const handleInputMessageChange = (event) => {
    console.log(event);
    setInputMessage(event.target.value);
  };

  return (
    <Wrap>
      <Wrapper>
        {FeedBackArray.map((p) => (
          <Message className="Message">
            {/* <h4>{p.Send_Name}</h4> */}
            <h2>{p.Message}</h2>
            <p>{p.Date}</p>
          </Message>
        ))}
      </Wrapper>
      <SendFeedBackWrapper className="SendFeebackSection">
        <textarea
          maxLength="250"
          className="MessageInput"
          type="text"
          placeholder="Please enter feedback"
          onChange={handleInputMessageChange}
        ></textarea>
        <label>Characters left: {250-InputMessage.length}</label>
        <button className="SaveButton"><CheckBadgeIcon width={24}/> Save</button>
      </SendFeedBackWrapper>
    </Wrap>
  );
};
