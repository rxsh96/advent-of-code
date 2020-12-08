const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\n");
};

const hasBag = (bag, bagObject) => bag in bagObject;

const convertLineToObject = (line) => {
  const [biggerBag, smallerBag] = line.split(" bags contain ");
  const bagList = [];
  const children = {};
  if (smallerBag !== "no other bags.") {
    bags = smallerBag.split(", ");
    for (let bag of bags) {
      const amount = Number(bag.match(/\d+/g));
      bag = bag.replace(/\d+/g, "");
      bag = bag.split(" ").join("");
      bag = bag.replace(/bags|bag|/g, "");
      bag = bag.replace(".", "");
      children[bag] = amount;
    }
  }
  bagList.push(biggerBag.replace(" ", ""));
  bagList.push(children);
  return bagList;
};

const getDataAsObject = (data) => {
  const masterObject = {};
  for (const line of data) {
    const children = convertLineToObject(line);
    masterObject[children[0]] = children[1];
  }
  return masterObject;
};

const countBagsRecursively = (data, searchBag) => {
  const bagList = data[searchBag];
  let count = 1;
  for (const bag in bagList) {
    count += bagList[bag] * countBagsRecursively(data, bag);
  }
  return count;
};

/**
 * How many bag colors can eventually contain at least one shiny gold bag?
 * @param {Array} data        bags and their contents.
 * @param {String} searchBag  bag color to be contained.
 * @returns {Number}          the total number of bags that contains eventually the searchBag.
 */
const handyHaversacks = (data, searchBag) => {
  const masterObject = getDataAsObject(data);
  const containersBags = [];

  // Contains directly
  for (const key in masterObject) {
    if (hasBag(searchBag, masterObject[key]) && !containersBags.includes(key)) {
      containersBags.push(key);
    }
  }

  //Contains indirectly
  for (const bag of containersBags) {
    for (const key in masterObject) {
      if (hasBag(bag, masterObject[key]) && !containersBags.includes(key)) {
        containersBags.push(key);
      }
    }
  }
  return containersBags.length;
};

/**
 * How many individual bags are required inside your single shiny gold bag?
 * @param {Array} data        bags and their contents.
 * @param {String} searchBag  color of the container bag.
 * @returns {Number}          the total number of bags that searchBag can contain.
 */
const handyHaversacksP2 = (data, searchBag) => {
  const masterObject = getDataAsObject(data);
  return countBagsRecursively(masterObject, searchBag) - 1;
};

const data = readDataFromFile();

const resultP1 = handyHaversacks(data, "shinygold");
console.log(resultP1); //224

const resultP2 = handyHaversacksP2(data, "shinygold");
console.log(resultP2); //1488
