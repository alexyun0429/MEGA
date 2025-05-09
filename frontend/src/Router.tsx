import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./loginPage/loginPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mega" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};
