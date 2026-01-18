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
import Skeleton from "./components/pages/Skeleton";

import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import User from "../../shared/User";
import { get, post } from "./utilities";
import { socket } from "./client-socket";

const [userId, setUserId] = useState<string | undefined>(undefined);

useEffect(() => {
  get("/api/whoami")
    .then((user: User) => {
      if (user._id) {
        // TRhey are registed in the database and currently logged in.
        setUserId(user._id);
      }
    })
    .then(() =>
      socket.on("connect", () => {
        post("/api/initsocket", { socketid: socket.id });
      })
    );
}, []);

const handleLogin = (credentialResponse: CredentialResponse) => {
  const userToken = credentialResponse.credential;
  const decodedCredential = jwt_decode(userToken as string) as { name: string; email: string };
  console.log(`Logged in as ${decodedCredential.name}`);
  post("/api/login", { token: userToken }).then((user) => {
    setUserId(user._id);
    post("/api/initsocket", { socketid: socket.id });
  });
};

const handleLogout = () => {
  setUserId(undefined);
  post("/api/logout");
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route
        element={<Skeleton handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
        path="/"
      />
      <Route path="/wallview" element={<WallView />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

// allows for live updating
if (module.hot !== undefined) {
  module.hot.accept();
}
