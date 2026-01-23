import React, { useState, useEffect } from "react";
import "./StatusBar.css";

type Props = {
  stat: number;
};

const CatStatus = (props: Props) => {
  return (
    <>
      <div className="StatusBar-container">
        <div className="StatusBar-back"></div>
        <div className="StatusBar-overlay" style={{ width: `${props.stat * 10}%` }}></div>
      </div>
    </>
  );
};

export default CatStatus;
