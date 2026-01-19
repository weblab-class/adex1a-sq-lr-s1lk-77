import CatData from "./@types/CatData";

const items: string[] = ["pickle", "myhomework", "balloon"];
const item_colors: string[] = ["red", "green", "blue"];
const actions: string[] = ["pet", "feed", "dress", "bonk"];

const max_age: number = 100;
const default_name_prefixes: string[] = [
  "Ash",
  "Bracken",
  "Briar",
  "Bright",
  "Cloud",
  "Dawn",
  "Dust",
  "Ember",
  "Feather",
  "Fire",
  "Frost",
  "Golden",
  "Gray",
  "Hawk",
  "Heather",
  "Ivory",
  "Leaf",
  "Light",
  "Lion",
  "Maple",
  "Mist",
  "Moon",
  "Night",
  "Oak",
  "Pebble",
  "Rain",
  "Raven",
  "Red",
  "River",
  "Rose",
  "Sand",
  "Shadow",
  "Silver",
  "Sky",
  "Snow",
  "Stone",
  "Storm",
  "Sun",
  "Swift",
  "Tall",
  "Thorn",
  "Tiger",
  "Willow",
  "Wind",
  "Wolf",
];
const default_name_suffixes: string[] = [
  "fur",
  "pelt",
  "tail",
  "claw",
  "heart",
  "eye",
  "whisker",
  "stripe",
  "fang",
  "storm",
  "leaf",
  "song",
  "feather",
  "light",
  "shade",
  "flight",
  "step",
  "fire",
  "blaze",
  "mist",
  "breeze",
  "river",
  "stream",
  "shadow",
  "thorn",
  "flower",
  "fall",
  "sky",
  "wind",
  "stone",
  "frost",
  "dawn",
  "moon",
  "echo",
  "roar",
  "sight",
];
const cat_colors: string[] = ["orange", "brown", "gray", "black"];
const patterns: string[] = ["none", "tabby", "spotted"];
const default_mood: number = 0;

const randomElementIn = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateNewCat = (playerid: string): CatData => {
  return {
    playerid: playerid,
    name: randomElementIn(default_name_prefixes) + randomElementIn(default_name_suffixes),
    age: Math.floor(Math.random() * max_age),
    color: randomElementIn(cat_colors),
    pattern: randomElementIn(patterns),
    timestamp: Date.now(),
    currentmood: [default_mood, default_mood, default_mood],
    goal: {
      happy: [randomElementIn(items), randomElementIn(item_colors), randomElementIn(actions)],
      sad: [randomElementIn(items), randomElementIn(item_colors), randomElementIn(actions)],
      angry: [randomElementIn(items), randomElementIn(item_colors), randomElementIn(actions)],
    },
    hasachieved: [false, false, false],
  };
};

const calcCatAge = (cat: CatData): number => {
  // cat ages one year every 30 seconds. time is ticking >:3
  return cat.age + Math.floor((Date.now() - cat.timestamp) / 30000);
};

const calcCatMood = (cat: CatData): number[] => {
  // cat mood decreases by one every minute. time is ticking owo
  const toDecrease: number = +((Date.now() - cat.timestamp) / 60000).toFixed(2);
  return [
    Math.max(0, cat.currentmood[0] - toDecrease),
    Math.max(0, cat.currentmood[1] - toDecrease),
    Math.max(0, cat.currentmood[1] - toDecrease),
  ];
};

const gameLogic = { generateNewCat, calcCatAge, calcCatMood };
export default gameLogic;
