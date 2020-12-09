const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .toString()
    .split("\n");
};

/**
 * Run your copy of the boot code. Immediately before any instruction is executed a second time,
 * what value is in the accumulator?
 * @param {Array} instructions device's boot code.
 * @returns {Number} the value of the accumulator.
 */
const handheldHalting = (instructions) => {
  let accumulator = 0;
  let index = 0;
  const indexList = [];

  while (true) {
    const [instruction, value] = instructions[index].split(" ");

    if (!indexList.includes(index)) {
      indexList.push(index);
    } else {
      return accumulator;
    }

    if (instruction === "acc") {
      accumulator += Number(value);
      index++;
    }
    if (instruction === "jmp") {
      index += Number(value);
    }
    if (instruction === "nop") {
      index++;
    }
  }
};

/**
 * Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp).
 * What is the value of the accumulator after the program terminates?
 * @param {Array} instructions device's boot code.
 * @returns {Number} the value of the accumulator.
 */
const handheldHaltingP2 = (instructions) => {
  let accumulator = 0;
  let index = 0;
  let indexList = [];
  const instructionChangedIndexList = [];
  let isChanged = false;

  while (instructions.length !== index) {
    if (!indexList.includes(index)) {
      indexList.push(index);
    } else {
      index = 0;
      accumulator = 0;
      isChanged = false;
      indexList = [];
    }

    let [instruction, value] = instructions[index].split(" ");

    if (!instructionChangedIndexList.includes(index) && !isChanged) {
      instructionChangedIndexList.push(index);
      isChanged = true;
      if (instruction === "jmp") {
        instruction = "nop";
      } else if (instruction === "nop") {
        instruction = "jmp";
      }
    }

    if (instruction === "acc") {
      accumulator += Number(value);
      index++;
    }
    if (instruction === "jmp") {
      index += Number(value);
    }
    if (instruction === "nop") {
      index++;
    }
  }
  return accumulator;
};

const data = readDataFromFile();

const result = handheldHalting(data);
console.log(result); //1915

const resultP2 = handheldHaltingP2(data);
console.log(resultP2); //944
