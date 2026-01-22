import React, { useState, useEffect } from "react";
import Cat from "../../../shared/Cat";

type Props = {
  cat: Cat;
};
const Catalog = (props: Props) => {
  const cat: Cat = props.cat;

  return (
    <>
      <img />
      {cat.name} {cat.age}
    </>
  );
};

export default Catalog;
