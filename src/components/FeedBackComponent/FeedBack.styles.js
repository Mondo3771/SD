import styled from "styled-components";

export const Wrap = styled.body`
  display: flex;
  width: 900px;
  // border: 2px solid black;
  height: 100%;
  gap: 1.5rem;
`;

export const Wrapper = styled.section`
  scroll-behavior: smooth;
  display: flex;
  flex-flow: column;
  outline: 3px solid black;
  outline-offset: 3px 0 1px 0;
  border-radius: 5px;
  overflow: scroll;
  overflow-x: hidden;
  margin: 0 auto;
  padding: 12px;
  flex: 1;
  align-items: center;
  transition: 250ms ease-in-out;

  .Message:hover {
    background: gray;
    color: black;
  }
  .Green {
    border: 5px solid green;
  }

  .Green h4 {
    text-decoration: none;
  }
`;

export const SendFeedBackWrapper = styled.section`
  scroll-behavior: smooth;
  display: flex;
  flex-flow: column;
  flex: 1;
  outline: 3px solid black;
  outline-offset: 3px 0 1px 0;
  border-radius: 5px;
  margin: 0 auto;
  padding: 12px;
  transition: 250ms ease-in-out;

  .MessageInput {
    height: 75%;
    font: inherit;
    font-size: 1.5rem;
    padding: 0.5rem;
    maxlength: 9;
  }

  ::placeholder {
    color: gray;
    font-size: 2rem;
    font-style: italic;
  }

  .SaveButton {
    transition: 150ms ease-in-out;
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 1rem;
    background-color: green;
  }
  .SaveButton:hover {
    color: white;
    background-color: gray;
    // border: 2px solid white;
  }
  .SaveButton:disabled {
    color: #ccc;
    cursor: not-allowed;
    background-color: gray;
  }
`;

export const Message = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  width: 90%;
  border-radius: 10px;
  transition: 250ms ease-in-out;
  border: 5px solid black;
  padding: 3px;
  cursor: pointer;
  padding: 10px;
  cursor: pointer;
  margin: 0 0 10px 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
  }
  h4 {
    text-decoration: underline;
  }
  h2 {
    font-size: 1.5rem;
  }
`;

export const MockFeedBack = [
  {
    Message_ID: 0,
    Sent_ID: 83,
    Receive_ID: 84,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Well Done",
  },
  {
    Message_ID: 1,

    Sent_ID: 3,
    Receive_ID: 84,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Godspeed to you",
  },
  {
    Message_ID: 2,

    Sent_ID: 3,
    Receive_ID: 2,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Shut up bruv",
  },
  {
    Message_ID: 3,

    Sent_ID: 5,
    Receive_ID: 2,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Wasteman",
  },
  {
    Message_ID: 4,
    Sent_ID: 6,
    Receive_ID: 2,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "BBL Drizzy",
  },
];

export const MockUser = {
  Name: "Tapiwa",
  Surname: "Mazarura",
  Emp_ID: 83,
  Department: "Home Affairs",
  Emp_type:"Manager"
};
