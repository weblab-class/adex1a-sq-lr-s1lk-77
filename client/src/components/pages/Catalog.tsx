import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import Cat from "../../../../shared/Cat";
import CatalogEntry from "../CatalogEntry";
import { useNavigate, useOutletContext } from "react-router-dom";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import "./Settings.css";

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

  const navigate = useNavigate();

  return (
    <>
      <button
        className="settings-page__back"
        onMouseEnter={() => playSFX(button_hover_sfx)}
        onClick={() => {
          playSFX(button_click_sfx);
          navigate(-1);
        }}
      >
        <img alt="go back" />
      </button>

      <h1 className="flex items-center justify-center p-sm" style={{ fontSize: `2em` }}>
        {" "}
        Cat - a - log
      </h1>
      <p className="flex flex-col items-center justify-center">
        {allCats.map((cat) => (
          <CatalogEntry cat={cat} key={cat.id} />
        ))}
      </p>
    </>
  );
};

export default Catalog;
