import React, { createContext, useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { onValue, ref, set } from "firebase/database";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [allSensorData, setAllSensorData] = useState();

  const [motorStatus, setMotorStatus] = useState(null);
  const [alarms, setAlarms] = useState([]);

  function handleLogin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function handleSignUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function handleLogout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsInitialized(true);

      if (currentUser) {
        const { uid, providerData } = currentUser;
        const current = new Date().getTime();

        const dbRef = ref(db, `User_Info/Users/${uid}`);
        set(dbRef, {
          Info: providerData[0],
          Role: userRole,
          Time: current,
        });
      }
    });

    const sensorDataRef = ref(db, "SensorData/Average");
    onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
    });

    const allSensorDataRef = ref(db, "SensorData/");
    onValue(allSensorDataRef, (snapshot) => {
      const allSensorData = snapshot.val();

      // Filter out data with key "average"
      const filteredData = Object.entries(allSensorData).reduce(
        (acc, [key, value]) => {
          if (key !== "Average") {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      setAllSensorData(filteredData);
    });
    const motorStatus = ref(db, "Motor Status");
    onValue(motorStatus, (snapshot) => {
      const data = snapshot.val();
      if (data.motor_status) {
        setMotorStatus("ON");
      } else {
        setMotorStatus("OFF");
      }
    });
    // clean up function to unsubscribe from the auth state listener
    return unsubscribe;
  }, [userRole]); // re-run the effect only when userRole changes

  // when the motorstatus is change then update the database with the new motor status value
  useEffect(() => {
    if (motorStatus == "ON") {
      const dbRef = ref(db, "Motor Status");
      set(dbRef, {
        motor_status: true,
      });
    } else if (motorStatus == "OFF") {
      const dbRef = ref(db, "Motor Status");
      set(dbRef, {
        motor_status: false,
      });
    }
  }, [motorStatus]);

  if (!isInitialized) {
    // Show loading spinner or something until Firebase is initialized
    return <div>Loading...</div>;
  }
  const value = {
    user,
    userRole,
    sensorData,
    allSensorData,
    motorStatus,
    alarms,
    handleLogin,
    handleSignUp,
    handleLogout,
    handleGoogleSignIn,
    setMotorStatus,
    setAlarms,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
