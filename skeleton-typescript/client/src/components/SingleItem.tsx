// a single item in the inventory
import React from "react";
import "./SingleItem.css";

type Props = {
  itemname: string;
  clickcallback?: () => Object;
};

// w only multiples of 4 for some reason??
const SingleItem = (props: Props) => {
  return <img className="SingleItem-container text-white" alt={props.itemname} />;
};

export default SingleItem;
