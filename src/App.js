import React from "react"; //Statement tells file to import React object from the react file
import Titles from "./Components/Titles";
import Form from "./Components/Form";
import Weather from "./Components/Weather";
//IMPORTANT: Main Goal of React is to have a bunch of individual components which you can then import into
//a master file and then put together in order to make a final UI, which is essentially what we are doing above

const API_KEY = "ca9ec1245a06ea045671fc01f8818eb7"; //My API Key for grabbing the Weather Data from an online API

//Initializing App Component (extends React.Component, which lives in node_modules)
class App extends React.Component{
  //The state of any React Component keeps track of any information relating to that component
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  //Creating an unique method to just pull the wheather data directly from the online API
  //React 16+ can leave off the constructor binding for custom methods
  getWeather = async (e) => { //This is an asynchronous call on purpose
    e.preventDefault(); //e is eventHandler, this is so that it prevents the automatic behavior of refreshing quickly
    //Using event object to get city, Country values from the target object
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`) //api_url goes into the fetch(...) function
    //Need to convert the data we get back from the API into a readable format
    const data = await api_call.json();
    //Altering the state based on the information we got back from the API Call above
    if (city && country && data == undefined){
      console.log(data.sys.country);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter in values."
      });
    }
    
  }

  render(){
    //Build-in React method living inside React components
    return ( //JSX is Javascript that looks like HTML and executes in the background in the browser
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles/>
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/> 
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ); //Only put in extra elements inside the main parent element (<div></div> in our case)
  }
}
        
export default App; //Telling this file to make the App Component available to other files