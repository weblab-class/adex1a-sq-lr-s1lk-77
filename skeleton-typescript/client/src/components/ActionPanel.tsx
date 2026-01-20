// a single item in the inventory
import React, { useEffect } from "react";
import "./ActionPanel.css";
import { socket } from "../client-socket";
import { post } from "../utilities";

type Props = {
  itemname: string;
  freezeSelection: () => void;
};

type ActionNames = Array<"Pet" | "Feed" | "Dress" | "Bonk">;

// w only multiples of 4 for some reason??
const SingleItem = (props: Props) => {
  // click callback for button
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    let thisAction: string = (event.target as HTMLElement).textContent;
    thisAction = thisAction.charAt(0).toLowerCase() + thisAction.slice(1);
    console.log(props.itemname + "-" + thisAction);

    // emit event start action
    post("/api/triggeraction", {
      socketid: socket.id,
      action: props.itemname + "-" + thisAction,
    }).then((result) => {
      console.log(result.status);
    });
    props.freezeSelection();
    // onclick remove handle click
  };

  // test eventhandler
  useEffect(() => {
    const registerPing = (data: string) => {
      console.log(`ping from socket received ${data}`);
    };

    socket.on("actiondenied", registerPing);
    socket.on("actionbegan", registerPing);

    return () => {
      socket.off("actiondenied", registerPing);
      socket.off("actionbegan", registerPing);
    };
  }, []);

  const actionNames: ActionNames = ["Pet", "Feed", "Dress", "Bonk"];

  return (
    <div className="ActionPanel-container">
      {actionNames.map((action: string, i: number): React.ReactNode => {
        return (
          <button key={`ActionPanel-button${i}`} onClick={handleClick}>
            {action}
          </button>
        );
      })}
    </div>
  );
};

export default SingleItem;
