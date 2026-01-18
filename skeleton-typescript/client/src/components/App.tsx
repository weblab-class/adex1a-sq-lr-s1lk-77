import React, { useState, useEffect, createContext } from "react";

import { get, post } from "../utilities";

import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import User from "../../../shared/User";
import { socket } from "../client-socket";

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
    get("/api/whoami").then((user: User) => {
      if (user._id) setUserId(user._id);
    });

    socket.on("connect", () => {
      post("/api/initsocket", { socketid: socket.id });
    });
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    const userToken = credentialResponse.credential;
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
      <Outlet context={{ userId, handleLogin, handleLogout }} />
    </ActiveCatContext.Provider>
  );
};

export default App;
