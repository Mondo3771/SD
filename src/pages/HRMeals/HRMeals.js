// react
import React, { useEffect, useState } from "react";

// Styles
import {
  Card,
  CreateMealCard,
  Header,
  MealCardFin,
  ShowMealCard,
  Wrapper,
} from "./HRMeals.styles";

// logo
import logo from "../../Images/logo3.svg";
// icons
import {  TrashIcon } from "@heroicons/react/24/outline";

// helpers
import { fetchStorageData } from "../../helper";

// react router dom
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// components
import LoginButton from "../../components/Log/LoginButton";

const HRMeals = () => {
// Initializing the state variables
  const [Meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({});
  const [viewMeal, setViewMeal] = useState({});
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const [viewMealState, setViewMealState] = useState(false);

  // UseEffect is triggered once at the beginning of the page rendering and
  //  retrieves user data from storage using the fetchStorageData function and logs 
  // it to the console. Then, it defines and calls the getMeals function, which fetches meal data 
  // from the server endpoint /api/CreateMeals, sets the Meals state with the retrieved data.
  useEffect(() => {
    const User = fetchStorageData({ key: "User" });
    console.log(User);

    // getMeals function fetches from the database all the meals that have been made by HRs 
    // sets the Meals array to this result and 
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
  }, []);

  // This function is called when the availability of a created meal is 
  // changed to save the changes to the database and the frontend
  const changeAvailable = (meal, bool) => {
    // Send a PUT request to update the availability of a meal
    fetch("/api/CreateMeals", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Meal_ID: meal.Meal_ID, // Send the meal ID and new availability status
        Availability: bool,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the viewMeal state with the new availability status
        setViewMeal((prev) => {
          console.log(prev);
          let temp = meal;
          temp.Availability = bool; // Set the meal's availability to the new status
          console.log(temp);
          return temp;
        });

          // Update the meals array with the new availability status
        setMeals((all) => {
          const temp = all.filter((a) => a.Meal_ID === meal.Meal_ID)[0]; // Find the meal in the array
          const result = all;
          temp.Availability = bool; // Set the meal's availability to the new status
          const index = all.findIndex((a) => a.Meal_ID === meal.Meal_ID); // Get the index of the meal
          result[index] = temp;// Update the meal in the array
          console.log(result);
          return result; // Return the updated array
        });
        // Log success message
        console.log("Success (changeAvailable): ", data);
      })
      .catch((error) => {
        console.log("Error", error); // Log any errors
      });
  };

  const mealNameChange = (event) => {
    // Update the newMeal state when the meal name changes
    setNewMeal((prev) => ({
      Meal_ID: prev.Meal_ID, // Preserve the existing meal ID
      Name_of_Meal: event.target.value,  // Update the name of the meal with the new value from the event
      Description: prev.Description, // Preserve the existing description
      Availability: prev.Available, // Preserve the existing availability status
    }));
  };

  const availableChange = (event) => {
     // Update the newMeal state when the meal availabilty changes
    setNewMeal((prev) => ({
      Meal_ID: prev.Meal_ID, // Preserve the existing meal ID
      Name_of_Meal: prev.Name_of_Meal, // Preserve the existing description
      Description: prev.Description, // Preserve the existing description
      Availability: event.target.checked, // Update the availabilty status of the meal 
    }));
  };

  const descriptionChange = (event) => {
     // Update the newMeal state when the meal description changes
    setNewMeal((prev) => ({
      Meal_ID: prev.Meal_ID,  // Preserve the existing meal ID
      Name_of_Meal: prev.Name_of_Meal, // Preserve the existing name
      Description: event.target.value, // Update the description of the meal with the new value from the event
      Availability: prev.Availability, // Preserve the existing availability status
    }));
  };

  // When a meal is clicked, it becomes the viewMeal and 
  // is shown, through the ViewmealState becoming true
  const mealClick = (meal) => {
    setViewMeal(meal);
    setViewMealState(true);
  };

  const createMeal = () => {
    //Function to send a POST request to create a new meal
    const Addmeals = () =>
      fetch("/api/CreateMeals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Include the name of the meal ,Availabilty and description in the request body
          Name_of_Meal: newMeal.Name_of_Meal,
          Availability: newMeal.Availability, 
          Description: newMeal.Description, 
        }),
      })
        .then((response) => {
          return response.json(); 
        })
        .then((data) => {
          // Add the new meal to the meals state
          const temp = newMeal; // Create a temporary copy of the newMeal state
          temp["Meal_ID"] = data.data.Meal_ID; // Assign the Meal_ID returned from the server to the new meal
          setMeals((prev) => [temp, ...prev]); // Add the new meal to the beginning of the meals array
          console.log("Success (AddMeal): ", data); // Log success message with response data
        })
        .catch((error) => {
          console.log(error); // Log any errors 
        });
    // Call the Addmeals function to execute the fetch request
    Addmeals();
  };
  
  const changeAvailableViewMeal = (event) => {
    // Changing the availabilty of the viewMeal based on the checkbox
    changeAvailable(viewMeal, event.target.checked);
  };

  const deleteMeal = () => {
    // Log the current viewMeal state to the console
    console.log(viewMeal);
  
    // Define a function to send a DELETE request to delete a meal
    const deleteMeals = () =>
      fetch("/api/CreateMeals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Meal_ID: viewMeal.Meal_ID, // Include the meal ID in the request body
        }),
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
  
          // Update the meals state by filtering out the deleted meal
          setMeals((prev) =>
            prev.filter((p) => p.Meal_ID !== viewMeal.Meal_ID)
          );
  
          // Clear the viewMeal state
          setViewMeal({});
          // Set the viewMealState to false
          setViewMealState(false);
        })
        .catch((error) => {
          // Log any errors
          console.log("Error (Delete): ", error);
        });
  
    // Call the deleteMeals function to execute the fetch request
    deleteMeals();
  };

  return (
    <Wrapper>
      <Header>
        <section className="logo">
          <img
            src={logo}
            width="55vw"
            height="55vh"
            alt=""
            className="logoPic"
          ></img>
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
            <li>
              {" "}
              <LoginButton className={"logout"} />
            </li>
          </ul>
        </nav>
      </Header>

      <h2 className="title">Meals</h2>

      {loaded && (
        <section className="container">
          <Card>
            {Meals.map((meal) => {
              return (
                <MealCardFin key={meal.Meal_ID} meal={meal} click={mealClick} />
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
                aria-label="Description of Meal"
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
              <button onClick={createMeal} aria-label="Create Meal">
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
                  aria-label="Change Available"
                  onChange={changeAvailableViewMeal}
                ></input>
              </section>
              {/* {changed && <button onClick={() => setChanged(p => !p)}> Save Changes</button>} */}
              <button onClick={deleteMeal} aria-label="Delete Button">
                <TrashIcon width={25} />
              </button>
              <button
                onClick={() => {
                  console.log("Meals", Meals);
                  setViewMealState(false);
                }}
              >
                Back
              </button>
            </ShowMealCard>
          )}
        </section>
      )}
    </Wrapper>
  );
};

export default HRMeals;
