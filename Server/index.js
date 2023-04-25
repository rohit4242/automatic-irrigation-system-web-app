const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config");
const moment = require("moment-timezone");

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();

// Set timezone to UTC
moment.tz.setDefault("America/Los_Angeles");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  const time = `${hours}:${minutes}`;

  alarms.push({ hours, minutes, amPm, duration, time });
  res.status(201).json({ message: "Alarm added successfully!", alarms });
});

app.get("/timer", (req, res) => {
  const now = new Date();
  const currentAlarm = alarms.find((alarm) => {
    const [hours, minutes] = alarm.time.split(":");
    newTime = { hours, minutes, amPm: alarm.amPm, duration: alarm.duration };
    console.log(newTime);
    const isCurrentAlarm =
      convertTo12HourFormat(now.getHours()) === parseInt(hours) &&
      now.getMinutes() === parseInt(minutes);

    console.log(isCurrentAlarm);
    return isCurrentAlarm;
  });

  if (currentAlarm || playing === true) {
    playing = true;
    message = "Your Timer is Started";
    startMotor();
  } else {
    message = "No active alarm found";
  }

  if (shouldTurnOffTimer(now)) {
    playing = false;
    message = "Your Timer is OFF";
    stopMotor();
  }

  res.json({ message, alarms });
});

app.delete("/alarms/:index", (req, res) => {
  const { index } = req.params;
  alarms = alarms.filter((alarm, i) => i !== parseInt(index));
  playing = false;
  message = "Your Timer is OFF";
  stopMotor();
  res.json({ message: "Alarm removed successfully!", alarms });
});

function convertTo12HourFormat(hours) {
  if (hours === 0) {
    return 12;
  } else if (hours > 12) {
    return parseInt(hours - 12);
  } else {
    return parseInt(hours);
  }
}

function shouldTurnOffTimer(now) {
  const { hours, minutes, duration } = newTime;
  let newMinutes = parseInt(minutes) + parseInt(duration);
  let newHours = parseInt(hours);
  if (newMinutes >= 60) {
    newHours += Math.floor(newMinutes / 60);
    newMinutes %= 60;
  }
  newHours %= 12;
  if (newHours === 0) {
    newHours = 12;
  }

  return (
    convertTo12HourFormat(now.getHours()) === parseInt(newHours) &&
    now.getMinutes() === parseInt(newMinutes)
  );
}

function startMotor() {
  const dbRef = db.ref("Motor Status/motor_status");
  dbRef.set(true);
}

function stopMotor() {
  const dbRef = db.ref("Motor Status/motor_status");
  dbRef.set(false);
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
