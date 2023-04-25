import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import {
  BsThermometerHalf,
  BsFillCloudRainHeavyFill,
  BsWater,
} from "react-icons/bs";
import { useUserAuth } from "../Contexts/AuthContext";

const Index = () => {
  const { sensorData } = useUserAuth();
  console.log(sensorData);
  const dummyData = [
    { name: "Temperature", value: sensorData?.Temp, color: "#36A2EB" },
    { name: "Humidity", value: sensorData?.Humidity, color: "#2ecc71" },
    {
      name: "Soil Moisture",
      value: sensorData?.SoilMoisture,
      color: "#9b59b6",
    },
  ];

  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <h1 className="mb-4 text-2xl font-medium text-center text-gray-800">
          Sensor Live Data
        </h1>
        <div className="flex flex-col flex-wrap gap-8 md:flex-row lg:flex-row">
          {dummyData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-md md:w-64"
            >
              <div className="flex items-center justify-center mb-4 bg-gray-200 rounded-full sm:h-20 sm:w-20">
                {item.name === "Temperature" && (
                  <BsThermometerHalf size={32} color={item.color} />
                )}
                {item.name === "Humidity" && (
                  <BsFillCloudRainHeavyFill size={32} color={item.color} />
                )}
                {item.name === "Soil Moisture" && (
                  <BsWater size={32} color={item.color} />
                )}
              </div>
              <h2 className="mb-2 text-lg font-medium text-gray-800">
                {item.name}
              </h2>
              <div className="flex items-center justify-center w-52">
                <GaugeChart
                  id="gauge-chart"
                  nrOfLevels={10}
                  colors={[item.color, "#f2f2f2"]}
                  arcWidth={0.3}
                  percent={item.value / 100}
                  hideText={true}
                />
              </div>
              <div className="mt-2 text-lg font-medium text-gray-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
