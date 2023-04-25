import React, { useState, useEffect } from "react";
import axios from "axios";

import { useUserAuth } from "../Contexts/AuthContext";

const SetTimer = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [amPm, setAmPm] = useState("AM");
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const [message, setMessage] = useState("");
  const { alarms, setAlarms } = useUserAuth();
  const BASE_API_URL =
    "https://automatic-irrigation-system-web-app-server.vercel.app/";
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(BASE_API_URL + "timer").then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [setMessage]);

  const handleAddAlarm = () => {
    const newAlarm = {
      hours,
      minutes,
      amPm,
      duration,
      time: hours + ":" + minutes
    };

    console.log(alarms)
    axios.post(BASE_API_URL + "alarms", newAlarm).then((response) => {
      setAlarms([...alarms, newAlarm]);
      console.log(response.data);
      setMessage(response.data.message);
    });
  };

  const handleRemoveAlarm = (index) => {
    axios.delete(BASE_API_URL + "alarms/" + index).then((response) => {
      setAlarms(alarms.filter((alarm, i) => i !== index));
      console.log(response.data);

      setMessage(response.data.message);
    });
  };

  return (
    <div className="h-screen ">
      <h1 className="my-4 text-3xl font-medium text-center text-teal-500">
        Set Timer
      </h1>

      <div className="flex flex-col items-center justify-center my-4 rounded-md shadow-md bg-slate-200/50">
        <h1 className="my-6 text-2xl font-medium text-teal-500">
          {currentTime}
        </h1>
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 my-4">
            <select
              defaultValue="Hours"
              onChange={(e) => setHours(e.target.value)}
              className="h-10 overflow-y-scroll text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="Hours" disabled hidden>
                Hours
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              defaultValue="Minutes"
              onChange={(e) => setMinutes(e.target.value)}
              className="h-10 text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="Minutes" disabled hidden>
                Minutes
              </option>
              {[...Array(60)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              defaultValue="AM/PM"
              onChange={(e) => setAmPm(e.target.value)}
              className="h-10 text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="AM/PM" disabled hidden>
                AM/PM
              </option>
              <option>AM</option>
              <option>PM</option>
            </select>
            <select
              defaultValue="Limit"
              onChange={(e) => setDuration(e.target.value)}
              className="h-10 text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="Limit" disabled hidden>
                Limits
              </option>
              {[...Array(60)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {message && (
            <div className="text-2xl font-medium text-center text-teal-400">
              {message}
            </div>
          )}

          <button
            onClick={handleAddAlarm}
            className="flex items-center justify-center h-12 mx-10 my-4 text-2xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
          >
            Add Timer
          </button>
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full p-4 my-4 rounded-md shadow-md bg-slate-50"
            >
              <div className="flex items-center justify-center w-1/2">
                <h2 className="text-xl font-medium text-teal-500">
                  {alarm.hours + ":" + alarm.minutes} {alarm.amPm}
                </h2>
              </div>
              <div className="flex items-center justify-center w-1/4">
                <h2 className="text-xl font-medium text-teal-500">
                  {alarm.duration} Min
                </h2>
              </div>
              <div className="flex items-center justify-center w-1/4">
                <button
                  onClick={() => handleRemoveAlarm(index)}
                  className="flex items-center justify-center px-2 py-1 mx-2 text-base bg-teal-500 rounded-md cursor-pointer text-slate-100"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetTimer;
