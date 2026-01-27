import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ActiveCatContext } from "../App";
import CatCard from "../achievements/CatCard";
import CatInterfaceMongo from "../../../../shared/Cat";
import { get } from "../../utilities";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const { handleLogout } = useOutletContext<{
    handleLogout: () => void;
  }>();

  // achievements stuff
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
  activeCats.map((cat) => {
    console.log("active cat name is " + cat.name);
  });
  const [catOne, setCatOne] = useState<CatInterfaceMongo | null>(null);
  const [catTwo, setCatTwo] = useState<CatInterfaceMongo | null>(null);
  const [catThree, setCatThree] = useState<CatInterfaceMongo | null>(null);
  let cardList: React.ReactNode = [];

  useEffect(() => {
    let toSet: Array<CatInterfaceMongo> = [];
    // first cat
    get("/api/catfromid", { catid: activeCats[0]._id }).then((catObj) => {
      catObj && setCatOne(catObj);
    });

    // sceond cat
    get("/api/catfromid", { catid: activeCats[1]._id }).then((catObj) => {
      catObj && setCatTwo(catObj);
    });

    // third cat
    get("/api/catfromid", { catid: activeCats[2]._id }).then((catObj) => {
      catObj && setCatThree(catObj);
    });
  }, []);

  return (
    <div className="w-full h-full grow settings-page">
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
      <p className="settings-page__title">Settings.</p>
      <div className="settings-page__actions">
        <button
          className="settings-page__button"
          onMouseEnter={() => playSFX(button_hover_sfx)}
          onClick={() => {
            playSFX(button_click_sfx);
            navigate("/wallview");
          }}
        >
          Tutorial
        </button>
        <button
          className="settings-page__button"
          onMouseEnter={() => playSFX(button_hover_sfx)}
          onClick={() => {
            playSFX(button_click_sfx);
            navigate("/catalog");
          }}
        >
          Cat-a-log
        </button>
        <button
          className="settings-page__button settings-page__button--danger"
          onMouseEnter={() => playSFX(button_hover_sfx)}
          onClick={() => {
            playSFX(button_click_sfx);
            handleLogout();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
      <p className="settings-page__title">Have you found all these achievements?</p>
      <div className="Settings-achievementmain">
        <CatCard cat={catOne ? catOne : null} />
        <CatCard cat={catTwo ? catTwo : null} />
        <CatCard cat={catThree ? catThree : null} />
        {/* {cardList} */}
      </div>
    </div>
  );
};

export default Settings;
