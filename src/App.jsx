import { useEffect, useState } from "react";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";
import "./App.css";

export const App = () => {
  const [activeUser, setActiveUser] = useState(1);
  useEffect(() => {
    setActiveUser(2);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Authorized>
              <ApplicationViews activeUser={activeUser} />
            </Authorized>
          }
        />
      </Routes>
    </>
  );
};
