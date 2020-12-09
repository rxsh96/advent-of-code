const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .split("\r\n")
    .map((x) => +x);
};

const findNumbersOfSum = (data, targetNumber) => {
  const complementObject = {};
  for (let i = 0; i < data.length; i++) {
    const actualNumber = data[i];
    const complementNumber = targetNumber - actualNumber;
    if (complementNumber in complementObject) {
      return [complementNumber, complementObject[complementNumber]];
    }
    complementObject[actualNumber] = complementNumber;
  }
  return [];
};

const findNumbersThatSum = (data, targetNumber) => {
  let sum = 0;
  let index = 0;
  let startNumberIndex = 0;

  while (sum !== targetNumber) {
    const currentNumber = data[index];
    sum += currentNumber;
    index++;
    if (sum > targetNumber) {
      sum = 0;
      startNumberIndex++;
      index = startNumberIndex;
    }
    if (sum === targetNumber) {
      return [startNumberIndex, index - 1];
    }
  }
};

/**
 * Find the first number in the list (after the preamble) which is not the sum of two
 * of the 25 numbers before it. What is the first number that does not have this property?
 * @param {Array} data      series of numbers.
 * @param {Number} preamble the n immediately previous numbers to calculate the sum.
 * @returns the only number that does not follow the rule.
 */
const encodingError = (data, preamble) => {
  for (let i = 0; i < data.length; i++) {
    const currentNumber = data[preamble + i];
    const numberOfSum = findNumbersOfSum(
      data.slice(i, preamble + i),
      currentNumber
    );
    if (numberOfSum.length === 0) {
      return currentNumber;
    }
  }
};

/**
 * Find a contiguous set of at least two numbers in your list which
 * sum to the invalid number from step 1.
 * @param {Array} data      series of numbers.
 * @param {Number} preamble the n immediately previous numbers to calculate the sum.
 * @returns the sum of the smallest and largest number in the contiguous range.
 */
const encodingErrorP2 = (data, preamble) => {
  const encodingErrorResult = encodingError(data, preamble);
  const indexOfNumbers = findNumbersThatSum(data, encodingErrorResult);
  const subData = data.slice(
    indexOfNumbers[0],
    indexOfNumbers[indexOfNumbers.length - 1] + 1
  );
  return Math.min(...subData) + Math.max(...subData);
};

const data = readDataFromFile();

const result = encodingError(data, 25);
console.log(result); //15690279

const resultP2 = encodingErrorP2(data, 25);
console.log(resultP2); //2174232
