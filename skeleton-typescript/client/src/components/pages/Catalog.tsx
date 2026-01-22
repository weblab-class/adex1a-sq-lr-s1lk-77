import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import Cat from "../../../../shared/Cat";
import CatalogEntry from "../CatalogEntry";

const Catalog = () => {
  const [allCats, setAllCats] = useState<Cat[]>([]);
  const getAllCats = () => {
    get("/api/allcats").then((catData) => {
      setAllCats(catData);
    });
  };

  useEffect(() => {
    getAllCats();
  }, []);

  return (
    <>
      <h1> Cat - a - log</h1>
      {allCats.map((cat) => (
        <CatalogEntry cat={cat} />
      ))}
    </>
  );
};

export default Catalog;
