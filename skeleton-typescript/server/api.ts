import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import gameLogic from "./game-logic";
import Cat from "./models/Cat";
import CatInterface from "../shared/Cat";
import { ObjectId } from "mongodb";
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
  Player.findById(req.player._id).then((player: PlayerInterface | null | undefined) => {
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
