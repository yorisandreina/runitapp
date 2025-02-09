export const paceIntervals = (racePace, distance) => {
  if (typeof racePace !== "string" || racePace === "") {
    return "";
  }

  let paceSeconds = calculatePaceInSeconds(racePace);
  paceSeconds = adjustPaceForIntervals(distance, paceSeconds);

  return formatPace(paceSeconds);
};

export const paceTempo = (racePace, distance) => {
  if (typeof racePace !== "string" || racePace === "") {
    return "";
  }

  let paceSeconds = calculatePaceInSeconds(racePace);
  paceSeconds = adjustPaceForTempo(distance, paceSeconds);

  return formatPace(paceSeconds);
};

export const paceLongRun = (racePace, distance) => {
  if (typeof racePace !== "string" || racePace === "") {
    return "";
  }

  let paceSeconds = calculatePaceInSeconds(racePace);
  paceSeconds = adjustPaceForLongRun(distance, paceSeconds);

  return formatPace(paceSeconds);
};

// Helper functions
const calculatePaceInSeconds = (racePace) => {
  const paceParts = racePace.split(":");
  const minutes = parseInt(paceParts[0]);
  const seconds = parseInt(paceParts[1]);
  return minutes * 60 + seconds;
};

const adjustPaceForIntervals = (distance, paceSeconds) => {
  // Adjust the pace based on distance (intervals)
  if (distance === 400) paceSeconds -= 60;
  else if (distance === 600) paceSeconds -= 55;
  else if (distance === 800) paceSeconds -= 50;
  else if (distance === 1000) paceSeconds -= 45;
  else if (distance === 1200 || distance === 3200) paceSeconds -= 40;
  else paceSeconds -= 35;

  return paceSeconds;
};

const adjustPaceForTempo = (distance, paceSeconds) => {
  if (distance === 3 || distance === 4 || distance === 5) paceSeconds -= 10;
  else if (distance === 7 || distance === 8 || distance === 6.5)
    paceSeconds += 5;
  else paceSeconds += 20;

  return paceSeconds;
};

const adjustPaceForLongRun = (distance, paceSeconds) => {
  if (distance === 42) paceSeconds += 0;
  else paceSeconds += 30;

  return paceSeconds;
};

const formatPace = (paceSeconds) => {
  const totalMinutes = Math.floor(paceSeconds / 60);
  const totalSeconds = paceSeconds % 60;
  return `${totalMinutes}:${
    totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
  }`;
};
