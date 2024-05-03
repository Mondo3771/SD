import React, { useEffect, useState } from "react";

import {
  Card,
  CreateMealCard,
  Header,
  MealCard,
  ShowMealCard,
  Wrapper,
} from "./HRMeals.styles";
import logo from "../../pages/HRHome/Images/logo3.svg";

const meals = [
  {
    Name: "Masala",
    MealId: 0,
    Available: true,
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing. Cum socis natoque penatibus et justorse.",
  },
  {
    Name: "Tikka",
    MealId: 4,
    Available: true,
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing. Cum socis natoque penatibus et justorse.",
  },
  {
    Name: "Masala",
    MealId: 1,
    Available: false,
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing. Cum socis natoque penatibus et justorse.",
  },
  {
    Name: "Masala",
    MealId: 2,
    Available: true,
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing. Cum socis natoque penatibus et justorse.",
  },
  {
    Name: "Masala",
    MealId: 3,
    Available: true,
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing. Cum socis natoque penatibus et justorse.",
  },
];

const formatDate = (date) => {
  return date;
};
  const changeAvailable = (meal) => fetch("/api/CreateMeals", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Meal_ID: meal.Meal_ID,
      Availability: !meal.Availability,
    }),
  })
    .then((response) => {}) 
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log();
    });




const deleteMeal = (meal) => {
  const deleteMeals = () => fetch("/api/CreateMeals", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Meal_ID: meal.Meal_ID,
    }),
  })
    .then((response) => {})
    .then((data) => {})
    .catch((error) => {
      console.log();
    });
  deleteMeals();

} 

const HRMeals = () => {
  const [Meals, setMeals] = useState(meals);
  const [newMeal, setNewMeal] = useState({});
  const [viewMeal, setViewMeal] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const getMeals = () => {
      fetch("/api/CreateMeals")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMeals();
    // fetch all meals from database
    const data = meals;
    setLoaded(true);
    setMeals(data);
  }, []);

  const [viewMealState, setViewMealState] = useState(false);

  const mealNameChange = (event) => {
    setNewMeal((prev) => ({
      MealId: prev.MealId,
      Name: event.target.value,
      Description: prev.Description,
      Available: prev.Available,
    }));
  };

  const availableChange = (event) => {
    setNewMeal((prev) => ({
      MealId: prev.MealId,
      Name: prev.Name,
      Description: prev.Description,
      Available: !event.target.checked,
    }));
  };

  const descriptionChange = (event) => {
    setNewMeal((prev) => ({
      MealId: prev.MealId,
      Name: prev.Name,
      Description: event.target.value,
      Available: prev.Available,
    }));
  };

  const mealClick = (meal) => {
    setViewMeal(meal);
    setViewMealState(true);
  };

  const createMeal = (meal) => {
   const Addmeals = () => fetch("/api/CreateMeals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name_of_Meal: meal.Name,
        Availability: meal.Available ,
        Description: meal.Description,
      }),
    })
      .then((response) => {})
      .then((data) => {

      })
      .catch((error) => {
        console.log();
      });
    Addmeals();
    setMeals((prev) => [meal, ...prev]);
  };

  const changeAvailableViewMeal = (event) => {

    setViewMeal((meal) => ({
      MealId: meal.MealId,
      Name: meal.Name,
      Description: meal.Description,
      Available: event.target.checked,
    }));
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
                <a href="#">Reports</a>
              </li>
              <li>
                <a href="HRMeals">Meals</a>
              </li>
              <li>
                <a href="#">Bookings</a>
              </li>
              <li>
                <a href="#">Car Wash</a>
              </li>
              <li>
                <a href="#">Users</a>
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
              {Meals.map((meal) => (
                <MealCard key={meal.MealId} onClick={() => mealClick(meal)}>
                  <h3>{meal.Name}</h3>
                  <p>{meal.Description}</p>
                  <p>{meal.Available ? "Available" : "Not Available"}</p>
                </MealCard>
              ))}
            </Card>
            {!viewMealState ? (
              <CreateMealCard>
                <h2>Create Meals</h2>
                <label htmlFor="name">Name: </label>
                <input
                  name="name"
                  className="input"
                  placeholder="Name"
                  type="text"
                  onChange={mealNameChange}
                ></input>
                <label htmlFor="description">Description</label>
                <input
                  name="description"
                  className="input"
                  type="text"
                  placeholder="Pizza"
                  onChange={descriptionChange}
                ></input>

                <section className="available">
                  <p>Available</p>
                  <input
                    type="checkbox"
                    onClick={(e) => {
                      availableChange(e);
                    }}
                  ></input>
                </section>
                <button onClick={() => createMeal(newMeal)}>Create</button>
              </CreateMealCard>
            ) : (
              <ShowMealCard>
                <h3>{viewMeal.Name}</h3>
                <label>Description: </label>
                <p>{viewMeal.Description}</p>
                <section>
                  <p>{viewMeal.Available ? "Available" : "Not Available"}</p>
                  <input
                    type="checkbox"
                    checked={viewMeal.Available}
                    onChange={changeAvailableViewMeal}
                  ></input>
                </section>
                {changed && <button> Save Changes</button>}
                <button onClick={() => setViewMealState(false)}>Back</button>
              </ShowMealCard>
            )}
          </section>
        )}
      </Wrapper>
    </>
  );
};

export default HRMeals;