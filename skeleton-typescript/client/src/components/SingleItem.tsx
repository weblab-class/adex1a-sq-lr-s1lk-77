// a single item in the inventory
import React from "react";

type Props = {
  placeholder: String;
};

// w only multiples of 4 for some reason??
const Cat = (props: Props) => {
  return <p className="text-white">{props.placeholder}</p>;
};

export default Cat;
