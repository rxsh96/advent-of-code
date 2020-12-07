const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\n");
};

/**
 * Find the highest seat ID on a boarding pass.
 * @param {Array} data  the boarding passes data.
 * @returns {Number}    the highest seat ID.
 */
const binaryBoarding = (data) => {
  let higherSeatID = 0;
  for (let i = 0; i < data.length; i++) {
    let row = 0;
    let column = 0;
    for (let j = 0; j < data[i].length; j++) {
      if (j < 7 && data[i][j] === "B") {
        row += Math.pow(2, 6 - j);
      } else if (j >= 7 && data[i][j] === "R") {
        column += Math.pow(2, 9 - j);
      }
    }
    const seatID = row * 8 + column;
    if (seatID > higherSeatID) {
      higherSeatID = seatID;
    }
  }
  return higherSeatID;
};

/**
 * Find the the ID of your seat.
 * @param {Array} data  the boarding passes data.
 * @returns {Number}    your seat ID.
 */
const binaryBoardingP2 = (data) => {
  const seatsID = [];
  for (let i = 0; i < data.length; i++) {
    let row = 0;
    let column = 0;
    for (let j = 0; j < data[i].length; j++) {
      if (j < 7 && data[i][j] === "B") {
        row += Math.pow(2, 6 - j);
      } else if (j >= 7 && data[i][j] === "R") {
        column += Math.pow(2, 9 - j);
      }
    }
    seatsID.push(row * 8 + column);
  }

  seatsID.sort((a, b) => a - b);
  let lastID = -1;
  for (let i = 0; i < seatsID.length; i++) {
    if (lastID !== -1 && seatsID[i] - lastID === 2) {
      return seatsID[i] - 1;
    }
    lastID = seatsID[i];
  }
};

const data = readDataFromFile();

const resultP1 = binaryBoarding(data);
console.log(resultP1); //896

const resultP2 = binaryBoardingP2(data);
console.log(resultP2); //659
