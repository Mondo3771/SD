import styled from "styled-components";

export const Wrap = styled.body`
  //last 2 columns
  display: flex;
  //background-color: red;
  width: 100vw;
  //border: 2px solid black;
  height: 100%;
  gap: 5vh;
`;

export const Wrapper = styled.section`
  scroll-behavior: smooth;
  display: flex;
  flex-flow: column;
  outline: 2px solid white;
  outline-offset: 3px 0 1px 0;
  border-radius: 20px;
  overflow: scroll;
  overflow-x: hidden;
  margin: 0 auto;
  padding: 12px;
  flex: 1;
  align-items: center;
  transition: 250ms ease-in-out;
  width: 32vw;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid white;
  .Message {
    //background: var(--dark);
    color: black;
    border-bottom: 1px solid white;
    border-radius: 0;
  }
  .Green {
    //border: 2px solid white;
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
  outline: 2px solid white;
  outline-offset: 3px 0 1px 0;
  border-radius: 20px;
  margin: 0 auto;
  padding: 12px;
  //background-color: rgba(255, 255, 255, 0.2);
  transition: 250ms ease-in-out;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  .MessageInput {
    height: 75%;
    font: inherit;
    font-size: 1.5rem;
    padding: 0.5rem;
    maxlength: 9;
  }

  ::placeholder {
    color: gray;
    font-size: 1.5rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
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
  textarea {
    background-color: transparent;
    border-radius: 20px;
  }
`;

export const Message = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  width: 90%;
  border-radius: 10px;
  transition: 250ms ease-in-out;
  //border-bottom: 1px solid white;
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
    font-size: 1rem;
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
  Emp_type: "Manager",
};
