import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { StartPage } from "../components/styled/Pages";
import { getCookie } from "../utils/getCookie";
import MainLayout from "../components/MainLayout";
import Today from "./Today";
import Habbits from "./Habbits";
import Statistics from "./Statistics";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/start" element={<StartPage />} />
        <Route
          path="/app"
          element={
            getCookie("id") ? <MainLayout /> : <Navigate to="/start" replace />
          }
        >
          <Route path="today" element={<Today />} />
          <Route path="habbits" element={<Habbits />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
