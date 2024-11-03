import React, { useState, useEffect } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import RootLayout from "./Pages/RootLayout";
import Loading from "./Component/Loading";
import Navbar from "./Component/Navbar";
import HomePage from "./Pages/HomePAge";
import {
  AxiosProvider,
  Request,
  Get,
  Delete,
  Head,
  Post,
  Put,
  Patch,
  withAxios,
} from "react-axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/homepage" element={<HomePage />} />
    </Route>
  )
);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
};

export default App;
