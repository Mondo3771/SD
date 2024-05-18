import React from 'react'
import { Header } from './StaffHeader.styles'
import logo from '../../Images/logo3.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const StaffHeader = ({employee}) => {
    const history=useHistory();
    const Lunch=()=>{
        history.push('/Lunch');
    }
    const Home=()=>{
      history.push('/Dashboard');


    }

    const Reports=()=>{
      history.push('/Reports');


    }
  return (
    <Header>
    <section className="logo" alt = "SYNERGY Logo">
      <img src={logo} width="55vw" height="55vh"></img>
      <h1>
        <a href="/" >SYNERGY</a>
      </h1>
    </section>
    <nav className="links">
      <ul>
        <li>
          <a onClick={Home}>Home</a>
        </li>
        <li>
          <a onClick={Reports}>Reports</a>
        </li>
        <li>
          <a onClick={Lunch}>Lunch</a>
        </li>
      </ul>
    </nav>
    <ArrowRightIcon width={24} />
    
   
  </Header>
    
  )
}

export default StaffHeader
