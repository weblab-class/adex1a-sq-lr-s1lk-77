import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../pages/CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";

const CatInfo = () => {
  let props = useParams<"catId">();
  const [selectedCat, setSelectedCat] = useState<CatInterfaceMongo | null>(null);

  useEffect(() => {
    console.log(`running use effect in Cat interface`);
    document.title = "Cat";

    if (props.catId != "urmom") {
      get(`/api/catfromid`, { catid: props.catId }).then(
        (catObj: CatInterfaceMongo): void => setSelectedCat(catObj)
        // should do a hard player._id = playerid check but not rn
      );
    }
  }, []);

  useEffect(() => {
    console.log(`cat is ${selectedCat}`);
    console.log(`cat id is ${selectedCat ? selectedCat._id : "no cat selected"}`);
    console.log(`player id is ${selectedCat ? selectedCat.playerid : "no cat selected"}`);
    document.title = `Cat | ${selectedCat ? selectedCat.name : "Test Cat"}`;
  }, [selectedCat]);

  return (
    <>
      <div className="CatInterface-panel CatInterface-tl border-2 border-black p-sm">
        Name: {selectedCat?.name} <br />
        Age: {selectedCat?.age}
      </div>
    </>
  );
};

export default CatInfo;
