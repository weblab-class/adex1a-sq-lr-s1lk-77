import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import gameLogic, { verifyAction } from "./game-logic";
import Cat from "./models/Cat";
import CatInterface from "../shared/Cat";
// import { ObjectId } from "mongodb";
import Player from "./models/Player";
import PlayerInterface from "../shared/Player";
//import ItemInterface from "../shared/Item";

const router = express.Router();
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
  Player.findById(req.query.playerid).then((player: PlayerInterface | null | undefined) => {
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
  if (!verifyAction(thisAction)) {
    socketManager
      .getSocketFromSocketID(req.body.socketid)
      ?.emit("actiondenied", "action was denied");
  }
  socketManager.getSocketFromSocketID(req.body.socketid)?.emit("actionbegan", thisAction);
});

router.post("/resolveaction", (req, res) => {
  const thisAction: string = req.body.action as string;
  if (!verifyAction(thisAction)) {
    socketManager.getSocketFromSocketID(req.body.socketid)?.emit("actionfailed", "action failed");
  }
  socketManager.getSocketFromSocketID(req.body.socketid)?.emit("actioncomplete", thisAction);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
