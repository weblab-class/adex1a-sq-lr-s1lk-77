import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotFound from "./components/pages/NotFound";
import App from "./components/App";
import WallView from "./components/pages/WallView";
import Login from "./components/pages/Login";
import Catalog from "./components/pages/Catalog";
import CatInterface from "./components/pages/CatInterface";
import Settings from "./components/pages/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/wallview" element={<WallView />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cat/:catId" element={<CatInterface />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

// allows for live updating
if (module.hot !== undefined) {
  module.hot.accept();
}
