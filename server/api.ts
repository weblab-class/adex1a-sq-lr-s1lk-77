import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import gameLogic from "./game-logic";
import Cat from "./models/Cat";
import CatInterface from "../shared/Cat";
// import { ObjectId } from "mongodb";
import Player from "./models/Player";
import PlayerInterface from "../shared/Player";
//import ItemInterface from "../shared/Item";

const router = express.Router();
let cachedIndex: number = NaN;

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.player) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.player);
});
router.post("/initsocket", (req, res) => {
  // do nothing if player not logged in
  if (req.player) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.player, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/player", (req, res) => {
  // if (!req.player) {
  //   // Not logged in.
  //   return res.send({ name: "not logged in" });
  // }
  // Player.findById(req.player._id);
  Player.findById(req.player._id).then((player: PlayerInterface | null | undefined) => {
    if (player) {
      req.player.items = player.items;
    }
    res.send(player);
  });
});

router.get("/allcats", (req, res) => {
  if (!req.player) {
    // Not logged in.
    return res.send({});
  }

  Cat.find({ playerid: req.player._id }).then((cats) => {
    res.send(cats);
  });
});

router.get("/activecats", async (req, res) => {
  if (!req.player) {
    // Not logged in
    return res.send([]);
  }

  const cats = await Cat.find({ playerid: req.player._id });
  const curActiveCats: CatInterface[] = cats.filter(
    (cat) => !(cat.hasachieved[0] || cat.hasachieved[1] || cat.hasachieved[2])
  );

  while (curActiveCats.length < 3) {
    const newCatData = gameLogic.generateNewCat(req.player._id);
    const newCat = new Cat(newCatData);
    await newCat.save();
    curActiveCats.push(newCat);
  }

  res.send(curActiveCats);
});

// find cat by Id!
router.get("/catfromid", (req, res) => {
  const catId: string = req.query.catid as string;

  Cat.findById(catId)
    .then((catObj: CatInterface | null | undefined) => {
      res.send(catObj);
    })
    .catch((err) => {
      res.status(500).send("Error" + `catid is ${catId}`);
    });
});

router.post("/visitcat", async (req, res) => {
  if (!req.player) {
    // Not logged in
    return res.send([]);
  }
  const cat: CatInterface | null = await Cat.findOne({
    playerid: req.player._id,
    _id: req.body.catId,
  });
  // check if player actually owns this cat
  if (!cat) {
    console.log("not ur cat");
    return res.send([]);
  }
  // alter cat based on last visited
  const updatedCat = await Cat.findByIdAndUpdate(
    req.body.catId,
    {
      age: gameLogic.calcCatAge(cat),
      currentmood: gameLogic.calcCatMood(cat),
      timestamp: Date.now(),
    },
    { new: true } // return updated doc
  );
  res.send(updatedCat);
});

router.post("/additem", async (req, res) => {
  if (!req.player) {
    // Not logged in
    return res.send([]);
  }
  const new_items_list: Array<string> = gameLogic.addItem(req.player.items, req.body.new_item);
  await Player.findByIdAndUpdate(req.player._id, {
    items: new_items_list,
  });
  req.player.items = new_items_list; // update in memory so it works even when u don't refresh
  res.send(new_items_list);
});

router.post("/editnotes", async (req, res) => {
  if (!req.player) {
    // Not logged in
    return res.send([]);
  }

  await Cat.findByIdAndUpdate(req.body.catId, {
    notes: req.body.notes_value,
  });
  res.send([]);
});

/*
router to /startaction, logs the action that was started
verifies that it is a correct action
pings a socket
req.body has the socket id
socket emit event "actionstart"
*/

// this function is pinged on a player's action input
// information is accessed via req.body.action
// socket id to emit to is accessed via req.body.socketid
router.post("/triggeraction", (req, res) => {
  const thisAction: string = req.body.action as string;
  if (!gameLogic.verifyAction(thisAction)) {
    socketManager.getSocketFromSocketID(req.body.socketid)?.emit("actiondenied", thisAction);
    return res.send({});
  }
  // information storage
  cachedIndex = req.body.index;
  socketManager.getSocketFromSocketID(req.body.socketid)?.emit("actionbegan", thisAction);
  res.send({});
});

