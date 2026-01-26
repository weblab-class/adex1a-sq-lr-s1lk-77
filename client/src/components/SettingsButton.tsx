import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  // TO DO
};

const SettingsButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/settings")}>
        <img className="text-white" alt="Gear Icon" />
      </button>
    </>
  );
};

export default SettingsButton;
