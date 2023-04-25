import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Dashboard";
import NotFound from "../Pages/NotFound";
import UserInfo from "../Pages/UserInfo";
import Records from "../Pages/Records";
import SetTimer from "../Pages/SetTimer";
const Layout = () => {
  const [menu, setMenu] = useState(true);
  return (
    <>
      <NavBar menu={menu} setMenu={setMenu} />
      <SideBar menu={menu} />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/User-Info" element={<UserInfo />} />
            <Route path="/Records" element={<Records />} />
            <Route path="/Set-Timer" element={<SetTimer />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Layout;
