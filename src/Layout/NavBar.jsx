import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Contexts/AuthContext";

const NavBar = ({ menu, setMenu }) => {
  const [userMenu, setUserMenu] = useState(false);
  const { handleLogout, user, motorStatus } = useUserAuth();
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
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
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
            </button>
            <Link to="/" className="flex ml-2 md:mr-24">
              {/* <img
                src={dustbin_logo}
                className="w-10 h-10 mr-3"
                alt="dustbin logo"
              /> */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                AIS
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="p-2 mx-4 rounded-md bg-slate-200">
              Motor: <span className="text-teal-500">{motorStatus}</span>
            </div>
            <div className="flex items-center ml-3 mr-10">
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
