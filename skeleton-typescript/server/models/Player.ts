import { Schema, model, Document } from "mongoose";

const PlayerSchema = new Schema({
  name: String,
  googleid: String,
  items: { type: [String], default: [] },
});

export interface Player extends Document {
  name: string;
  googleid: string;
  items: Array<string | null>;
  _id: string;
}

const PlayerModel = model<Player>("Player", PlayerSchema);

export default PlayerModel;
