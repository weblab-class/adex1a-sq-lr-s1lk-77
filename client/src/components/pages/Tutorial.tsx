import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useNavigate, useOutletContext } from "react-router-dom";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import spoopy_sfx from "../../assets/sfx/spoopy.mp3";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import "./Settings.css";

const Tutorial = () => {
  const navigate = useNavigate();
  const [showGlitch, setShowGlitch] = useState(false);

  return (
    <div className="h-full w-full">
      <button
        className="settings-page__back"
        onMouseEnter={() => playSFX(button_hover_sfx)}
        onClick={() => {
          playSFX(button_click_sfx);
          navigate(-1);
        }}
      >
        ⬅
      </button>

      <h1
        className="flex items-center justify-center p-sm"
        style={{ fontSize: `2cqw`, paddingTop: "2cqw", textAlign: "center" }}
      >
        {" "}
        Tutorial
      </h1>
      <p
        className="flex flex-col items-center justify-center cursor-pointer"
        style={{
          textAlign: "center",
          fontSize: "1.2cqw",
          paddingLeft: "5cqw",
          paddingRight: "5cqw",
        }}
        onClick={() => {
          setShowGlitch((prev) => !prev);
          playSFX(spoopy_sfx);
        }}
      >
        henlo valued hooman! welcome to s1lk77, adexia, and asdf_asdfghjkl's Weird Cat Cafe™
        <br />
        <br />
        at our Weird Cat Cafe™, you can play with our three lovely residents! we have toys lying
        around the room - pickles, balloons, and even your overdue homework. you can dye them with
        our magical coffee! just select an item, click on the mug, and choose a color.
        <br />
        <br />
        our kitties are pretty picky, so please be mindful when you interact with them. try to give
        them their favorite toys! you will, won't you o_O
        <br />
        <br />
        anyway, enjoy your time here. have fun side-questing!
        <br />
        <br />
        with love,
        <br />
        <br />
        s1lk77, adexia, and asdf_asdfghjkl :D
        <br />
        <br />
        <br />
        <br />
      </p>
      {showGlitch && (
        <p className="flex flex-col items-center justify-center">
          ò̷̡̜͉͕̫̖͍̣͖̼̞̞̩̯̱̊̀͑̋͑͛̊̐̎̊̅̈͠h̴̡̧̯̻̝̩̦̖̹̪͚̠̦͎̱̓̈́̋́͑̚͘͠ ̶͎͍̦͈͉̫͑̆̓͑͌̃̾̏̉̉͌̊͘͘ẁ̶͈͕ͅh̴͉͉̜͔̾̈̀̽͛̓̊͘a̷̭͓̟̭̠̠̞̖̪̗̳̘̤͑̂̈́̇̿̄̎̂̀̾̚͜͠t̷̨̧̛̠̗̳͓͎͔̼̻̰͈͖̱̜̐̿̈́̂̀͛̍͛̈́͋̏͘͘͠'̷̡̧̨͉̼͈̮̺͈̺͚͆͑͋̅͝s̸̤͔̩͔̲͎͉̖̬̻̱͌̉̓̋̎̄̿̕͠ ̴͈̥͎̈́̅̒͒͐͛̐͑̏̿̕͘͠t̵̡̻͔̼͒́͊̽̍́̄̀͆̒̇̏̂̚͠ḩ̴̢̙̩̹̲͖̫͖̣͆ḁ̶̥̲͖̦͓̭̹̹̦̤̙̪͇̂͂̓͋̌̚͜͝t̷͚̜̲̎̒̑̅͐̓͌̚̚͜?̵͙̳̠̝̹̦̼̀̐͑̾̿̄͝ ̷̮̍̄̓̄̈͐͆̈́̽̏͜͠t̶̩̗̥̠͙̭̋̉̔́̇̂͂͋͑͗̓̿̀̚͘h̶͎͈̪̟͖̻̗̫̘̪̼͔͎̞̭̆̎ȩ̴̪̤̮̥̤͍̖̩̠̙̃̃͛͠ ̴̙̙̅̈́̿̐̍̉̋̐̋̀̒͝c̷̛̥̰̱̀͆͗͌́̇̌̽͊̐͆̋ạ̷͎̬̳̺͂̇̃̈ṫ̵͎͌͌͆̇̓͛͂͊̎͊̈́̃s̷̢͍̦̬̝͈̫̱̟̠͓̣̜̓̀̃̃ͅ ̴͍̱̭̝̀͂̋̓̂͋͐͐͘͠a̷͚̼̣̞̰͊͒̓͌͗̃͂̾̀͘͝ͅr̷̢̭͊̉̑̎͑̌̀̌͝e̶̯͕͕͕̺̿̌̈̑͋̚ ̴̧̨̛̟̻̮̀̀̅̓͌̆́̕w̸̞̻̙̬̫̪̟̥̦̮̱͒̀ͅh̷̖̩̬͔̙͙̝͊̒̊͛̂͊͆̉̃̈͗͝͠i̸̼̊̈́̇̆̓́̋̂̊͝͝s̸̗̼̜̜̼̝̩̪̩͂͌̋̕͝͠ͅͅp̴̭̤̟̰͍̈̿͊̀̏̄̕ȩ̶̛̩̪͕̱͓͉͍̓̌̋̑̃̂̓̾̓̍̽͝r̷̢̙̣̗̙̣̯͈̪͈͓̩͈̙̊̀̃̈̔͆̇͌i̶̧̻̳̝̇̅̀͌̓͆̽̒̈́͗̇͜͝͝͝ň̶͔̙̣̩̬̒̊̈́ģ̴̢̤͙̭͍̺̠̝͎̝͇̋ ̵̧̜̭̝̝̤̬͕͚̟̩̌͆̅̌̽̅̆̎͝͝t̴̬̼̝̱̘̱̥͈͗̀͒̐̊́̏͒̒̒̊̈́̍͘h̵̢͈͇̝̙̓̆̆̓́̔̑͋͂̑͝͝ͅi̸͍̠̙̲͇͍̱͔̣͊̌̉̀ͅn̴̢͚̬͔͔̠͚̜̫̣̄͌̐̆͒̇͐g̷͔̤̐̋̊̏̌̊͠s̵̢̯̤̜̳̯̟̙̞̩̯̰͕̟͒?̸͇͇̺̭̃̉̓ ̶̗̦̙̬͕̰͉̞͕͐̇͑y̸̧̢̖̖̜̹͔̣̻͔̤̬̬̋́̐͐o̶̱̜̲̖̫͖̫̿̐̊̉̔́̓͑̔̈́͝͝͝͝ư̶̢͈̤̞̩̫͕̰͖̽͛͂ ̸̤̞̓̏̑̏̑̀̂̓̕͝m̷̞̣͚̦̭̥̬̤̓́͋͋̍̓̈́̀̃͑̽̍̍̐ű̸͔̱̞̖͂̉͐͂̌͗̒́͛̚͜͝͝ș̶̜̝̜͐̔̒͐́́̿̏͠t̷̨̛̺͔̣̞̭̼̹̭̻̀̋͒͌̀̆̊̈́͊̾ͅ ̵͖͈̞̜͚͓̲̬̺̒͒̍̈́̉̀̀̅̍̎͝b̵̡̳͙̼͙͎͓͕̲͇̺̘͒̓̋̆̑͠e̴̼͈̍ ̸̬͔͕̥̫̭̮̼͈̗͍̼̿ͅo̸̡̧̹̭͍̝̝̖͓͔̤͇͈̳̠͂́̾̿̔̈́̽̓͂͛̚͝͝v̸̛̳͎̤̇̏̏͐͘é̷̖̞̲̱̬̼͕̣̯̞̞̣͐̒͊̏͊ͅr̸̨̲͓̤̟͍̯̭̣̥̄̉̀͝͝ͅt̴̛̹͌̀͌̉̔̂́̑͆̒̚͘h̴̠̘̱̀́̋̈́͆̄̃̌̔̄̈́̾̉͆͝ȉ̷̧͇͕̖̞̩͓̟̪̤̖̺̥͇̌͑̃͆̄́̎̈́̚̕̚͜͝͠n̴͙̥̖͕̠͓͕͇̳͉͚̫͛͆̄̊̀̄̽̍͋̃͗̏͝k̶̡̛̪̻̞̘͎͎̮̺̩̊̆͌͂̿̍͒̉̌͌̒̀i̴̧͕̰̗̰̬̲̤̐̀̃̌͋̉͐͠n̶̨̞͎̲̘̋͐̇͊̽̎̇̓̂̚͘ĝ̷̥̥̝̪͎̹ͅ.̷̗̖̝̠̹̗̪̖͖̙̠̄̀̃͆̀̽̉.̷̨̰͔̹̾̍̑̈́̒͌̈͊̈́͂̄̏́͘.̷͕̘͇̠͈̲̭̩̑̋̑̔̒ ̴̳̫̫͕̟̰̈̈́̆̂͜ḋ̷̙̖̹̣͈̖͓̠͉͉͊͛̃̈́́o̸̞̱̥̓͑̇͛ň̸̨̻̫͙̳̬̯̲͙̪͖͔̗̪͉̈́̓'̸̅̄́͠ͅt̵͚̭̓͌̈́̈́̚͝ ̶̡͖̫̺͎͇̈̐̒̀̽͌̀̎̕͘͘͠͝w̶̡̗̱͉̝̪͕͉̭̫̻̹̳̑̽́͗́͂͛͗̈̀͝͝͠͠͠ǒ̸̡̢̥͎͈͇̖̗͊̔̽̈́̚͜͝͝r̶̘̯̭̞͎̉͒̾̄̀͠ŕ̴͙̖͂͛̈́y̷̡̟̰͓̤͓̖̮̤̫̎̔̏́͋̑̏̄͌̎̀͌̓͜͝͝.̶̡̱̣̭͔̒͌͒͂͘̕.̴̨̣̰̥͚̗̟̪̹̥̝̘͇̪̑̿.̶̨̨̢͈̯͚͒̎̽̿͊̊͋̚
          ̵̧̱̗̅̍̋̎̽́͝
        </p>
      )}
    </div>
  );
};

export default Tutorial;
