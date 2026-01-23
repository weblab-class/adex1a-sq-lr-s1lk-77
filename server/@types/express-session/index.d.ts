import { User } from "../../models/User";
declare module "express-session" {
  interface Session {
    player?: Player;
  }
}
