import React, { useState, useEffect, createContext } from "react";

import { get, post } from "../utilities";

import { Outlet } from "react-router-dom";

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
