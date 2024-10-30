import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import ChatHome from "./Pages/ChatHome";
import RootLayout from "./Pages/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="registration" element={<Registration />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="chathome" element={<ChatHome />}>
        {" "}
      </Route>
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
