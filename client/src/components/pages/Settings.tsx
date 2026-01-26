import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ActiveCatContext } from "../App";
import CatCard from "../achievements/CatCard";

import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const { handleLogout } = useOutletContext<{
    handleLogout: () => void;
  }>();

  // achievements stuff
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
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
      <p className="settings-page__title">Have you found all these achievements?</p>
      <div className="Settings-achievementmain">
        <CatCard cat={activeCats[0]} />
        <CatCard cat={activeCats[1]} />
        <CatCard cat={activeCats[2]} />
      </div>
    </div>
  );
};

export default Settings;
