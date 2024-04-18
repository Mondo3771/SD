// export default LandingPage;
import React, { useEffect, useState } from "react";
import Index from "../../routes/Index";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import {
  InputContainer,
  Wrapper,
  Card,
  LandingPageContainer,
} from "./LandingPage.styles";

const LandingPage = () => {
  const history = useHistory();

  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [first, setFirst] = useState(false);
  const [Loaded, setLoaded] = useState(false);

  const handleLogin = () => {
    setLogin((prevLogin) => !prevLogin);
    setSignup(false);
    setFirst(true);
  };

  const handleSignup = () => {
    setSignup((prevSignup) => !prevSignup);
    setLogin(false);
    setFirst(true);
  };

  const [Department, setDepartment] = useState("");
  const [EmpType, setEmpType] = useState("");

  const depChange = (event) => {
    setDepartment(event.target.value);
  };

  const typeChange = (event) => {
    setEmpType(event.target.value);
  };

  const [data, setData] = useState("");
  const childToParent = (childdata) => {
    setData(childdata);
  };

  const [Error, setError] = useState("Create Account");
  const [logError, setlogError] = useState("Log in with your Google account");
  const [DBsign, setDBsign] = useState({}); // What goes into the databse
  const [DBlog, setDBlog] = useState({}); // querying database wiht email and name

  const sign = () => {
    if (!Department) {
      return setError("Enter All Fields");
    } else if (!data.email) {
      return setError("Select Account");
    } else if (!data.email_verified) {
      return setError("Unverified a Account");
    } else {
      setError("Loading");
      setDBsign({
        Department: Department,
        employeeType: EmpType,
        email: data.email,
        Name: data.given_name,
        Surname: data.family_name,
      });
      // FETCH POST REQUEST TO DATABASE USE LOG
      // console.log(data);
      const get = () =>
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Department: Department,
            employeeType: "Staff",
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

            history.push(`/DashBoard`, { params: DB });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      get();
    }
    // console.log(DBsign);
  };

  const [Email, setEmail] = useState("no");
  const [type, settype] = useState("unknown");
  useEffect(() => {
    // Function to update email every second
    const updateEmail = () => {
      setEmail(data.email);
      settype(data.EMP_type);
    };

    // Call updateEmail initially and then every second
    updateEmail(); // Call initially
    const intervalId = setInterval(updateEmail, 1000); // Call every second

    // Clean up the interval when the component unmounts or when data.email changes
    return () => clearInterval(intervalId);
  }, [data.email]);
  // console.log(DBlog);

  const log = () => {
    // setEmail(data.email);

    if (!data.email) {
      return setlogError("Select Account");
    } else if (!data.email_verified) {
      return setlogError("Unverified a Account");
    } else {
      setlogError("Loading!");
      setDBlog({
        email: data.email,
        Name: data.given_name,
      });

      const login = () =>
        fetch(`/api/login?email=${data.email}&token=${data.sub}`)
          .then((response) => response.json())
          .then((DB) => {
            console.log("Success:", DB);
            setLoaded(true);

            if (DB[0].EMP_type === "HR") {
              history.push(`/HRhome`, { params: DB[0] });
            } else {
              history.push(`/DashBoard`, { params: DB[0] });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            setlogError("No user found");
          });
      // console.log(DBlog);

      login();
    }
  };

  // useEffect(() => {
  //   if (Loaded) {
  //     window.location.href = '/Fake'; // Navigate to the new page
  //   }
  // }, [Loaded]);

  return (
    <>
      <LandingPageContainer>
        <Wrapper>
          <Card>
            <section className="top">
              <img src={require("./logo.png")} alt="Logo" />
              <h1>SYNERGY</h1>
            </section>
            <section className="bottom">
              {login ? (
                <>
                  <article className="secLog">
                    <h2>{logError}</h2>
                    {first ? <Index child={childToParent} /> : null}
                    {/* <button className="log" onClick={log}>
                      Login
                    </button> */}
                    {Loaded ? (
                      <Link to="/Fake">
                        <button className="log">Login</button>
                      </Link>
                    ) : (
                      <button className="log" onClick={log}>
                        Login
                      </button>
                    )}
                  </article>
                  <button className="login" onClick={handleSignup}>
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button className="login" onClick={handleLogin}>
                    Login
                  </button>{" "}
                  <article className="secSign">
                    <h2>{Error}</h2>
                    <InputContainer>
                      <img src={require("./profile.png")}></img>
                      <input
                        type="text"
                        placeholder="Department"
                        value={Department}
                        onChange={depChange}
                      />
                    </InputContainer>
                    {/* <InputContainer>
                      <img src={require("./profile.png")}></img>
                      <input type='text' placeholder='Employee Type' value={EmpType} onChange={typeChange} />
                      <select
                        value={EmpType}
                        onChange={typeChange}
                        placeholder="Employee type"
                      >
                        <option value="" disabled hidden>
                          Select Employee Type
                        </option>

                        <option value="Staff">Staff</option>
                        <option value="Manager">Manager</option>
                        <option value="HR">HR</option>
                      </select>
                    </InputContainer> */}
                    <Index child={childToParent} />

                    {/* <button className="sign" onClick={sign}>
                      Sign Up
                    </button> */}

                    {Loaded ? (
                      <Link to="/FakeHomePage">
                        <button className="sign">Sign Up</button>
                      </Link>
                    ) : (
                      <button className="sign" onClick={sign}>
                        Sign Up
                      </button>
                    )}
                  </article>
                </>
              )}
            </section>
          </Card>
        </Wrapper>
      </LandingPageContainer>{" "}
    </>
  );
};
export default LandingPage;
