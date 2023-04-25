const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const db = require("./config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow requests from all domains
app.use(cors());

let alarms = [];
let playing = false;
let message = "";
let newTime = {};

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

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
  res.status(201).json({ message: "Alarm added successfully!" });
});

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
  } else {
    message = "No active alarm found";
    res.json({ message: message });
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
