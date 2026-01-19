// a single item in the inventory
import React from "react";

type Props = {
  itemname: string;
};

// w only multiples of 4 for some reason??
const SingleItem = (props: Props) => {
  return (
    <div className="u-flexcolumn">
      <p>{props.itemname}</p>
      <button>Pet</button>
      <button>Feed</button>
      <button>Dress</button>
      <button>Bonk</button>
    </div>
  );
};

export default SingleItem;
