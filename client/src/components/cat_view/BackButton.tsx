import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/CatInterface.css";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onMouseEnter={() => playSFX(button_hover_sfx)}
        className="CatInterface-backbutton"
        onClick={() => {
          playSFX(button_click_sfx);
          navigate("/wallview");
        }}
      >
        ⬅
      </button>
    </>
  );
};

export default BackButton;
