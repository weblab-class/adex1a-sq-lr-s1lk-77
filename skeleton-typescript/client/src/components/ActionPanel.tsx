// a single item in the inventory
import React from "react";
import "./ActionPanel.css";

type Props = {
  itemname: string;
};

// w only multiples of 4 for some reason??
const SingleItem = (props: Props) => {
  return (
    <div className="ActionPanel-container">
      <button>Pet</button>
      <button>Feed</button>
      <button>Dress</button>
      <button>Bonk</button>
    </div>
  );
};

export default SingleItem;
