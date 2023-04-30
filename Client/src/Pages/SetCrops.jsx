import React, { useEffect, useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import EditDialog from "../Components/EditDialog";
import AddDialog from "../Components/AddDialog";
const people = [
  { id: 1, name: "Wade Cooper", temp: 45, humidity: 65, soilMoisture: 1024 },
  { id: 2, name: "Arlene Mccoy", temp: 55, humidity: 55, soilMoisture: 1024 },
  { id: 3, name: "Devon Webb", temp: 65, humidity: 45, soilMoisture: 1624 },
  { id: 4, name: "Tom Cook", temp: 75, humidity: 35, soilMoisture: 1824 },
  { id: 5, name: "Tanya Fox", temp: 85, humidity: 25, soilMoisture: 8024 },
  { id: 6, name: "Hellen Schmidt", temp: 95, humidity: 15, soilMoisture: 524 },
];

const SetCrops = () => {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");
  const [currentThresholdValue, setCurrentThresholdValue] = useState(null);
  // let [isOpen, setIsOpen] = useState(false);
  const [addDialog,setAddDialog] = useState(false);
  const [editDialog,setEditDialog] = useState(false);

  useEffect(() => {
    console.log(selected);
    setCurrentThresholdValue(selected);
  }, [selected]);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <>
      <div class="w-full max-w-sm bg-zinc-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
          <div className="my-4">
            {" "}
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full py-2 pl-3 pr-10 leading-5 text-gray-900 border-none rounded-lg text-md focus:ring-0"
                    displayValue={(person) => person.name}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredPeople.length === 0 && query !== "" ? (
                      <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                        Nothing found.
                      </div>
                    ) : (
                      filteredPeople.map((person) => (
                        <Combobox.Option
                          key={person.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-teal-600 text-white"
                                : "text-gray-900"
                            }`
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-teal-600"
                                  }`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
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
                  {currentThresholdValue?.temp}
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
            <button               onClick={() => setAddDialog(!addDialog)}
 class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
      <EditDialog editDialog={editDialog} setEditDialog={setEditDialog} />
      <AddDialog addDialog={addDialog} setAddDialog={setAddDialog}/>
    </>
  );
};

export default SetCrops;
