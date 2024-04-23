import React,{useState} from 'react'

import { Header,DropDown,Element } from './LandingNew.styles'

const LandingNew = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
    <Header>
        <section className='heading'>
        <img src='#'></img>
        <h1> SYNERGY</h1>

        </section>

        <section className='description'>
        <p onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          Features
        </p>
      

<p onMouseEnter={() => setIsAboutOpen(true)} onMouseLeave={() => setIsAboutOpen(false)}>
          About
        </p>
       

        </section>
        
             
    
    </Header>
    {isDropdownOpen && (
    <DropDown>
        <Element>
            <img src='#'></img>
            <p>
                jnfkjenfl
            </p>

        </Element>
        <Element>
            <img src='#'></img>
            <p>
                jnfkjenfl
            </p>

        </Element>
        <Element>
            <img src='#'></img>
            <p>
                jnfkjenfl
            </p>

        </Element>
        <Element>
            <img src='#'></img>
            <p>
                jnfkjenfl
            </p>

        </Element>
              

    </DropDown>

  
  )}
     {isAboutOpen && (
        <DropDown>
                Hello
        </DropDown>
      
  )}

    
    </>

    
  )
}

export default LandingNew
