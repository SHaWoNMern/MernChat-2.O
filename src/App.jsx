import React, { useState, useEffect } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Authentication from "./Pages/Authentication";
import RootLayout from "./Pages/RootLayout";
import Loading from "./Component/Loading";
import HomePage from "./Pages/HomePage";
import User from "./Component/User";
import Massage from "./Pages/messages";
import Notifications from "./Pages/Notifications";
import Setting from "./Pages/Setting";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Authentication />} />

      <Route path="/" element={<RootLayout />}>
        <Route path="/user" element={<User />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/messages" element={<Massage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Setting />} />
      </Route>
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
