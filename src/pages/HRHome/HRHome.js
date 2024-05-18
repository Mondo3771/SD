import React from "react";
import HRdatagrid from "../../components/HRdatagrid/HRdatagrid";
import { Header, Wrapper, Card } from "./HRHome.styles";
import logo from "../../Images/logo3.svg";
import LoginButton from "../../components/Log/LoginButton";
import { useEffect } from "react";
import { setLocalStorage } from "../../helper";

const getMeals = () => {
  fetch("/api/CreateMeals")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        setLocalStorage({key:"Meals",value:data.data})
    })
    .catch((error) => {
      console.log(error);
    });
};

const HRHome = () => {

  useEffect(() =>{
    getMeals();
  },[])
 
  
  return (
    <>
      <Wrapper>
        <Header>
          <section className="logo">
            <img src={logo} width="55vw" height="55vh"></img>
            <h1>
              <a href="/">SYNERGY</a>
            </h1>
          </section>
          <nav className="links">
            <ul>
             
              <li>
                <a href="HRMeals">Meals</a>
              </li>
              <li>
                <a href="HRBookings">Bookings</a>
              </li>
              
              <li>
                <a href="HRhome">Users</a>
              </li>
            </ul>
          </nav>
        </Header>
        
          <HRdatagrid></HRdatagrid>
        <LoginButton />
      </Wrapper>
    </>
  );
};

export default HRHome;
