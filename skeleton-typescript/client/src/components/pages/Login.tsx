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
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-black-950 p-sm text-lg">Tired of your mundane life?</h1>
      <h1 className="text-black-950 p-sm m-xl text-lg">Come escape to the weird cat cafe!</h1>
      {userId && (
        <Link to="/wallview" className="bg-emerald-500 mb-xl px-xs py-2 rounded-md">
          Start!
        </Link>
      )}
      {!userId && (
        <p className="m-md px-xs py-2 text-sm">Login to start and save your progress :3</p>
      )}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            className="bg-gray-400 px-xs py-2 rounded-md"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default Skeleton;
