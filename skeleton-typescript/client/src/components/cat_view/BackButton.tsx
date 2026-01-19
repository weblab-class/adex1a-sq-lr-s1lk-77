import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/wallview")}>
        <img alt="back" />
      </button>
    </>
  );
};

export default BackButton;
