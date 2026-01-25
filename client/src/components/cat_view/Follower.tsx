import React, { useEffect, useState } from "react";
import "../pages/CatInterface.css";
import { socket } from "../../client-socket";

const Follower = () => {
  const [displayFollower, setDisplayFollower] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  //so that follower can display item name for now
  const [item, setItem] = useState<string>("");

  //tracking mouse position
  useEffect(() => {
    const updateMousePosition = (e) => {
      setPos({ x: e.x, y: e.y });
    };
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // event handler definitions
  // on action registered
  const handleActionTrigger = (input: string): void => {
    setDisplayFollower(true);
    //gets color + name, not action
    const itemName = input.split("-")[0].concat(" " + input.split("-")[1]);
    setItem(itemName);
    console.log(item);
  };

  // on action complete
  const handleActionComplete = (): void => {
    setDisplayFollower(false);
  };

  // listener subscriptions
  useEffect(() => {
    socket.on("actionbegan", handleActionTrigger);
    socket.on("updatestatus", handleActionComplete);

    return () => {
      socket.off("actionbegan", handleActionTrigger);
      socket.off("updatestatus", handleActionComplete);
    };
  }, []);

  return (
    <>
      {displayFollower && (
        <div className="follower" style={{ left: `${pos.x}px`, top: `${pos.y}px` }}>
          {/* ideally we'll be displaying the item's image eventually, but its name for now*/}
          {item}
        </div>
      )}
    </>
  );
};

export default Follower;
