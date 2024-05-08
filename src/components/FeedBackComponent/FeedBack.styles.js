import styled from "styled-components";

export const Wrap = styled.body`
  display: flex;
  padding: 1rem;
  width: 950px;
  margin: auto;
  border: 2px solid black;
  gap: 1rem;
`;

export const Wrapper = styled.section`
  scroll-behavior: smooth;
  display: flex;
  flex-flow: column;
  width: 500px;
  outline: 3px solid black;
  outline-offset: 5px;
  border-radius: 5px;
  overflow: scroll;
  overflow-x: hidden;
  max-height: 400px;
  margin: 0 auto;
  padding: 12px;
  flex: 0.5;
  align-items: center;
  transition: 250ms ease-in-out;

  .Message:hover {
    background: gray;
    color: black;
  }
`;

export const SendFeedBackWrapper = styled.section`
  scroll-behavior: smooth;
  display: flex;
  flex-flow: column;
  width: 500px;
  outline: 3px solid black;
  outline-offset: 5px;
  border-radius: 5px;
  max-height: 400px;
  margin: 0 auto;
  padding: 12px;
  flex: 0.5;
  transition: 250ms ease-in-out;

  .MessageInput{
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
    background-color:
  }
  .SaveButton:hover {
    color: white;
    background-color: var(--dark);
    border: 2px solid white;
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
    Sent_ID: 1,
    Receive_ID: 2,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Well Done",
  },
  {
    Sent_ID: 3,
    Receive_ID: 2,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Godspeed to you",
  },
  {
    Sent_ID: 3,
    Receive_ID: 2,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Shut up bruv",
  },
  {
    Sent_ID: 5,
    Receive_ID: 2,
    Send_Name: "Dmitry",
    Date: "2015-08-08",
    Message: "Wasteman",
  },
  {
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
  Emp_ID: 2,
  Department: "Home Affairs",
};
