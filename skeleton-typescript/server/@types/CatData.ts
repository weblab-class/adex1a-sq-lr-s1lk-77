interface CatData {
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

export default CatData;
