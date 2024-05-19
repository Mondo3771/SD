import React, { useEffect, useState } from "react";
import {
  Wrapper,
  Weather,
  Booking,
  Card,
  ImageSec,
  Right,
  Text,
  WeatherSec,
} from "./StaffCarWash.styles";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal/Modal";
import { fetchStorageData } from "../../helper";

const mockQuantity=[
  {
    Quantity:10,
    Date: '2024-04-29 00:00:00.000',

  },
  {
    Quantity:2,
    Date: '2024-05-02 00:00:00.000',
  },
  {
    Quantity:3,
    Date: '2024-05-06 00:00:00.000',

  },
  {
    Quantity:5,
    Date: '2024-05-09 00:00:00.000',
  },
  {
    Quantity:9,
    Date: '2024-05-20 00:00:00.000',

  },
  {
    Quantity:0,
    Date: '2024-05-23 00:00:00.000',
  }
]
const StaffCarWash = ({onOpenModal}) => {
  

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const [MondayQuant, setMondayQuant] = useState(null);
  const [ThursdayQuant, setThursdayQuant] = useState(null);

  const [MondayDate,setMondayDate]=useState(null);
  const [ThursdayDate,setThursdayDate]=useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionTriggered, setActionTriggered] = useState(false); //i want to refresh 1 second after an action

  const [selectedBooking,setSelectedBooking]=useState(null);
  const [empBook,setempBook]=useState(null);


  //states for actual carwash
  const [dates,setDates]=useState(null);
  const[IDmonday,setIDmonday]=useState(null);
  const[IDthursday,setIDthursday]=useState(null);
  const[bookingID,setBookingID]=useState(null);



  



  // const Book = () => {
  //   setSelectedBooking({Date:MondayDate});
  //   setModalOpen(true);
  //   setActionTriggered(true)
  // };

  // fetching Carwash data
  useEffect(()=>{
    const getcarwash = () => {

      fetch("/api/CarWash")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDates(data.data)
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
          return "Error";
        });
    };
    getcarwash();


  },[])


  useEffect(() => {
    const calculateNearestMonday = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // Sunday - Saturday : 0 - 6
      console.log(dayOfWeek);
  
      // If today is Sunday (0), add 1 day. If it's Monday (1), add 0 days.
      // Otherwise, calculate how many days to add to reach next Monday.
      const daysToAdd = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
      
      // Create a new date object and set it to the nearest Monday
      const nearestMonday = new Date(today);
      nearestMonday.setDate(today.getDate() + daysToAdd);
      const formattedDate = nearestMonday.toISOString().split('T')[0] + 'T00:00:00.000Z';

      console.log(formattedDate);
  
  
      return formattedDate;
    };

    const calculateNearestThursday = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // Sunday - Saturday : 0 - 6

      const daysToAdd = (4 - dayOfWeek + 7) % 7 || 7;
      const nearestThursday = new Date(today);
      nearestThursday.setDate(today.getDate() + daysToAdd);

      // Format the date as 'YYYY-MM-DD 00:00:00.000'
      const formattedDate = nearestThursday.toISOString().split('T')[0] + 'T00:00:00.000Z';
      console.log(formattedDate);
      return formattedDate;
    };
    setMondayDate(calculateNearestMonday());

    setThursdayDate(calculateNearestThursday());
  }, []);

  useEffect(()=>{
    const findQuantities = () => {
      console.log(dates,"this is the day");
      const mondayItem = dates? dates.find(item => item.date === MondayDate):null;
      const thursdayItem = dates?dates.find(item => item.date === ThursdayDate):null;

      setIDmonday(mondayItem?mondayItem.Car_wash:null);
      setIDthursday(thursdayItem?thursdayItem.Car_wash:null);



      

      setMondayQuant(mondayItem ? mondayItem.Quantity : 11);
      setThursdayQuant(thursdayItem ? thursdayItem.Quantity : 11);
      if(!mondayItem){
        //post with MondayDate and 11
        const Postcarwash = (data) => {
         
        
          fetch("/api/CarWash", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              setIDmonday(data.data.Car_wash);
              console.log("Success:", data.message);
              return "Success";
            })
            .catch((error) => {
              console.error("Error:", error);
              return "Error";
            });
        };
        Postcarwash({Quantity:11,Date:MondayDate.split('T')[0]})


      }
      if(!thursdayItem){
          //post with thursdayItem and 11
          const Postcarwash = (data) => {
         
        
            fetch("/api/CarWash", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                setIDthursday(data.data.Car_wash);

                console.log("Success:", data.message);
                return "Success";
              })
              .catch((error) => {
                console.error("Error:", error);
                return "Error";
              });
          };
          Postcarwash({Quantity:11,Date:ThursdayDate.split('T')[0]})
  


      }
    };

    if (MondayDate && ThursdayDate && dates) {
      findQuantities();
    }

  },[MondayDate,ThursdayDate,dates])




  useEffect(() => {
    // Weather api
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = "364463030b5dcb4c6b6f92bbaab6ab21 ";
      const apiUrl = `https://api.openweathermap.org/data/2.5//weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const getLocation = () => {
      //gets location of device
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            setError("Unable to retrieve location");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const mondayBook = () => {
    setSelectedBooking({Date:MondayDate,Quantity:MondayQuant,Day:'Monday'});
    onOpenModal({Date:MondayDate.split('T')[0],Quantity:MondayQuant,Day:'Monday',Car_wash:IDmonday}, employee,empBook,actionTriggered);

    // setModalOpen(true);
    setActionTriggered(true)
    };

  const thursdayBook = () => {
    setSelectedBooking({Date:ThursdayDate,Quantity:ThursdayQuant,Day:'Thursday'});
    onOpenModal({Date:ThursdayDate.split('T')[0],Quantity:ThursdayQuant,Day:'Thursday',Car_wash:IDthursday}, employee,empBook,actionTriggered);

    // setModalOpen(true);
    setActionTriggered(true)
  };
  const employee = fetchStorageData({ key: "User" });

  useEffect(() => {
    const timer = setTimeout(() => {
      // Action to be performed 1 second after modal is closed or delete button is clicked
      console.log("Action triggered 1 second later");
      const getcarwashbooking = (data) => {
        // this is what data should have atleast
        // {
        //     "Emp_ID": 85
        //   }
        // this is what comes back
        // {
        //     "data": [
        //       {
        //         "booking_id": 1,
        //         "Car_wash": 1,
        //         "Emp_ID": 85,
        //         "date": "2024-05-07T00:00:00.000Z"
        //       },
        //       {
        //         "booking_id": 2,
        //         "Car_wash": 2,
        //         "Emp_ID": 85,
        //         "date": "2024-05-07T00:00:00.000Z"
        //       },
        //       {
        //         "booking_id": 3,
        //         "Car_wash": 3,
        //         "Emp_ID": 85,
        //         "date": "2024-05-07T00:00:00.000Z"
        //       }
        //     ],
        //     "message": "Successfully retrieved Carwashs"
        //   }
        fetch(`/api/CarBookings?Emp_ID=${data.Emp_ID}`)
          .then((response) => response.json())
          .then((data) => {
            setempBook(data.data[0])
            setBookingID(data.data[0].booking_id)
            console.log(data);
            return data;
          })
          .catch((error) => {
            console.error("Error:", error);
            return "Error";
          });
      };
      getcarwashbooking({Emp_ID:employee.Emp_ID})

      // Reset actionTriggered state
      setActionTriggered(false);
    }, 500);

    return () => clearTimeout(timer); // Clear timeout if the component is unmounted or actionTriggered changes
  
}, [actionTriggered]);

const deletecarwashbooking = (data) => {
  // this is what data should have atleast
  // {
  //     "booking_id": 2
  //   }
  let newdata={booking_id:data}
  console.log(newdata);
  
  fetch("/api/CarBookings", {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
  })
      .then((response) => response.json())
      .then((data) => {
      console.log("Success:", data.message);
      return "Success";
      })
      .catch((error) => {
      console.error("Error:", error);
      return "Error";
      });

};


  return (
   <>
   {/* {modalOpen && (
      <Modal
        setOpenModal={setModalOpen}
        data={selectedBooking}
        employee={employee}
        booking={empBook && empBook.length > 0}
      />
    )} */}
    <Wrapper>
      <ImageSec>
        <h3>Professional Cleaning Service</h3>
      </ImageSec>
      <Right>
        {/* <Text>Car Wash</Text> */}
        <WeatherSec>
          <Text>
            {empBook?
            <>
             <h5>Your Booking</h5>
                  <p> {empBook.date.split('T')[0]}</p>
                  <button onClick={deletecarwashbooking(empBook.booking_id)}>delete</button>
            </>
                 

              
            :

            <section className="text">
              <h5>Services</h5>
              <ul>
                <li> Car wash</li>
                <li> Vaccuuming</li>
                <li> Window washing</li>
                <li> Cleaning tires and rims</li>
                <li> Air Freshner</li>
              </ul>
            </section>
                        }

          </Text>

          <Weather>
            {error && <p>{error}</p>}
            {weatherData && (
              <section className="WeatherText">
                {console.log(weatherData)}
                <h2>Current Weather</h2>
                <p>{weatherData.name}</p>

                <h6>{weatherData.main.temp} °C</h6>
                <p> {weatherData.weather[0].description}</p>
                <p>Feels like:{weatherData.main.feels_like}</p>
                <p></p>
              </section>
            )}
          </Weather>
        </WeatherSec>

        <Booking>
          <Card>
            <h4>Monday</h4>
            <p>Availability: {MondayQuant} slots</p>
            <button onClick={mondayBook}>Book</button>
          </Card>
          <Card>
            <h4>Thursday</h4>
            <p>Availability: {ThursdayQuant} slots</p>
            <button onClick={thursdayBook}>Book</button>
          </Card>
        </Booking>
      </Right>
    </Wrapper>
    </> 

  );
};

export default StaffCarWash;
