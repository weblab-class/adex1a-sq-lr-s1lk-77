import React from "react";
import { useNavigate } from "react-router-dom";
import { playSFX } from "../sound";
import button_click_sfx from "../assets/sfx/button_click.wav";
import button_hover_sfx from "../assets/sfx/button_hover.wav";

type Props = {
  // TO DO
};

const SettingsButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onMouseEnter={() => playSFX(button_hover_sfx)}
        onClick={() => {
          playSFX(button_click_sfx);
          navigate("/settings");
        }}
      >
        <img className="text-white" alt="Gear Icon" />
      </button>
    </>
  );
};

export default SettingsButton;
