import React, { useEffect, useState } from "react";
import "../pages/CatInterface.css";
import { socket } from "../../client-socket";
const itemImages = import.meta.glob("../../assets/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const Follower = () => {
  const [displayFollower, setDisplayFollower] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  //so that follower can display item name for now
  const [item, setItem] = useState<string>("");
  const [itemSrc, setItemSrc] = useState<string>("");
  // console.log(itemImages);

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
    const itemName = input.split("-")[0].concat("-" + input.split("-")[1]);
    setItem(itemName);
    console.log(itemName);
  };

  useEffect(() => {
    if (item.includes("balloon")) {
      setItemSrc(itemImages[`../../assets/${item + "-drag"}.png`]);
      return;
    }
    setItemSrc(itemImages[`../../assets/${item}.png`]);
  }, [item]);

  // on action complete
  const handleActionComplete = (data): void => {
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
        <img
          className="follower"
          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
          alt={item}
          src={itemSrc}
        />
      )}
    </>
  );
};

export default Follower;
