import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import gameLogic from "./game-logic";
import CatModel, { Cat } from "./models/Cat";
import { ObjectId } from "mongodb";
import Player from "./models/Player";
import PlayerInterface from "../shared/Player";

const router = express.Router();
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/player", (req, res) => {
  // if (!req.user) {
  //   // Not logged in.
  //   return res.send({ name: "not logged in" });
  // }
  // Player.findById(req.user._id);
  Player.findById(req.query.playerid).then((player: PlayerInterface | null | undefined) => {
    res.send(player);
  });
});

router.get("/allcats", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }

  CatModel.find({ playerid: req.user._id }).then((cats) => {
    res.send(cats);
  });
});

router.get("/activecats", async (req, res) => {
  if (!req.user) {
    // Not logged in
    return res.send([]);
  }

  const cats = await CatModel.find({ playerid: req.user._id });
  const curActiveCats: Cat[] = cats.filter(
    (cat) => !(cat.hasachieved[0] || cat.hasachieved[1] || cat.hasachieved[2])
  );

  while (curActiveCats.length < 3) {
    const newCatData = gameLogic.generateNewCat(req.user._id);
    const newCat = new CatModel(newCatData);
    await newCat.save();
    curActiveCats.push(newCat);
  }

  res.send(curActiveCats);
});

// find cat by Id!
router.get("/catfromid", (req, res) => {
  const catId: string = req.query.catid as string;

  CatModel.findById(catId)
    .then((catObj: Cat | null | undefined) => {
      res.send(catObj);
    })
    .catch((err) => {
      res.status(500).send("Error" + `catid is ${catId}`);
    });
});

router.post("/visitcat", async (req, res) => {
  if (!req.user) {
    // Not logged in
    return res.send([]);
  }
  const cat: Cat | null = await CatModel.findOne({ playerid: req.user._id, _id: req.body.catId });
  // check if player actually owns this cat
  if (!cat) {
    console.log("not ur cat");
    return res.send([]);
  }
  // alter cat based on last visited
  const updatedCat = await CatModel.findByIdAndUpdate(
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
