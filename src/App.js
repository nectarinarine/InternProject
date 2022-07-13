import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./contexts/theme";
import fetchTemp from "./FetchTemp";
import MOONEMOJI from "./moonEmoji";

const App = () => {

  const [{theme, isDark}, toggleTheme] = useContext(ThemeContext);
  console.log(theme);


  const [parentTemp, setTemp] = useState(-455); 
  const [parentLocation, setLocation] = useState("here");
  const [parentMoonPhase, setMoonPhase] = useState("Default");
  const previousLocations = [];

  previousLocations.push(parentLocation, parentTemp);



class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {temp, location, moonPhase} = await fetchTemp(this.state.value);
    setTemp(temp);
    setLocation(location);
    setMoonPhase(moonPhase);
    
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Location:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Get Weather" />
      </form>
    );
  }
};


  return (
    <div style={{ backgroundColor: theme.backgroundColor, color: theme.color, height:"100vh"}}>
      <div className="text">
        <button onClick={toggleTheme}>{isDark ? "Light Mode" : "Dark Mode"}</button>
      </div>
      <div style={{textAlign: "center"}}>
        <h1 >
          It is {parentTemp}°F in {parentLocation}. 
        </h1> 
        <h2>
         The moon looks like this:{MOONEMOJI.MOONEMOJI[parentMoonPhase]}
        </h2>
        <LocationForm/>
     </div>
    </div>
    
  )
}
export default App;
