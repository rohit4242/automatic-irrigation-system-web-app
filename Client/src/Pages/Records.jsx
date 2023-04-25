import React, { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";
import { useUserAuth } from "../Contexts/AuthContext";

const Records = () => {
  const { allSensorData } = useUserAuth();

  if (!allSensorData) return <Spinner message="Loading Your Data" />;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Sensor Name
            </th>
            <th scope="col" className="px-6 py-3">
              Sensor Type
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {allSensorData &&
            Object.keys(allSensorData).map((key, index) => {
              const sensor = allSensorData[key];
              return (
                <tr key={key}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{sensor.sensor_name}</td>
                  <td className="px-6 py-4">{sensor.type}</td>
                  <td className="px-6 py-4">{sensor.value}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
