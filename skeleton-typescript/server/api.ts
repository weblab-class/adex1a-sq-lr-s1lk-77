import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import gameLogic from "./game-logic";
import Cat from "./models/Cat";
import CatInterface from "../shared/Cat";
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
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  Player.findById(req.user._id)
    .then((player: PlayerInterface | null | undefined) => {
      res.send(player);
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

router.get("/allcats", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }

  Cat.find({ playerid: req.user._id }).then((cats) => {
    res.send(cats);
  });
});

router.get("/activecats", async (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }

  const cats = await Cat.find({ playerid: "billy" });
  const curActiveCats: CatInterface[] = cats.filter(
    (cat) => !(cat.hasachieved[0] || cat.hasachieved[1] || cat.hasachieved[2])
  );

  while (curActiveCats.length < 3) {
    const newCatData = gameLogic.generateNewCat("billy");
    const newCat = new Cat(newCatData);
    await newCat.save();
    curActiveCats.push(newCat);
  }

  res.send(curActiveCats);
});

router.get("/catfromid", (req, res) => {
  const catId: string = req.query.catid as string;

  Cat.findById(new ObjectId(catId))
    .then((catObj: CatInterface | null | undefined) => {
      res.send(catObj);
    })
    .catch((err) => {
      res.status(500).send("Error" + `catid is ${catId}`);
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
