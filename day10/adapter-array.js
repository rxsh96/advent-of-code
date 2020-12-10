const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\r\n")
    .map((x) => +x)
    .sort((a, b) => a - b);
};

/**
 * What is the number of 1-jolt differences multiplied
 * by the number of 3-jolt differences?
 * @param {Array} data      adapters' specific output joltage
 * @returns {Number}        the multiplied differences of jolts.
 */
const adapterArray = (data) => {
  data.unshift(0); // Add the charging outlet jolts
  const joltageDifference = {};
  for (let i = 0; i < data.length - 1; i++) {
    const currentJoltage = data[i];
    const nextJoltage = data[i + 1];
    const difference = nextJoltage - currentJoltage;

    if (difference in joltageDifference) {
      joltageDifference[difference] += 1;
    } else {
      joltageDifference[difference] = 1;
    }
  }

  joltageDifference[3] += 1; // Add the last voltage difference from device's built-in adapter

  return joltageDifference[1] * joltageDifference[3];
};

/**
 * What is the total number of distinct ways you can arrange the
 * adapters to connect the charging outlet to your device?
 * @param {Array} data          adapters' specific output joltage.
 * @param {Object} dp           object to save the combinations value.
 * @param {Number} startFrom    the starting number to count the combinations.
 * @returns {Number}            total number of distinct ways you can arrange the adapters.
 */
const adapterArrayP2 = (data, dp, startFrom) => {
  if (startFrom === data.length - 1) {
    return 1;
  }
  if (startFrom in dp) {
    return dp[startFrom];
  }
  let combinations = 0;
  for (let i = startFrom + 1; i < data.length; i++) {
    if (data[i] - data[startFrom] <= 3) {
      combinations += adapterArrayP2(data, dp, i);
    }
  }
  dp[startFrom] = combinations;
  return combinations;
};

const data = readDataFromFile();

const result = adapterArray(data);
console.log(result); // 2310

const dynamicProgramming = {};
const resultP2 = adapterArrayP2(data, dynamicProgramming, 0);
console.log(resultP2); // 64793042714624
