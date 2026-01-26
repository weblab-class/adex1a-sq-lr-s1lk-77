import React, { useState, useEffect, createContext } from "react";

import { get, post } from "../utilities";

import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import Player from "../../../shared/Player";
import { socket } from "../client-socket";

import { useLocation } from "react-router-dom";

import Cat from "../../../shared/Cat";

import SettingsButton from "../components/SettingsButton";

import "../utilities.css";
import "../output.css";
import "./App.css";

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
    get("/api/whoami").then((player: Player) => {
      if (player._id) setUserId(player._id);
    });

    socket.on("connect", () => {
      post("/api/initsocket", { socketid: socket.id });
    });
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    const userToken = credentialResponse.credential;
    post("/api/login", { token: userToken }).then((player) => {
      setUserId(player._id);
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

  // get the player's active cats on load and ensures the player always has 3 cats
  useEffect(() => {
    getActiveCats();
  }, [userId]);

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  const location = useLocation();
  const showSettings =
    userId && (location.pathname === "/wallview" || location.pathname.startsWith("/cat/"));
  return (
    <>
      <div
        className="w-screen h-screen App-screen"
        // style={{ backgroundImage: `url(${TempBackground})` }}
      >
        <p className="App-title">Weird Cat Cafe</p>
        <div
          className="
          aspect-[16/9]

          w-[75%]
          max-w-[1200px]
          min-w-[520px]

          bg-white
          relative
          rounded-2xl
          overflow-hidden

          App-scene
        "
        >
          {showSettings && (
            <div className="App-settings">
              <SettingsButton />
            </div>
          )}
          <ActiveCatContext.Provider value={{ activeCats, setActiveCats }}>
            <Outlet context={{ userId, handleLogin, handleLogout }} />
          </ActiveCatContext.Provider>
        </div>
      </div>
    </>
  );
};

export default App;
