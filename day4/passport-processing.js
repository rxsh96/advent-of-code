const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\n\n");
};

const convertArrayToObject = (array) => {
  const object = {};
  for (let i = 0; i < array.length; i++) {
    const keyValue = array[i].split(":");
    object[keyValue[0]] = keyValue[1];
  }
  return object;
};

const keysValidation = (object) =>
  "byr" in object &&
  "iyr" in object &&
  "eyr" in object &&
  "hgt" in object &&
  "hcl" in object &&
  "ecl" in object &&
  "pid" in object;

const digitValidation = (digit, least, most) => digit >= least && digit <= most;

const hgtValidation = (hgt) => {
  const data = hgt.match(/[^\d]+|\d+/g);
  const height = Number(data[0]);
  const distanceUnit = data[1];
  if (distanceUnit === "cm") {
    return height >= 150 && height <= 193;
  }
  return height >= 59 && height <= 76;
};

const hclValidation = (hcl) => hcl.match("^#[a-fA-F0-9]+$") !== null;

const eclValidation = (ecl) =>
  ecl.match("^(amb|blu|brn|gry|grn|hzl|oth)$") !== null;

const pidValidation = (pid) => pid.length === 9;

/**
 * Detect how many passwords are valid in batch file data.
 * @param {Array} batchFileData   the passwords data.
 * @returns {Number} the total number of correct passwords.
 */
const passportProcessing = (batchFileData) => {
  let correctsPassports = 0;
  for (let i = 0; i < batchFileData.length; i++) {
    const passport = batchFileData[i];
    const passportElements = passport.split(/\s+/);
    const passportObject = convertArrayToObject(passportElements);
    if (keysValidation(passportObject)) {
      correctsPassports++;
    }
  }
  return correctsPassports;
};

/**
 * Detect how many passwords are valid in batch file data PART 2.
 * @param {Array} batchFileData   the passwords data.
 * @returns {Number} the total number of correct passwords.
 */
const passportProcessingP2 = (batchFileData) => {
  let correctsPassports = 0;
  for (let i = 0; i < batchFileData.length; i++) {
    const passport = batchFileData[i];
    const passportElements = passport.split(/\s+/);
    const passportObject = convertArrayToObject(passportElements);
    if (
      keysValidation(passportObject) &&
      digitValidation(passportObject["byr"], 1920, 2002) &&
      digitValidation(passportObject["iyr"], 2010, 2020) &&
      digitValidation(passportObject["eyr"], 2020, 2030) &&
      hgtValidation(passportObject["hgt"]) &&
      hclValidation(passportObject["hcl"]) &&
      eclValidation(passportObject["ecl"]) &&
      pidValidation(passportObject["pid"])
    ) {
      correctsPassports++;
    }
  }
  return correctsPassports;
};

const batchFileData = readDataFromFile();

const correctPasswordsP1 = passportProcessing(batchFileData);
console.log(correctPasswordsP1); //233

const correctPasswordsP2 = passportProcessingP2(batchFileData);
console.log(correctPasswordsP2); //111
