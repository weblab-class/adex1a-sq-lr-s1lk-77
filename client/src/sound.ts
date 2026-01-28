export const playSFX = (src: string, volume = 0.6) => {
  const sfx = new Audio(src);
  sfx.volume = volume;
  sfx.play();
};

let music: HTMLAudioElement | null = null;

export const playMusicLoop = (src: string, volume = 0.6) => {
  if (music) return; // no duplicates lmao
  music = new Audio(src);
  music.volume = volume;
  music.loop = true;
  music.play();
};

export const stopMusic = () => {
  music?.pause();
  music = null;
};
