import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../pages/CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";
import PlayerInterface from "../../../../shared/Player";
import { socket } from "../../client-socket";

type Props = {
  selectedCat: CatInterfaceMongo | null;
};

const CatStatus = (props: Props) => {
  const [currentMood, setCurrentMood] = useState<Array<number>>([0, 0, 0]);
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

  return (
    <>
      <div className="CatInterface-panel CatInterface-bl border-2 border-black p-sm">
        Mood: <br />
        <br />
        Happy: {currentMood[0]} <br />
        Sad: {currentMood[1]} <br />
        Angry: {currentMood[2]}
      </div>
    </>
  );
};

export default CatStatus;
