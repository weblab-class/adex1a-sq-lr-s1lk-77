import { Schema, model, Document } from "mongoose";

const PlayerSchema = new Schema({
  name: String,
  googleid: String,
});

export interface Player extends Document {
  name: string;
  googleid: string;
  _id: string;
}

const PlayerModel = model<Player>("User", PlayerSchema);

export default PlayerModel;
