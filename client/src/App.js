import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.js";
import Home from "./pages/home";
import Withdraw from "./pages/withdraw";
import AllData from "./pages/alldata";
import CreateAccount from "./pages/createaccount";
import Login from "./pages/login";
import Deposit from "./pages/deposit";

function App() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    setInterval(() => {
      setStatus(localStorage.getItem("token"));
    }, 3000);
  }, []);
  
  return (
    <HashRouter>
      <NavBar status={status} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/createaccount/" element={<CreateAccount />} />
        <Route path="/deposit/" element={status ? <Deposit /> : <Login />} />
        <Route path="/withdraw/" element={status ? <Withdraw /> : <Login />} />
        <Route path="/alldata/" element={status ? <AllData /> : <Login />} />
        <Route path="/logout/" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
