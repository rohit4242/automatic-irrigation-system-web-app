import React, { createContext, useState, useContext, useEffect } from "react";

import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";

const UserCropsContext = createContext();

export function UserCropsContextProvider({ children }) {
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [crops, setCrops] = useState([]);

  const BASE_URL = "thresholdValue/";

  const addCrop = async () => {
    try {
      const cropData = { name, temperature, humidity, soilMoisture };
      await set(ref(db, `${BASE_URL}${name}`), cropData);
      setName("");
      setTemperature("");
      setHumidity("");
      setSoilMoisture("");
    } catch (error) {
      console.error(error);
    }
  };

  const updateCrop = async (data) => {
    try {
      const { name } = data;
      await set(ref(db, `${BASE_URL}${name}`), data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCrop = async (cropName) => {
    try {
      await set(ref(db, `${BASE_URL}${cropName}`), null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const cropsRef = ref(db, BASE_URL);
    const unsubscribe = onValue(cropsRef, (snapshot) => {
      const crops = snapshot.val();
      setCrops(crops)
      console.log("crops", crops);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    name,
    temperature,
    humidity,
    soilMoisture,
    crops,
    setCrops,
    setName,
    setHumidity,
    setTemperature,
    setSoilMoisture,
    addCrop,
    updateCrop,
    deleteCrop,
  };

  return (
    <UserCropsContext.Provider value={value}>
      {children}
    </UserCropsContext.Provider>
  );
}

export function useUserCrops() {
  return useContext(UserCropsContext);
}
