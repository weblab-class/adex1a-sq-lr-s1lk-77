import { OAuth2Client, TokenPayload } from "google-auth-library";
import { NextFunction, Request, Response } from "express";
import Player from "./models/Player";
import PlayerInterface from "../shared/Player";

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "12657035452-bgq61jdi9b2sva449ujmb1bceds7r87n.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const verify = (token: string) => {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
};

const getOrCreatePlayer = (player: TokenPayload) => {
  return Player.findOne({ googleid: player.sub }).then(
    (existingPlayer: PlayerInterface | null | undefined) => {
      if (existingPlayer !== null && existingPlayer !== undefined) return existingPlayer;
      const newPlayer = new Player({
        name: player.name,
        googleid: player.sub,
      });
      return newPlayer.save();
    }
  );
};

const login = (req: Request, res: Response) => {
  verify(req.body.token)
    .then((player) => {
      if (player === undefined) return;
      return getOrCreatePlayer(player);
    })
    .then((player) => {
      if (player === null || player === undefined) {
        throw new Error("Unable to retrieve user.");
      }
      req.session.player = player;
      res.send(player);
    })
    .catch((err) => {
      console.log(`Failed to login: ${err}`);
      res.status(401).send({ err });
    });
};

const logout = (req: Request, res: Response) => {
  req.session.player = undefined;
  res.send({});
};

const populateCurrentPlayer = (req: Request, _res: Response, next: NextFunction) => {
  req.player = req.session.player;
  next();
};

// We use any because
const ensureLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.player) {
    return res.status(401).send({ err: "Not logged in." });
  }
  next();
};

export default {
  ensureLoggedIn,
  populateCurrentPlayer,
  login,
  logout,
};
