// Importing necessary libraries and components
import React, { useState } from "react";
import { Message, Wrapper, Wrap, SendFeedBackWrapper } from "./FeedBack.styles"; // Styled components
import { CheckBadgeIcon } from "@heroicons/react/24/outline"; // Check badge icon from Heroicons
import { formatDate } from "../../helper"; // Helper function to format date

// FeedBack component definition
export const FeedBack = ({ FeedBackArray, User, Receiver, onSendFeedBack }) => {
  // State variables for the input message and a flag to track changes
  const [InputMessage, setInputMessage] = useState("");
  const [changed, setChanged] = useState(false);

  // Handler for changes in the input message
  const handleInputMessageChange = (event) => {
    // If the input message is empty, set the changed flag to false
    if (event.target.value.length === 0) {
      setChanged(false);
    }
    // Otherwise, set the changed flag to true
    else {
      setChanged(true);
    }
    // Update the input message
    setInputMessage(event.target.value);
  };

  // Rendering the component
  return (
    <Wrap>
      <Wrapper>
        {/* Mapping over the FeedBackArray and creating a Message component for each feedback */}
        {FeedBackArray.map((p) => {
          // If the feedback was not sent by the current user
          if (p.Sent_ID !== User.Emp_ID) {
            return (
              <Message key={p.Message_ID} className="Message">
                <h4>{p.Send_Name}</h4>
                <h2>{p.Message}</h2>
                <p>{formatDate(p.Date)}</p>
              </Message>
            );
          }
          // If the feedback was sent by the current user
          else {
            return (
              <Message key={p.Message_ID} className="Message Green">
                <h4>You</h4>
                <h2>{p.Message}</h2>
                <p>{formatDate(p.Date)}</p>
              </Message>
            );
          }
        })}
      </Wrapper>
      <SendFeedBackWrapper className="SendFeebackSection">
        {/* Textarea for the input message */}
        <textarea
          aria-label="Imput field"
          maxLength="250"
          className="MessageInput"
          type="text"
          placeholder="Please enter feedback"
          value={InputMessage}
          onChange={handleInputMessageChange}
        ></textarea>
        {/* Label showing the number of characters left */}
        <label>Characters left: {250 - InputMessage.length}</label>
        {/* Button to save the feedback */}
        <button
          aria-label="Save button"
          disabled={!changed}
          className="SaveButton"
          onClick={() => {
            // On click, send the feedback, reset the changed flag and the input message
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
