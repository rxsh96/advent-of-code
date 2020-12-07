const fs = require("fs");

const readDataFromFile = () => {
  const data = fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\n");
  const locationMatrix = [];
  for (let i = 0; i < data.length; i++) {
    locationMatrix[i] = [...data[i]];
  }
  return locationMatrix;
};

/**
 * Find how many trees would you encounter in a certain map with an specific slopeX and slopeY.
 * ..##.......
 * #...#...#..
 * .#....#..#. (# represents a tree)
 * @param {Number} slopeX     The steps to take horizontally.
 * @param {Number} slopeY     The steps to take vertically.
 * @param {Array} map         The map to travel.
 * @returns {Number}          The total number of trees.
 */
const tobogganTrajectory = (slopeX, slopeY, map) => {
  let x = 0;
  let y = 0;
  let trees = 0;
  while (y < map.length) {
    const element = map[y][x];
    if (element === "#") {
      trees++;
    }
    x = (x + slopeX) % 31;
    y += slopeY;
  }
  return trees;
};

const data = readDataFromFile();

// Part 1.
const trees = tobogganTrajectory(3, 1, data); // 276

// Part 2.
const total =
  trees *
  tobogganTrajectory(1, 1, data) *
  tobogganTrajectory(5, 1, data) *
  tobogganTrajectory(7, 1, data) *
  tobogganTrajectory(1, 2, data);

console.log(total); // 7812180000
