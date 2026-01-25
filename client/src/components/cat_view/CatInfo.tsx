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
      <div
        className="CatInterface-panel CatInterface-tl border-2 border-black p-sm flex-row"
        style={{
          fontSize: "clamp(0.8rem, 2vw, 1.8rem)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          // height: "100%",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Name: {selectedCat?.name}</h3>
          <h3 style={{ margin: 0 }}>Age: {selectedCat?.age}</h3>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "0.5rem",
            width: "100%",
            flex: 1,
            minHeight: 0,
          }}
        >
          <label style={{ fontSize: "clamp(0.7rem, 1.1vw, 1rem)" }}>Notes:</label>
          <textarea
            ref={inputRef as unknown as React.Ref<HTMLTextAreaElement>}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "0.4rem 0.5rem",
              minHeight: 0,
              flex: 1,
              border: "1px solid #000",
              borderRadius: "0.4rem",
              resize: "vertical",
              fontSize: "clamp(0.7rem, 1.1vw, 1rem)",
            }}
          />
          <input
            id="notes_submit"
            type="submit"
            value="Submit"
            style={{
              alignSelf: "flex-start",
              padding: "0.2rem 0.3rem",
              border: "1px solid #000",
              borderRadius: "0.5rem",
              background: "#ffffff",
              cursor: "pointer",
              boxShadow: "0 1px 0 rgba(0, 0, 0, 0.25)",
              fontSize: "clamp(0.7rem, 1.1vw, 1rem)",
            }}
          />
        </form>
      </div>
    </>
  );
};

export default CatInfo;
