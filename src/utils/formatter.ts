export const formatAudioTime = (seconds: number): `${string}:${string}` => {
  const mins = `${Math.floor(seconds / 60)}`.padStart(2, "0");
  const secs = `${Math.floor(seconds % 60)}`.padStart(2, "0");
  return `${mins}:${secs}`;
};
