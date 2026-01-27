export const playSFX = (src: string, volume = 0.6) => {
  const sfx = new Audio(src);
  sfx.volume = volume;
  sfx.play();
};
