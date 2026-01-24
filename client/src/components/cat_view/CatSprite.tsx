import React, { useContext } from "react";
import "./CatDisplay.css";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";
import { useParams } from "react-router";

import { ActiveCatContext } from "../App";

type Props = {
  sprite: string;
  action: string;
  callback: () => void;
};

const CatSprite = (props: Props) => {
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
  let urlParam = useParams<"catId">();

  const getActiveCats = () => {
    get("/api/activecats").then((catData) => {
      setActiveCats(catData);
    });
    // console.log("it working");
  };

  // click handler
  const handleClick = (): void => {
    const trigger: string =
      props.action === "default" || props.action === "failed"
        ? props.action
        : props.action.split("-")[2];
    switch (trigger) {
      case "bonk":
      case "pet":
      case "dress":
      case "feed":
        console.log("cat id is" + urlParam.catId);
        post("/api/resolveaction", { action: props.action, socketid: socket.id });
        post("/api/updatecat", {
          action: props.action,
          catid: urlParam.catId,
          socketid: socket.id,
        }).then((result) => {
          console.log("RESULT:", result);
          if (result != "no") {
            getActiveCats();
          }
        });
        break;
      case "default":
        props.callback();
        break;
      default:
        break;
    }
  };

  return <img className="CatDisplay-cat" onClick={handleClick} src={props.sprite} alt="cat" />;
};

export default CatSprite;
