import { useState, useEffect, Component } from 'react'
import { ApiListener } from './services/api/ApiListener'
import './App.css'

let lat,lon=0

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  console.log({crd})
  lat=crd.latitude, lon=crd.lontitude
  console.log(lat)
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

class Geolocation extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);

          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);

          } else if (result.state === "denied") {
            console.log('Location Denied')
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });

    } else {
      alert("Sorry Not available!");
    }
  }

  render() {
    return (
      <div>
        <h2>GeoLocation Happened</h2>
      </div>
    );
  }

}

function App() {

  return (
      <div className='App'>
        <Geolocation/>
      <ApiListener coords={[lat,lon]}/>
      </div>
  )
}

export default App
