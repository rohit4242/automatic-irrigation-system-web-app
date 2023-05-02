import React, { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import EditDialog from "../Components/EditDialog";
import AddDialog from "../Components/AddDialog";
import { useUserCrops } from "../Contexts/SetCropsContext";
const defaultSelectedItem = { name: "Select Your Crops", value: "" };

const SetCrops = () => {
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [value, setValue] = useState([]);
  const [selected, setSelected] = useState(defaultSelectedItem);
  const [currentThresholdValue, setCurrentThresholdValue] = useState([]);

  const { crops } = useUserCrops();
  useEffect(() => {
    if (crops !== null && crops !== undefined) {
      setCurrentThresholdValue(selected);
      const crop = Object.values(crops).map((item) => {
        return {
          name: item.name,
          humidity: item.humidity,
          soilMoisture: item.soilMoisture,
          temperature: item.temperature,
        };
      });
      setValue(crop);
    }
  }, [selected, crops]);
  
  
  
  return (
    <>
      <div class="w-full mx-auto max-w-sm bg-zinc-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span class="sr-only">Open dropdown</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http:www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
        </div>
        <div class="flex flex-col items-center pb-10">
          <h5 class="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
            Set Crops
          </h5>
          <div className="my-4 w-60">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected?.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {value && value.length > 0 ? (
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {value.map((crops, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-6 pr-4 ${
                              active ? "bg-teal-400" : "text-gray-900"
                            }`
                          }
                          value={crops}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {crops?.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  ) : (
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className="relative py-2 pl-6 pr-4 text-gray-500 cursor-default select-none"
                        value=""
                      >
                        <span className="block truncate">No records found</span>
                      </Listbox.Option>
                    </Listbox.Options>
                  )}
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="flex flex-col justify-center bg-white border border-gray-200 rounded-md shadow w-60 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="my-2 text-xl font-medium text-center text-slate-600">
              Current Threshold Value
            </h1>
            <hr class="w-full h-1 mx-auto my-2 bg-gray-100 border-0 rounded  dark:bg-gray-700" />

            <div className="flex flex-col mb-4 ml-4 text-lg font-medium text-start text-zinc-600">
              <p>
                Temperature:
                <span className="mx-2 text-teal-400">
                  {currentThresholdValue?.temperature}
                </span>
              </p>
              <p>
                Humidity:
                <span className="mx-2 text-teal-400">
                  {currentThresholdValue?.humidity}
                </span>
              </p>
              <p>
                Soil Moisture:
                <span className="mx-2 text-teal-400">
                  {currentThresholdValue?.soilMoisture}
                </span>
              </p>
            </div>
          </div>

          <div class="flex mt-4 space-x-3 md:mt-6">
            <button
              onClick={() => setAddDialog(!addDialog)}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
            <button
              onClick={() => setEditDialog(!editDialog)}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <EditDialog
        editDialog={editDialog}
        setEditDialog={setEditDialog}
        value={value}
      />
      <AddDialog addDialog={addDialog} setAddDialog={setAddDialog} />
    </>
  );
};

export default SetCrops;
