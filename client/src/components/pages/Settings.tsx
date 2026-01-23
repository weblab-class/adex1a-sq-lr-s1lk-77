import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>
        <img alt="go back" />
      </button>
      <p>Settings.</p>
    </>
  );
};

export default Settings;
