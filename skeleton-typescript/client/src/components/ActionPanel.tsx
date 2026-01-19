// a single item in the inventory
import React from "react";
import "./ActionPanel.css";

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
    props.freezeSelection();
    // onclick remove handle click
  };

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
