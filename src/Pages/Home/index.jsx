import React from "react";
import './index.css';
const Home = () => {
  return (
    <>
      <div class="head-section ">
        <div class="status">
          Status: <span id="motor-status">OFF</span>
        </div>
        <div class="login" id="login-btn">
          Login
        </div>
        <div id="google_translate_element"></div>
      </div>

      {/* <!--card layout start--> */}
      <div class="container">
        <h1>Live Sensor Data</h1>
        {/* <!-- live status bar section start --> */}
        <div class="row">
          <div class="card-01"><span  id="temp">Temperature <img src="svg/temp-svg.svg" width="25px"/>: <span id="temp_live_data">0 C</span></span>
            <select class="select_sensor" id="display_temp_sensor">
              <option disabled ></option>
              {/* <!-- <option value="Average" selected >Average: <span id="display_temp_avg">10</span></option> --> */}
            </select>
          </div>
          <div class="card-02"><span id="soil-moisture">Soil Moisture <img src="svg/soil.svg" width="25px"/>: <span id="soil_live_data">0</span></span>
            <select class="select_sensor" id="display-soilMoisture-sensor">
              {/* <!-- <option value="Average" selected>Average: 45</option> --> */}
              <option disabled></option>
          </select>
          </div>
          <div class="card-03"><span  id="humidity">Humidity <img src="svg/rain.svg" width="25px"/>: <span id="hum_live_data">0%</span></span> 
            <select class="select_sensor" id="display-humidity-sensor">
              {/* <!-- <option value="Average" selected>Average: 800</option> --> */}
              <option disabled></option>
            </select>
          </div>
        </div>
        {/* <!-- live status bar section end--> */}

        {/* <!-- manual mode section start--> */}
        <h1>Manual and Auto</h1>

        <div class="row">
          <div class="card-04" id="card-cp"><h3 class="force-start"id="start-stop">Force Start</h3><hr />
            <label class="set-crop-text">Set Crops</label>
            <select name="crop"id="select-crop">
            </select><hr/>
            <h3 id="cp">Temperature : <span id="var-temp">35</span><span style="color:#00cc99">&#8451;</span></h3>
            {/* <!-- <Input class="range"id="range1" type="range" value="35" min="20" max="60" onChange="temp_rs(this.value),temp_threshold_value()" ontouchmove="temp_rs(this.value)" onmousemove="temp_rs(this.value)"></Input> --> */}
            <h3 id="cp">Soil Moisture : <span id="var-soil-moisture">512</span></h3>
            {/* <!-- <Input class="range"id="range2" type="range" value="512" min="0" max="1023" onChange="soil_Moisture_rs(this.value),soil_Moisture_threshold_value()" ontouchmove="soil_Moisture_rs(this.value)" onmousemove="soil_Moisture_rs(this.value)"></Input> --> */}
            <h3 id="cp">Humidity : <span id="var-humidity">45</span><span style="color:#00cc99">%</span></h3>
            {/* <!-- <Input class="range"id="range3" type="range" value="45" min="20" max="70" onChange="humidity_rs(this.value),humidity_threshold_value()" ontouchmove="humidity_rs(this.value)" onmousemove="humidity_rs(this.value)"></Input> --> */}
          </div>
        </div>
        <h1>Set Timer</h1>

        <div class="row">
          <div class="wrapper">
            <h1 id="current_time">00:00:00 PM</h1>
            <div class="content">
              <div class="column">
                <select class="select_time">
                  <option value="Hour" selected disabled hidden>Hour</option>
                </select>
              </div>
              <div class="column">
                <select class="select_time">
                  <option value="Minute" selected disabled hidden>Minute</option>
                </select>
              </div>
              <div class="column">
                <select class="select_time">
                  <option value="AM/PM" selected disabled hidden>AM/PM</option>
                </select>
              </div>
              <div class="column">
                <select class="select_time">
                  <option value="Limit" selected disabled hidden>Limit</option>
                </select>
              </div>
            </div>
            <button>Set Timer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
