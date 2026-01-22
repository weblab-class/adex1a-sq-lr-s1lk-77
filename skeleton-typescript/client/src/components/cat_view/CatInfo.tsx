import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import "../pages/CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";

const CatInfo = () => {
  let props = useParams<"catId">();
  const [selectedCat, setSelectedCat] = useState<CatInterfaceMongo | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    console.log(`running use effect in Cat interface`);
    document.title = "Cat";

    if (props.catId != "urmom") {
      get(`/api/catfromid`, { catid: props.catId }).then(
        (catObj: CatInterfaceMongo): void => {
          setSelectedCat(catObj);
          setNotes(catObj.notes);
          console.log("NOTES:", notes);
        }
        // should do a hard player._id = playerid check but not rn
      );
    }
  }, []);

  /*useEffect(() => {
    console.log(`cat is ${selectedCat}`);
    console.log(`cat id is ${selectedCat ? selectedCat._id : "no cat selected"}`);
    console.log(`player id is ${selectedCat ? selectedCat.playerid : "no cat selected"}`);
    document.title = `Cat | ${selectedCat ? selectedCat.name : "Test Cat"}`;
  }, [selectedCat]);*/

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await post("/api/editnotes", { notes_value: notes, catId: props.catId });
  };

  return (
    <>
      <div className="CatInterface-panel CatInterface-tl border-2 border-black p-sm">
        Name: {selectedCat?.name} <br />
        Age: {selectedCat?.age} <br />
        Notes:
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />{" "}
          <br />
          <input id="notes_submit" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default CatInfo;
