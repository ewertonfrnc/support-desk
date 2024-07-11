import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeaderComponent from "./components/header.component.tsx";

import HomeComponent from "./pages/home.component.tsx";
import RegisterComponent from "./pages/register.component.tsx";
import LoginComponent from "./pages/login.component.tsx";
import NewTicketComponent from "./pages/new-ticket.component.tsx";
import PrivateRouteComponent from "./components/private-route.component.tsx";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <HeaderComponent />

          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />

            <Route path="/new-ticket" element={<PrivateRouteComponent />}>
              <Route path="/new-ticket" element={<NewTicketComponent />} />
            </Route>
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
