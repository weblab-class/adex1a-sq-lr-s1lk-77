import React, { useState } from "react";
import PaintStation from "./PaintStation";
const PaintSelector = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <p onClick={() => setVisible(!visible)}>Paint Selector</p>
      {visible && (
        <>
          <PaintStation color="red" />
          <PaintStation color="green" />
          <PaintStation color="blue" />
        </>
      )}
    </>
  );
};

export default PaintSelector;
