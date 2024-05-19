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



  const Book = () => {
    setSelectedBooking({Date:MondayDate});
    setModalOpen(true);
    setActionTriggered(true)
  };


  useEffect(() => {
    const calculateNearestMonday = () => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // Sunday - Saturday : 0 - 6
  
      // If today is Sunday (0), add 1 day. If it's Monday (1), add 0 days.
      // Otherwise, calculate how many days to add to reach next Monday.
      const daysToAdd = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
      
      // Create a new date object and set it to the nearest Monday
      const nearestMonday = new Date(today);
      nearestMonday.setDate(today.getDate() + daysToAdd);
      const formattedDate = nearestMonday.toISOString().split('T')[0] + ' 00:00:00.000';

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
      const formattedDate = nearestThursday.toISOString().split('T')[0] + ' 00:00:00.000';
      console.log(formattedDate);
      return formattedDate;
    };
    setMondayDate(calculateNearestMonday());

    setThursdayDate(calculateNearestThursday());
  }, []);

  useEffect(()=>{
    const findQuantities = () => {
      const mondayItem = mockQuantity.find(item => item.Date === MondayDate);
      const thursdayItem = mockQuantity.find(item => item.Date === ThursdayDate);

      setMondayQuant(mondayItem ? mondayItem.Quantity : 11);
      setThursdayQuant(thursdayItem ? thursdayItem.Quantity : 11);
      if(!mondayItem){
        //post with MondayDate and 11

      }
      if(!thursdayItem){
          //post with thursdayItem and 11


      }
    };

    if (MondayDate && ThursdayDate) {
      findQuantities();
    }

  },[MondayDate,ThursdayDate])




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
    onOpenModal({Date:MondayDate,Quantity:MondayQuant,Day:'Monday'}, employee,empBook);

    // setModalOpen(true);
    setActionTriggered(true)
    };

  const thursdayBook = () => {
    setSelectedBooking({Date:ThursdayDate,Quantity:ThursdayQuant,Day:'Thursday'});
    onOpenModal({Date:ThursdayDate,Quantity:ThursdayQuant,Day:'Thursday'}, employee,empBook);

    // setModalOpen(true);
    setActionTriggered(true)
  };
  const employee = fetchStorageData({ key: "User" });

  useEffect(() => {
    const fetchEmployeeCar = () => {
      // fetch(`/api/Meals?Emp_ID=${data.Emp_ID}`)
      //   .then((response) => response.json())
      //   .then((book) => {
      //     console.log(book.data, "noooooooo");
          setempBook("");
      //     setb_ID(book.data[0].Booking_ID);
      //     console.log(book.data[0].Name_of_Meal, "meal");
      //     console.log(book.data[0].Booking_ID, "book");
      //   });
    };

    fetchEmployeeCar();
  }, [modalOpen ]);


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
