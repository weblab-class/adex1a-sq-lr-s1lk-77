import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";

import { Link } from "react-router-dom";
import "./Login.css";

import { playSFX } from "../../sound";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import success_sfx from "../../assets/sfx/success.mp3";

//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "12657035452-bgq61jdi9b2sva449ujmb1bceds7r87n.apps.googleusercontent.com";

type Props = {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useOutletContext<{
    userId: string | undefined;
    handleLogin: Function;
    handleLogout: Function;
  }>();
  return (
    <div className="login-page w-full h-full bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-black-950 p-sm" style={{ fontSize: "clamp(0.8rem, 2.5cqw, 2.3rem)" }}>
        Tired of your mundane life?
      </h1>
      <h1
        className="text-black-950 p-sm leading-none"
        style={{ fontSize: "clamp(0.8rem, 2.5cqw, 2.3rem)" }}
      >
        Come escape to the{" "}
      </h1>
      <h1
        className="text-black-950 p-sm m-xl barrio-regular"
        style={{ fontSize: "clamp(0.8rem, 6cqw, 7rem)" }}
        justify-center
      >
        Weird Cat Cafe!
      </h1>
      {userId && (
        <div>
          <Link
            to="/wallview"
            onMouseEnter={() => playSFX(button_hover_sfx)}
            onClick={() => playSFX(success_sfx)}
            className="login-button login-button--primary bg-emerald-500 mb-xl rounded-md"
          >
            Start!
          </Link>
        </div>
      )}
      {userId && (
        <Link
          to="/wallview"
          id="tutorial-button"
          className="login-button mb-xl rounded-md"
          onMouseEnter={() => playSFX(button_hover_sfx)}
          onClick={() => playSFX(button_click_sfx)}
        >
          Tutorial
        </Link>
      )}
      {!userId && (
        <p className="m-md px-xs py-2 text-sm">Login to start and save your progress :3</p>
      )}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            className="login-button login-button--muted bg-gray-400 rounded-md"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <div className="login-google">
            <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
          </div>
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default Skeleton;
