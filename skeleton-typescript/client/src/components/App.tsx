import React, { useState, useEffect, createContext } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import WallView from "./pages/WallView";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import { Cat } from "../../../server/models/Cat";

import "../utilities.css";
import "../output.css";

// cats and setCats as context
export const CatContext = createContext<{
  cats: Cat[];
  setCats: React.Dispatch<React.SetStateAction<Cat[]>>;
}>({
  cats: [],
  setCats: () => {},
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

  const [cats, setCats] = useState([]);
  const getCats = () => {
    get("/api/Cats").then((catData) => {
      setCats(catData);
    });
    // console.log("it working");
  };

  // get the player's active cats on load
  // TO DO: WHENEVER A CAT IS "SOLVED"
  useEffect(() => {
    getCats();
  }, []);

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <CatContext.Provider value={{ cats: cats, setCats: setCats }}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              //<Skeleton handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
              <WallView />
            }
            path="/"
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CatContext.Provider>
  );
};

export default App;
