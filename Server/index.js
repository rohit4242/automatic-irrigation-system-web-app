const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000; // or any other port number of your choice
const bodyParser = require("body-parser");
const db = require("./config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// define the endpoint to handle the alarms
let alarms = []; // initialize an empty array to hold the alarms
app.post("/alarms", (req, res) => {
  const { hours, minutes, amPm, duration } = req.body;

  const newAlarm = {
    hours,
    minutes,
    amPm,
    duration,
    time: hours + ":" + minutes,
  };

  alarms.push(newAlarm);
  res.json({ message: "Alarm added successfully!" });
});

// define the endpoint to handle the timer
let playing = false; // initialize the playing variable to false
let message = ""; // initialize the message variable to an empty string
let newTime = {};

app.get("/timer", (req, res) => {
  const now = new Date();
  const currentAlarm = alarms.find((alarm) => {
    let [hours, minutes] = alarm.time.split(":");
    newTime = {
      time: hours + ":" + minutes,
      hours: hours,
      minutes: minutes,
      duration: alarm.duration,
    };
    return (
      convertTo12HourFormat(now.getHours()) === parseInt(hours) &&
      now.getMinutes() === parseInt(minutes)
    );
  });

  if (currentAlarm || playing === true) {
    console.log("Alarm is on");
    playing = true;
    message = "Your Timer is Started";
    res.json({ message: message });
    const dbRef = db.ref("Motor Status/motor_status");
    dbRef.set(true);
  }

  let newMinutes = parseInt(newTime.minutes) + parseInt(newTime.duration);
  let newHours = parseInt(newTime.hours);
  if (newMinutes >= 60) {
    newHours += Math.floor(newMinutes / 60);
    newMinutes %= 60;
  }
  newHours %= 12;
  if (newHours === 0) {
    newHours = 12;
  }

  if (
    convertTo12HourFormat(now.getHours()) === parseInt(newHours) &&
    now.getMinutes() === parseInt(newMinutes)
  ) {
    console.log("Alarm is off");
    playing = false;
    message = "Your Timer is OFF";
    const dbRef = db.ref("Motor Status/motor_status");
    dbRef.set(false);
    res.json({ message: message });

    alarms = alarms.filter((alarm) => {
      return alarm.time !== newTime.time;
    });
  }
});

// define the endpoint to handle the remove alarm feature
app.delete("/alarms/:index", (req, res) => {
  const { index } = req.params;
  alarms = alarms.filter((alarm, i) => i !== index);
  console.log("Alarm is off");
  playing = false;
  message = "Your Timer is OFF";
  const dbRef = db.ref("Motor Status/motor_status");
  dbRef.set(false);
  res.json({ message: "Alarm removed successfully!" });
});

function convertTo12HourFormat(hours) {
  if (hours === 0) {
    return 12;
  } else if (hours > 12) {
    return hours - 12;
  } else {
    return hours;
  }
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
