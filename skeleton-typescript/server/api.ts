import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import gameLogic from "./game-logic";
import CatModel, { Cat } from "./models/Cat";

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
    // Not logged in.
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
