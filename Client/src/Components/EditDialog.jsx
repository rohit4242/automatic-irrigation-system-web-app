import React, { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useUserCrops } from "../Contexts/SetCropsContext";
const EditDialog = ({ editDialog, setEditDialog }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const { crops } = useUserCrops();

  useEffect(() => {
    const crop = Object.values(crops).map(
      ({ name, humidity, soilMoisture, temperature }) => ({
        name,
        humidity,
        soilMoisture,
        temperature,
      })
    );
    setData(crop);
  }, [selected, crops]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  return (
    <Transition appear show={editDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setEditDialog(!editDialog)}
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
                    Update Crops
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={() => setEditDialog(!editDialog)}
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
                        for="crops"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Crops
                      </label>
                      <select
                        id="crops"
                        value={selected}
                        onChange={handleSelect}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-400 dark:focus:border-teal-400"
                      >
                        <option selected="">Select Crops</option>
                        {data?.map(({ name }) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
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
                        // value="Google"
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
                        //   value="399"
                        name="hum"
                        id="hum"
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
                        //   value="399"
                        name="moisture"
                        id="moisture"
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
                    onClick={() => setEditDialog(!editDialog)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setEditDialog(!editDialog)}
                  >
                    <svg
                      class="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Delete
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

export default EditDialog;
