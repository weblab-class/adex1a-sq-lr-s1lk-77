import { Schema, model, Document } from "mongoose";

const CatSchema = new Schema({
  playerid: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  color: { type: String, required: true },
  pattern: { type: String, required: true },
  timestamp: { type: Number, required: true },
  currentmood: { type: [Number], default: [] },
  // ??? idrk how goal works
  goal: { type: Map, of: [String] },
  hasachieved: { type: [Boolean], default: [] },
});

export interface Cat extends Document {
  playerid: string;

  name: string;
  age: number;

  color: string;
  pattern: string;

  timestamp: number;

  currentmood: number[];
  goal: Record<string, string[]>;
  hasachieved: boolean[];
}

const CatModel = model<Cat>("Cat", CatSchema);

export default CatModel;
