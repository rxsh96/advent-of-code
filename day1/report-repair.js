const fs = require("fs");

const readDataFromFile = () => {
  return fs
    .readFileSync("./report-repair.txt", { encoding: "utf-8" })
    .split("\r\n");
};

/**
 * Find the two years that sum targetYear and then multiply those two years together.
 * @param  {Array} years        The array of years.
 * @param  {Number} targetYear  The target year.
 * @return {Number}             The multiplication of the two years.
 */
const reportRepair = (years, targetYear) => {
  const yearsObject = {};

  for (let i = 0; i < years.length; i++) {
    const year = Number(years[i]);
    const yearComplement = targetYear - year;

    if (yearComplement in yearsObject) {
      if (yearComplement + yearsObject[yearComplement] === targetYear) {
        return yearComplement * yearsObject[yearComplement];
      }
    }
    yearsObject[year] = yearComplement;
  }
};

/**
 * Find the three years that sum targetYear and then multiply those two years together.
 * @param  {Array} years        The array of years.
 * @param  {Number} targetYear  The target year.
 * @return {Number}             The multiplication of the three years.
 */
const reportRepairP2 = (years, targetYear) => {
  let i = 0;

  while (i < years.length) {
    const year = Number(years[i]);
    const yearComplement = targetYear - year;
    const firstTwoYearsMult = reportRepair(
      years.slice(0, i).concat(years.slice(i + 1)),
      yearComplement
    );

    if (!firstTwoYearsMult) {
      i++;
    } else {
      return year * firstTwoYearsMult;
    }
  }
};

const datesList = readDataFromFile();

console.log(reportRepair(datesList, 2020)); //355875
console.log(reportRepairP2(datesList, 2020)); //140379120
