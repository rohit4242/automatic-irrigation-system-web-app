import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useUserCrops } from "../Contexts/SetCropsContext";
const AddDialog = ({ addDialog, setAddDialog }) => {
  const {
    name,
    temperature,
    humidity,
    soilMoisture,
    setName,
    setHumidity,
    setTemperature,
    setSoilMoisture,
    addCrop,
  } = useUserCrops();

  return (
    <Transition appear show={addDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setAddDialog(!addDialog)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div class="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Crops
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={() => setAddDialog(!addDialog)}
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <form action="#">
                  <div class="grid gap-4 mb-4 mt-2 sm:grid-cols-2">
                    <div>
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Crop Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-400 dark:focus:border-teal-400"
                        placeholder="Enter Your Crop"
                      />
                    </div>
                    <div>
                      <label
                        for="temp"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Temperature
                      </label>
                      <input
                        type="number"
                        name="temp"
                        id="temp"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-400 dark:focus:border-teal-400"
                        placeholder="Enter Your Temperature"
                      />
                    </div>
                    <div>
                      <label
                        for="hum"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Humidity
                      </label>
                      <input
                        type="number"
                        name="hum"
                        id="hum"
                        value={humidity}
                        onChange={(e) => setHumidity(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-400 dark:focus:border-teal-400"
                        placeholder="Enter Your Humidity"
                      />
                    </div>
                    <div>
                      <label
                        for="soilMoisture"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Soil Moisture
                      </label>
                      <input
                        type="number"
                        name="moisture"
                        id="moisture"
                        value={soilMoisture}
                        onChange={(e) => setSoilMoisture(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-400 dark:focus:border-teal-400"
                        placeholder="Enter Your Soil Moisture"
                      />
                    </div>
                  </div>
                </form>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={addCrop}
                  >
                    Add
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddDialog;
