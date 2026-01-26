import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../pages/CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";
import PlayerInterface from "../../../../shared/Player";
import { socket } from "../../client-socket";
import StatusBar from "./StatusBar";
import "./CatStatus.css";

type Props = {
  selectedCat: CatInterfaceMongo | null;
};

const CatStatus = (props: Props) => {
  const [currentMood, setCurrentMood] = useState<Array<number>>([0, 0, 0]);
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // callback definition
  const handleStatusUpdate = (data): void => {
    setCurrentMood(data.currentmood);
  };

  useEffect(() => {
    if (props.selectedCat) {
      setCurrentMood(props.selectedCat.currentmood!);
    }
  }, [props.selectedCat]);

  useEffect(() => {
    socket.on("updatestatus", handleStatusUpdate);

    return () => {
      socket.off("updatestatus", handleStatusUpdate);
    };
  }, []);

  const gridlines: Array<React.ReactNode> = numbers.map((loc: number) => {
    return (
      <div className="CatStatus-gridline" key={`Gridline_${loc - 1}`}>
        <div className="CatStatus-gridlabel">{loc}</div>
      </div>
    );
  });

  return (
    <>
      <div className="CatInterface-panel CatInterface-bl p-sm">
        <div className="CatStatus-container">
          <div className="CatStatus-underlay">{gridlines}</div>
          <h2 className="CatStatus-header">Current Mood</h2>
          <div className="CatStatus-bar">
            <StatusBar stat={Math.round(currentMood[0])} emotion="happy" />
            Happy
          </div>
          <div className="CatStatus-bar">
            <StatusBar stat={Math.round(currentMood[1])} emotion="sad" />
            Sad
          </div>
          <div className="CatStatus-bar">
            <StatusBar stat={Math.round(currentMood[2])} emotion="angry" />
            Angry
          </div>
        </div>
      </div>
    </>
  );
};

export default CatStatus;
