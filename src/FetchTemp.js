import React from "react";
import locationParse from "./LocationParser";

export default async function  fetchTemp(inputString) {
    const retJson = {temp: 0, location:'', moonPhase:'', locationCoords:{lat:0,long:0}, input:inputString, inputType:'', error:''};
    const parsedLocation = locationParse(inputString); //converts input string into expected wttr.in syntax
    retJson.inputType = parsedLocation.type;
    const response = await fetch(`https://wttr.in/${parsedLocation.value}?format=j1`); //pulls data from wttr.in
    const data = await response.json(); //converts data into json
 
    retJson.temp = data.current_condition[0].temp_F; //pulls farenheit temp from wttr data
    retJson.location = data.nearest_area[0].areaName[0].value;  //pulls city/neighborhood name of temp reading location
    retJson.moonPhase = data.weather[0].astronomy[0].moon_phase; //pulls moon phase as a string (ex: Full Moon)
    retJson.locationCoords.lat = data.nearest_area[0].latitude;
    retJson.locationCoords.long =  data.nearest_area[0].longitude;



    if (retJson.location != inputString & parsedLocation.type == "city") {
        retJson.error = (`Could not find weather data for "${inputString}", displaying the weather in ${retJson.location} instead`);
    };


    return(retJson);
  };

