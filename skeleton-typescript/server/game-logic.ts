import CatData from "./@types/CatData";

const items: Array<string> = ["pickle", "homework", "balloon"];
const item_colors: Array<string> = ["red", "green", "blue"];
const actions: Array<string> = ["pet", "feed", "dress", "bonk"];
const emotionMap: string[] = ["happy", "sad", "angry"];

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
    notes: "",
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

/*
export const verifyaction = function
verifies whether an action is legit
returns boolean

*/
export const verifyAction = (action: string): boolean => {
  const thisAction: string[] = action.split("-");
  return (
    thisAction.length == 3 &&
    items.includes(thisAction[1]) &&
    item_colors.includes(thisAction[0]) &&
    actions.includes(thisAction[2])
  );
};

const addItem = (old_list_items: Array<string>, new_item: string): Array<string> => {
  for (let i = 0; i < 4; i++) {
    if (old_list_items[i] === null) {
      const new_list_items = [...old_list_items];
      new_list_items[i] = new_item;
      return new_list_items;
    }
  }
  return old_list_items;
};

const parseAction = (action: string): string[] => {
  const tokens: Array<string> = action.split("-");
  return [tokens[1], tokens[0], tokens[2]];
};

// MUTATES INPUT
const updateEmotions = (
  parsedAction: string[],
  goal: Record<string, string[]>,
  currentStats: number[]
): string => {
  let deltaLog: Record<string, number> = { happy: 0, sad: 0, angry: 0 };
  emotionMap.forEach((emotion: string, index: number): void => {
    const delta: number = goal[emotion].filter((word: string, i: number): boolean => {
      return word === parsedAction[i];
    }).length;

    deltaLog[emotion] = delta;
    currentStats[index] += delta;
  });

  return Object.keys(deltaLog).reduce((emo1, emo2): string =>
    deltaLog[emo1] > deltaLog[emo2] ? emo1 : emo2
  );
};

const gameLogic = { generateNewCat, calcCatAge, calcCatMood, addItem, updateEmotions, parseAction };
export default gameLogic;
