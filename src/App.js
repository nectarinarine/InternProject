import React, { useState, useEffect } from "react";
import LocationParse from "./LocationParser";

const App = () => {

  const moonJson = require('./moon-emoji.json'); //json file to convert plaintext moon phase to emoji representation

  const[error, setError] = useState("");

  const[locationInput, setLocationInput] = useState("");

  const [temp, setTemp] = useState(-455); 
  const [location, setLocation] = useState("here");
  const [moonPhase, setMoonPhase] = useState("Default");



  const fetchTemp = async (e) => {
    e.preventDefault();
    const parsedLocation = LocationParse(locationInput); //converts input string into expected wttr.in syntax
    const response = await fetch(`https://wttr.in/${parsedLocation.value}?format=j1`); //pulls data from wttr.in
    const data = await response.json(); //converts data into json
    const returnedTemp = await data.current_condition[0].temp_F; //pulls farenheit temp from wttr data
    const returnedLocation = await data.nearest_area[0].areaName[0].value;  //pulls city/neighborhood name of temp reading location
    const returnedMoonPhase = await data.weather[0].astronomy[0].moon_phase; //pulls moon phase as a string (ex: Full Moon)

    if (returnedLocation != locationInput & parsedLocation.type == "city") {
      setError(`Could not find weather data for "${locationInput}", displaying the weather in ${returnedLocation} instead`);
      setLocationInput(returnedLocation);
    } else {
      setError("")
    };


    //setting global app states as side-effect
    setTemp(returnedTemp); 
    setLocation(returnedLocation);
    setMoonPhase(returnedMoonPhase); 

  }


  //loading user location data using geolocation api
  const getCoords = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setLocationInput(`${latitude},${longitude}`);
  });
  };


  // const getCoords = async (e) => {
  //   e.preventDefault();
  //   const latitude = await navigator.geolocation.getCurrentPosition.coords.latitude;
  //   const longitude = await navigator.geolocation.getCurrentPosition.coords.longitude;
  //   setLocationInput(`${latitude},${longitude}`);
  //   fetchTemp();
  // };


  return (
    <div style={{textAlign: "center"}}>
     <h1>
      It is {temp}°F in {location}.
     </h1> 

     <h2>
     The moon looks like this:{moonJson[moonPhase]}
     </h2>
     <h2>
      <form onSubmit={fetchTemp}>
        <label>Location:</label>
        <input 
          type="text"
          required
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button>Fetch</button>
      </form>
     </h2>
     <h2>
      <form onSubmit= {getCoords}>
        <button required>Load My Location</button>
      </form>
     </h2>
     
      <p style={{textAlign: "center", color: "red"}}>
      {error}
      </p>
  
    </div>
    
  )
}
export default App;
