import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Contexts/AuthContext";
const NavBar = ({ menu, setMenu }) => {
  const [userMenu, setUserMenu] = useState(false);
  const { handleLogout, user, motorStatus, setMotorStatus } = useUserAuth();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      setMotorStatus("ON");
    } else {
      setMotorStatus("OFF");
    }
  }, [enabled]);
  const navigate = useNavigate();
  const handleSubmit = () => {
    handleLogout();
    navigate("/signIn");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={() => setMenu(!menu)}
              className="inline-flex items-center p-2 text-sm text-gray-500 bg-gray-100 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              {menu ? (
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              ) : (
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 122.878 122.88"
                  enable-background="new 0 0 122.878 122.88"
                >
                  <g>
                    <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
                  </g>
                </svg>
              )}
            </button>
            <Link to="/" className="flex ml-2 md:mr-24">
              <span className="self-center invisible hidden text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white sm:visible sm:inline-flex">
                Automatic Irrigation System
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="toggleThree"
              className="flex items-center px-2 cursor-pointer select-none"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggleThree"
                  onChange={() => setEnabled(!enabled)}
                  checked={enabled}
                  className="sr-only"
                />

                <div className="block h-12 w-6 rounded-full bg-[#E5E7EB]"></div>
                <div
                  className={`dot absolute left-1 bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-400 transition ${
                    enabled ? "-translate-y-6" : "translate-y-0"
                  }`}
                ></div>
              </div>
            </label>

            <div className="p-2 mx-4 rounded-md bg-slate-200 whitespace-nowrap">
              Motor: <span className="text-teal-500">{motorStatus}</span>
            </div>
            <div className="flex items-center ml-3 mr-6">
              <div className="relative ">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="true"
                  data-dropdown-toggle="dropdown-user"
                  onClick={() => setUserMenu(!userMenu)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    }
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                className={`${
                  userMenu ? "" : "hidden"
                } z-50 my-4 absolute duration-1000 w-60 md:w-auto right-6 top-16 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
              >
                <div className="px-4 py-3 " role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    {user?.displayName}
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    {user?.email}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <Link
                      to="/Dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <a
                      href={""}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      onClick={handleSubmit}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
