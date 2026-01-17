import { Schema, model, Document } from "mongoose";

const CatSchema = new Schema({
  playerid: { type: String, required: true },

  name: { type: String, required: true },
  age: { type: Number, required: true },

  color: { type: String, required: true },
  pattern: { type: String, required: true },

  timestamp: { type: Date, default: Date.now, required: true },

  currentmood: { type: [Number], default: [] },
  // ??? idrk how goal works
  goal: { type: [[Boolean]], default: [] },
  hasachieved: { type: [Boolean], default: [] },
});

export interface Cat extends Document {
  playerid: string;

  name: string;
  age: number;

  color: string;
  pattern: string;

  timestamp: Date;

  currentmood: number[];
  goal: boolean[][];
  hasachieved: boolean[];
}

const CatModel = model<Cat>("Cat", CatSchema);

export default CatModel;
