import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import "../pages/CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";
import "./CatInfo.css";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";

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
  const buttonRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonRef.current) {
      buttonRef.current.value = "Saved";

      setTimeout(() => {
        buttonRef.current!.value = "Save";
      }, 400);
    }
    await post("/api/editnotes", { notes_value: notes, catId: props.catId });
  };

  return (
    <>
      <div
        className="CatInterface-panel CatInterface-tl p-sm flex-row"
        style={{
          fontSize: "clamp(0.8rem, 2cqw, 1.8rem)",
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
          <label style={{ fontSize: "clamp(0.7rem, 1.1cqw, 1rem)" }}>Notes:</label>
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
              border: "1px solid #28282b",
              borderRadius: "0.4rem",
              resize: "vertical",
              fontSize: "clamp(0.7rem, 1.1cqw, 1.1rem)",
            }}
          />
          <input
            ref={buttonRef as React.Ref<HTMLInputElement>}
            id="notes_submit"
            type="submit"
            value="Save"
            className="CatInfo-submitbutton"
            onMouseEnter={() => playSFX(button_hover_sfx)}
            onClick={() => playSFX(button_click_sfx)}
          />
        </form>
      </div>
    </>
  );
};

export default CatInfo;
