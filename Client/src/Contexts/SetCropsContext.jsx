import React, { createContext, useState, useContext, useEffect } from "react";

import { auth, db } from "../firebase";
import { onValue, ref, set } from "firebase/database";

const UserCropsContext = createContext();

export function UserCropsContextProvider({ children }) {
  const [cropName, setCropName] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);

  const BASE_URL = "thresholdValue/";

  const addCrop = async () => {
    try {
      const cropData = { cropName, temperature, humidity, soilMoisture };
      await set(ref(db, `${BASE_URL}${cropName}`), cropData);
      setCropName("");
      setTemperature(null);
      setHumidity(null);
      setSoilMoisture(null);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCrop = async (cropName) => {
    try {
      const cropData = { cropName, temperature, humidity, soilMoisture };
      await set(ref(db, `${BASE_URL}${cropName}`), cropData);
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
      console.log("crops", crops);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    cropName,
    temperature,
    humidity,
    soilMoisture,
    setCropName,
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
