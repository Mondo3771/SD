import styled from "styled-components";

export const Wrapper = styled.div`
  scroll-behavior: smooth;
  display: flex;
  flex-flow: column;
  width: 500px;
  outline: 3px solid gray;
  outline-offset: 3px 0 1px 0;
  border-radius: 5px;
  overflow: scroll;
  overflow-x: hidden;
  padding: 1rem 0;

  align-items: center;

  .ProfileImage {
    width: 60px;
    height: 60px;
  }

  .User:hover {
    background: gray;
    color: white;
  }
`;

export const User = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  width: 90%;
  border-radius: 10px;
  transition: 250ms ease-in-out;
  padding: 5px;
  cursor: pointer;
  padding: 10px;
  cursor: pointer;
  margin: 0 0 10px 0;
`;

export const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;

  // border: 1px solid black;

  flex: 1;
  padding: 0 1.5rem;

  h2,
  h3,
  p {
    margin: 0;
  }
`;

export const MockUsers = [
  {
    Emp_ID: 84,
    Name: "Tapiwa",
    Surname: "Mazarura",
    Department: "Finance",
    EMP_Type: "Staff",
  },
  {
    Emp_ID: 84,
    Name: "Candace",
    Surname: "Flinn",
    Department: "Animation",
    EMP_Type: "Manager",
  },
  {
    Emp_ID: 3,
    Name: "Candace",
    Surname: "Flinn",
    Department: "Animation",
    EMP_Type: "Manager",
  },
  {
    Emp_ID: 4,
    Name: "Candace",
    Surname: "Flinn",
    Department: "Animation",
    EMP_Type: "Manager",
  },
  {
    Emp_ID: 5,
    Name: "Candace",
    Surname: "Flinn",
    Department: "Animation",
    EMP_Type: "Manager",
  },
];
