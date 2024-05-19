import React, { useEffect, useState } from "react";

import {
  Card,
  CreateMealCard,
  Header,
  MealCardFin,
  ShowMealCard,
  Wrapper,
} from "./HRMeals.styles";
// import logo from "../../pages/HRHome/Images/logo3.svg";
import logo from "../../Images/logo3.svg";
import { TrashIcon } from "@heroicons/react/24/outline";
import { fetchStorageData } from "../../helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginButton from "../../components/Log/LoginButton";

const HRMeals = () => {
  const [Meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({});
  const [viewMeal, setViewMeal] = useState({});
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();


  useEffect(() => {
    const User = fetchStorageData({key:"User"}); 
    console.log(User)

    // if (!User) {
    //   // Go back to landing page
    //   history.push("/");
    //   console.log("user",User)

    // }else 
    // if(User.Emp_Type !== "HR"){
    //   // Go back to their home page depending on whether they are a staff or manager
    // }
    const getMeals = () => {
      fetch("/api/CreateMeals")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLoaded(true);
          setMeals(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMeals();
    // fetch all meals from database
  }, []);

  const [viewMealState, setViewMealState] = useState(false);

  const changeAvailable = (meal,bool) =>{
    fetch("/api/CreateMeals", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Meal_ID: meal.Meal_ID,
        Availability: bool,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setViewMeal((prev) => {
          console.log(prev);
          let temp = meal;
          temp.Availability = bool;
          console.log(temp);
          return temp;
        });
        setMeals((all) => {
          const temp = all.filter((a) => a.Meal_ID === meal.Meal_ID)[0];
          const result = all;
          temp.Availability = bool;
          const index = all.findIndex((a) => a.Meal_ID === meal.Meal_ID);
          result[index] = temp;
          console.log(result);
          return result;
        });

        console.log("Success (changeAvailable): ", data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  const mealNameChange = (event) => {
    setNewMeal((prev) => ({
      Meal_ID: prev.Meal_ID,
      Name_of_Meal: event.target.value,
      Description: prev.Description,
      Availability: prev.Available,
    }));
  };

  const availableChange = (event) => {
    setNewMeal((prev) => ({
      Meal_ID: prev.Meal_ID,
      Name_of_Meal: prev.Name_of_Meal,
      Description: prev.Description,
      Availability: event.target.checked,
    }));
  };

  const descriptionChange = (event) => {
    setNewMeal((prev) => ({
      Meal_ID: prev.Meal_ID,
      Name_of_Meal: prev.Name_of_Meal,
      Description: event.target.value,
      Availability: prev.Availability,
    }));
  };

  const mealClick = (meal) => {
    setViewMeal(meal);
    setViewMealState(true);
  };

  const createMeal = () => {
    console.log(newMeal);
    const Addmeals = () =>
      fetch("/api/CreateMeals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name_of_Meal: newMeal.Name_of_Meal,
          Availability: newMeal.Availability,
          Description: newMeal.Description,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const temp = newMeal;
          temp["Meal_ID"] = data.data.Meal_ID;
          setMeals((prev) => [temp, ...prev]);
          console.log("Success (AddMeal): ", data);
        })
        .catch((error) => {
          console.log();
        });
    Addmeals();
  };

  const changeAvailableViewMeal = (event) => {
    changeAvailable(viewMeal,event.target.checked);
  };

  const deleteMeal = () => {
    console.log(viewMeal);
    const deleteMeals = () =>
      fetch("/api/CreateMeals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Meal_ID: viewMeal.Meal_ID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success (Delete): ", data);
          console.log(viewMeal);
          setMeals((prev) =>
            prev.filter((p) => p.Meal_ID !== viewMeal.Meal_ID)
          );
          setViewMeal({});
          setViewMealState(false);
        })
        .catch((error) => {
          console.log("Error (Delete): ", error);
        });
    deleteMeals();
  };

  return (
    <>
      <Wrapper>
        <Header>
          <section className="logo">
            <img src={logo} width="55vw" height="55vh" alt=""></img>
            <h1>
              <a href="/">SYNERGY</a>
            </h1>
          </section>
          <nav className="links" alt="">
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
        <section className="titlepage">
          <h2>Meals</h2>
        </section>
        {loaded && (
          <section className="container">
            <Card>
              {Meals.map((meal) => {
                return (
                  <MealCardFin
                    key={meal.Meal_ID}
                    meal={meal}
                    click={mealClick}
                  />
                );
              })}
            </Card>
            {!viewMealState ? (
              <CreateMealCard>
                <h2>Create Meals</h2>

                <input
                  name="name"
                  className="input"
                  aria-label="Name of meal"
                  placeholder="Name"
                  type="text"
                  onChange={mealNameChange}
                ></input>
                <input
                  name="description"
                  className="input"
                  type="text"
                  aria-label="Descriptoin of Meal"
                  placeholder="Description"
                  onChange={descriptionChange}
                ></input>

                <section className="available">
                  <p>Available</p>
                  <input
                    type="checkbox"
                    aria-label="Available"
                    onClick={(e) => {
                      availableChange(e);
                    }}
                  ></input>
                </section>
                <button onClick={createMeal} data-test-id="Create Meal">
                  Create
                </button>
              </CreateMealCard>
            ) : (
              <ShowMealCard>
                <h3>{viewMeal.Name_of_Meal}</h3>
                <label></label>
                <p>Description: {viewMeal.Description}</p>
                <section className=".available">
                  <p>{viewMeal.Availability ? "Available" : "Not Available"}</p>
                  <input
                    type="checkbox"
                    aria-label="Chamge Availabel"
                    onChange={changeAvailableViewMeal}
                  ></input>
                </section>
                {/* {changed && <button onClick={() => setChanged(p => !p)}> Save Changes</button>} */}
                <button onClick={deleteMeal}>
                  <TrashIcon width={25} />
                </button>
                <button onClick={() => {
                  console.log("Meals",Meals);
                  setViewMealState(false)}}>Back</button>
              </ShowMealCard>
            )}
            <LoginButton/>
          </section>
        )}
      </Wrapper>
    </>
  );
};

export default HRMeals;
// export {ge}
