import React, { useState, useEffect, createContext } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { get, post } from "../utilities";

import { socket } from "../client-socket";
import { Outlet } from "react-router-dom";

import NotFound from "./pages/NotFound";
import WallView from "./pages/WallView";

import User from "../../../shared/User";

import Cat from "../../../shared/Cat";

import "../utilities.css";
import "../output.css";

// activeCats and setActiveCats as context
export const ActiveCatContext = createContext<{
  activeCats: Cat[];
  setActiveCats: React.Dispatch<React.SetStateAction<Cat[]>>;
}>({
  activeCats: [],
  setActiveCats: () => {},
});

const App = () => {
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

  const [activeCats, setActiveCats] = useState<Cat[]>([]);
  const getActiveCats = () => {
    get("/api/activecats").then((catData) => {
      setActiveCats(catData);
    });
    // console.log("it working");
  };

  // get the player's active cats on load and ensures the user always has 3 cats
  useEffect(() => {
    getActiveCats();
  }, []);

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <ActiveCatContext.Provider value={{ activeCats: activeCats, setActiveCats: setActiveCats }}>
      <Outlet />
    </ActiveCatContext.Provider>
  );
};

export default App;
