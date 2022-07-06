import React, { useState, useEffect } from "react";

const App = () => {
  const [temp, setTemp] = useState(-455);
  const [location, setLocation] = useState("here");

  const fetchTemp = async e => {
    const cityInput = e.target.value
    const city = cityInput.replace(" ", "_")
    const response = await fetch(`https://wttr.in/${city}?format=j1`)
    const data = await response.json()
    setTemp(data.current_condition[0].temp_F);
    setLocation(data.nearest_area[0].areaName[0].value);
  }


  return (
    <div>
     <p style={{textAlign: "center"}}> It is {temp}°F in {location}.
     <input  onChange={fetchTemp} label="Search Location" />
     </p>
    </div>
  )
}
export default App;
