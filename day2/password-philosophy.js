const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./passwords.txt", { encoding: "utf-8" })
    .split("\r\n");
};

/**
 * Find how many passwords are valid according to the policies.
 * @param  {Array} database     The array of policies and passwords.
 * @return {Number}             The number of correct passwords.
 */
const passwordPhilosophy = (database) => {
  let goodPasswords = 0;
  for (let i = 0; i < database.length; i++) {
    const policyPassword = database[i].split(": ");
    const numberLetter = policyPassword[0].split(" ");
    const minMax = numberLetter[0].split("-");
    const occurrences = policyPassword[1].split(numberLetter[1]).length - 1;
    if (occurrences >= Number(minMax[0]) && occurrences <= Number(minMax[1])) {
      goodPasswords++;
    }
  }
  return goodPasswords;
};

/**
 * Find how many passwords are valid according to the new policies.
 * @param  {Array} database     The array of policies and passwords.
 * @return {Number}             The number of correct passwords.
 */
const passwordPhilosophyP2 = (database) => {
  let goodPasswords = 0;
  for (let i = 0; i < database.length; i++) {
    const policyPassword = database[i].split(": ");
    const numberLetter = policyPassword[0].split(" ");
    const firstLast = numberLetter[0].split("-");
    if (
      (policyPassword[1][firstLast[0] - 1] === numberLetter[1]) ^
      (policyPassword[1][firstLast[1] - 1] === numberLetter[1])
    ) {
      goodPasswords++;
    }
  }
  return goodPasswords;
};

const passwordList = readDataFromFile();

console.log(passwordPhilosophy(passwordList)); //483
console.log(passwordPhilosophyP2(passwordList)); //482
