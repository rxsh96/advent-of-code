const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\n\n");
};

/**
 * For each group, count the number of questions to which anyone answered "yes".
 * What is the sum of those counts?
 * @param {Array} data  the collected answers from every group on the plane.
 * @returns {Number}    the total number of "yes".
 */
const customCustoms = (data) => {
  let total = 0;
  for (const groupAnswer of data) {
    const lines = groupAnswer.split("\n");
    let unionSet = new Set();
    for (const personAnswer of lines) {
      const lineSet = new Set(personAnswer);
      unionSet = union(unionSet, lineSet);
    }
    total += unionSet.size;
  }
  return total;
};

/**
 * For each group, count the number of questions to which everyone answered "yes".
 * What is the sum of those counts?
 * @param {Array} data  the collected answers from every group on the plane.
 * @returns {Number}    the total number of "yes".
 */
const customCustomsP2 = (data) => {
  let total = 0;
  for (const groupAnswer of data) {
    const lines = groupAnswer.split("\n");
    let intersectionSet = new Set(lines[0]); //We have to init the set with some data for the intersection to work.
    for (const personAnswer of lines) {
      const lineSet = new Set(personAnswer);
      intersectionSet = intersection(intersectionSet, lineSet);
    }
    total += intersectionSet.size;
  }
  return total;
};

const union = (set1, set2) => {
  const finalSet = new Set();
  for (const element of set1) {
    finalSet.add(element);
  }
  for (const element of set2) {
    finalSet.add(element);
  }
  return finalSet;
};

const intersection = (set1, set2) => {
  const finalSet = new Set();
  for (const element of set1) {
    if (set2.has(element)) {
      finalSet.add(element);
    }
  }
  return finalSet;
};

const data = readDataFromFile();

const resultP1 = customCustoms(data);
console.log(resultP1); //6782

const resultP2 = customCustomsP2(data);
console.log(resultP2); //3596
