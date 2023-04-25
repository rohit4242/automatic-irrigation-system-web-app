import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { UserAuthContextProvider } from "./Contexts/AuthContext";
import ProtectedRouter from "./Router/ProtectedRouter";
function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <ProtectedRouter>
              <Layout />
            </ProtectedRouter>
          }
        />
        <Route path="*" element={<NotFound h1={"404"}/>} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
