import React, { useState } from "react";

//styles file
import { Message, Wrapper, Wrap, SendFeedBackWrapper } from "./FeedBack.styles";

//
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
export const FeedBack = ({ FeedBackArray, User, Receiver, onSendFeedBack }) => {
  const [InputMessage, setInputMessage] = useState("");
  const [changed, setChanged] = useState(false);

  console.log(FeedBackArray);

  const handleInputMessageChange = (event) => {
    if (event.target.value.length === 0) {
      setChanged(false);
    } else {
      setChanged(true);
    }
    setInputMessage(event.target.value);
  };

  return (
    <Wrap>
      <Wrapper>
        {
          FeedBackArray.map((p) => {
            if (p.Sent_ID !== User.Emp_ID) {
              return (
                <Message key={p.Message_ID} className="Message">
                  {/* <h4>{p.Send_Name}</h4> */}
                  <h2>{p.Message}</h2>
                  <p>{p.Date}</p>
                </Message>
              );
            } else {
              return (
                <Message key={p.Message_ID} className="Message Green">
                  {/* <h4>{p.Send_Name}</h4> */}
                  <h2>{p.Message}</h2>
                  <p>{p.Date}</p>
                </Message>
              );
            }
          })}
      </Wrapper>
      <SendFeedBackWrapper className="SendFeebackSection">
        <textarea
          maxLength="250"
          className="MessageInput"
          type="text"
          placeholder="Please enter feedback"
          value={InputMessage}
          onChange={handleInputMessageChange}
        ></textarea>
        <label>Characters left: {250 - InputMessage.length}</label>
        <button
          disabled={!changed}
          className="SaveButton"
          onClick={() => {
            onSendFeedBack(User, Receiver, InputMessage);
            setChanged(false);
            setInputMessage("");
          }}
        >
          <CheckBadgeIcon width={24} /> Save
        </button>
      </SendFeedBackWrapper>
    </Wrap>
  );
};
