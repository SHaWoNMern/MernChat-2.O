import React, { useState, useEffect } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import ChatHome from "./Pages/ChatHome";
import RootLayout from "./Pages/RootLayout";
import Loading from "./Component/Loading";
import Navbar from "./Component/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/chathome" element={<ChatHome />} />
      <Route path="/navbar" element={<Navbar />} />
    </Route>
  )
);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
};

export default App;
