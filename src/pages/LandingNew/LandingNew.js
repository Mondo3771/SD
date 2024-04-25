import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Index from '../../routes/Index';

import { Header,DropDown,Element } from './LandingNew.styles'


import Loader from '../../components/Loader/Loader';
const LandingNew = () => {
  const history = useHistory();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [Loaded, setLoaded] = useState(false);//to perfrom login()

  const [loading,setLoading]=useState(false);//for Loader
  const [data, setData] = useState("");

  const childToParent = (childdata) => {
    setData(childdata);
    setLoaded(true);
  };

  useEffect(() => {
    if (data) {
      setLoading(true)
      login();
    }
  }, [data]);

  const login = () => {
    fetch(`/api/login?Email=${data.email}&Token=${data.sub}`)
      .then((response) => response.json())
      .then((DB) => {
        console.log("Success:", DB.message);
        if(DB.message==='No user found'){
          const get = () =>
          fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Department: null,
              EMP_type: "Staff",
              Email: data.email,
              Name: data.given_name,
              Surname: data.family_name,
              Token: data.sub,
            }),
          })
            .then((response) => response.json())
            .then((DB) => {
              console.log("Success:", DB);
              setLoaded(true);
              history.push(`/DashBoard`, { params: DB.data });
            })
            .catch((error) => {
              console.error("Error:", error);
            });
            get();







        }
        else{
          if (DB.data.EMP_type === "HR") {
            history.push(`/HRhome`, { params: DB.data });
          } else {
            history.push(`/DashBoard`, { params: DB.data });
          }

        }
         
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(()=>{
        setLoading(false);

      });
  };

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
      {loading && <Loader />}
      {isDropdownOpen && (
        <DropDown>
          <Element>
            <img src='#'></img>
            <p>jnfkjenfl</p>
          </Element>
          {/* Add more Elements as needed */}
        </DropDown>
      )}
      {isAboutOpen && <DropDown>Hello</DropDown>}
      <Index child={childToParent} />
    </>
  );
};

export default LandingNew;
