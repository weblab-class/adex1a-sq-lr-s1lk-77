import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const { handleLogout } = useOutletContext<{
    handleLogout: () => void;
  }>();
  return (
    <div className="w-full h-full grow settings-page">
      <button className="settings-page__back" onClick={() => navigate(-1)}>
        <img alt="go back" />
      </button>
      <p className="settings-page__title">Settings.</p>
      <div className="settings-page__actions">
        <button className="settings-page__button" onClick={() => navigate("/wallview")}>
          Tutorial
        </button>
        <button className="settings-page__button" onClick={() => navigate("/catalog")}>
          Cat-a-log
        </button>
        <button
          className="settings-page__button settings-page__button--danger"
          onClick={() => {
            handleLogout();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Settings;
