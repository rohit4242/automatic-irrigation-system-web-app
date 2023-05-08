import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";

const UserCropsContext = createContext();
const defaultSelectedItem = { name: "Select Your Crops", value: "" };

export function UserCropsContextProvider({ children }) {
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [crops, setCrops] = useState([]);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [currentThresholdValue, setCurrentThresholdValue] = useState([]);
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("selected")) || defaultSelectedItem
  );

  const BASE_URL = "thresholdValue/";

  const addCrop = useCallback(async () => {
    try {
      if (!name || !temperature || !humidity || !soilMoisture) {
        console.error("All fields are required.");
        return;
      }
      const cropData = { name, temperature, humidity, soilMoisture };
      await set(ref(db, `${BASE_URL}${name}`), cropData);
      setName("");
      setTemperature("");
      setHumidity("");
      setSoilMoisture("");
      setAddDialog(false);
    } catch (error) {
      console.error(error);
    }
  }, [name, temperature, humidity, soilMoisture]);

  const updateCrop = useCallback(async (data) => {
    try {
      const { name } = data;
      if (!name) {
        return;
      }
      await set(ref(db, `${BASE_URL}${name}`), data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteCrop = useCallback(async (cropName) => {
    try {
      if (!cropName) {
        return;
      }
      await set(ref(db, `${BASE_URL}${cropName}`), null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const cropsRef = ref(db, BASE_URL);
    const unsubscribe = onValue(cropsRef, (snapshot) => {
      const crops = snapshot.val();
      setCrops(crops);
      console.log("crops", crops);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const selectedThresholdValueRef = ref(
      db,
      "Selected_Crop_and_Threshold_value/"
    );
    set(selectedThresholdValueRef, selected);

    const handleThresholdValueChange = (snapshot) => {
      const selectedThresholdValue = snapshot.val();
      setSelected(selectedThresholdValue);
      setCurrentThresholdValue(selectedThresholdValue);
    };

    onValue(selectedThresholdValueRef, handleThresholdValueChange);

    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  const value = {
    name,
    temperature,
    humidity,
    soilMoisture,
    crops,
    selected,
    currentThresholdValue,
    addDialog,
    editDialog,
    setCrops,
    setName,
    setHumidity,
    setTemperature,
    setSoilMoisture,
    addCrop,
    updateCrop,
    deleteCrop,
    setCurrentThresholdValue,
    setSelected,
    setAddDialog,
    setEditDialog,
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
