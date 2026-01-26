import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/CatInterface.css";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button className="CatInterface-backbutton" onClick={() => navigate("/wallview")}>
        <img alt="back" />
      </button>
    </>
  );
};

export default BackButton;