router.post("/resolveaction", async (req, res) => {
  // check that player is logged in
  if (!req.player) {
    // Not logged in
    return res.send([]);
  }

  // check that action is legit
  const thisAction: string = req.body.action as string;
  if (!gameLogic.verifyAction(thisAction)) {
    socketManager.getSocketFromSocketID(req.body.socketid)?.emit("actionfailed", "action failed");
    return res.send({});
  }

  // update inventory and save to db
  req.player.items[cachedIndex] = null;
  socketManager.getSocketFromSocketID(req.body.socketid)?.emit("actioncomplete", req.player.items);

  const thisPlayer = await Player.findByIdAndUpdate(req.player._id, { items: req.player.items });
  res.send({});
});

// update cat
// check player logged in
// check action is valid
// pull cat from cat id
// call game logic to update stats
// call game logic to determine strongest emotion change
// socket ping status panel
// soeckt ping cat image

// following an action, updates emotion stats of cat and socket pings the relevant pieces to update
// req.body has an action: string and a catid: string

// router.post("/updatecat", async (req, res) => {
//   if (!req.player) {
//     // Not logged in
//     return res.send({});
//   }

//   res.send({ mood: "got ping" });
// });

router.post("/updatecat", async (req, res) => {
  if (!req.player) {
    // Not logged in
    return res.send({});
  }

  // check that action is legit
  const thisAction: string = req.body.action as string;
  const catId: string = req.body.catid as string;
  if (!gameLogic.verifyAction(thisAction)) {
    return res.send({ mood: "action bad" });
  }

  // do cat things things
  const thisCat = await Cat.findById(catId);
  if (!thisCat) {
    return res.send({ mood: "no cat" });
  }
  const parsedAction = gameLogic.parseAction(thisAction);
  const goal = [thisCat.happy, thisCat.sad, thisCat.angry];
  let mostfelt: string = gameLogic.updateEmotions(parsedAction, goal, thisCat.currentmood);
  let isAchievement: boolean = false;

  // check if interaction is optimizer
  let completed: boolean = false;
  if (JSON.stringify(parsedAction) === JSON.stringify(thisCat.happy)) {
    thisCat.set("hasachieved.0", true);
    mostfelt = "purrfect";
    isAchievement = true;
  } else if (JSON.stringify(parsedAction) === JSON.stringify(thisCat.sad)) {
    thisCat.set("hasachieved.1", true);
    mostfelt = "miseraculous";
    isAchievement = true;
  } else if (JSON.stringify(parsedAction) === JSON.stringify(thisCat.angry)) {
    thisCat.set("hasachieved.2", true);
    mostfelt = "hisstorical";
    isAchievement = true;
  }
  // check if cat is complete
  if (thisCat.hasachieved[0] && thisCat.hasachieved[1] && thisCat.hasachieved[2]) {
    completed = true;
  }
  socketManager.getSocketFromSocketID(req.body.socketid)?.emit("updatestatus", {
    currentmood: thisCat.currentmood,
    mostfelt: mostfelt,
    isAchievement: isAchievement,
  });
  await thisCat.save();
  res.send({ completed });
});

router.post("/startpaint", (req, res) => {
  if (!req.player) {
    // Not logged in
    return res.send({});
  }
  const color: string = req.body.color as string;
  if (!gameLogic.verifyColor(color)) {
    return res.send({});
  }
  socketManager.getSocketFromSocketID(req.body.socketid)?.emit("paint", color);
  res.send({});
});

router.post("/applypaint", async (req, res) => {
  if (!req.player) {
    // Not logged in
    return res.send([]);
  }
  const color: string = req.body.color;
  const item: string = req.body.item;
  const index: string = req.body.index;
  if (!gameLogic.verifyColor(color) || !gameLogic.verifyItems([item])) {
    return res.send([]);
  }
  const new_item = gameLogic.changeColor(color, item);
  const new_items = req.player.items;
  new_items[index] = new_item;
  req.player.items = new_items; // just for readability
  await Player.findByIdAndUpdate(req.player._id, { items: req.player.items });
  res.send(req.player.items);
});

router.get("/phrases", (req, res) => {
  res.send({ phrases: gameLogic.jumpscares });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
