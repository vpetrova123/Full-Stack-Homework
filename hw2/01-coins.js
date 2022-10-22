/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  // Add your code here
  if (input <= 0) {
    return `$${input} ==> No change needed`;
  }
  if (input > 10) {
    return `Error: the number is too large`;
  }
  if (isNaN(input)) {
    return `Error: Please enter a dollar amount`;
  }

  const COINS = [100, 25, 10, 5, 1];
  const COIN_NAMES = ["dollar", "quarter", "dime", "nickel", "penny"];

  let outputStr = `$${input} ==> `;
  input *= 100;
  let numCoins = 0;

  for (let i = 0; i < COINS.length; i++) {
    numCoins = Math.floor(input / COINS[i]);
    input -= numCoins * COINS[i];
    if (numCoins !== 0) {
      if (i === 4) {
        outputStr += `${numCoins} ${numCoins !== 1 ? `pennies` : `penny`}`;
      } else {
        outputStr += `${numCoins} ${
          numCoins !== 1 ? `${COIN_NAMES[i]}s, ` : `${COIN_NAMES[i]}, `
        }`;
      }
    }
  }
  return outputStr;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
//$0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
console.log(calculateChange(1.2));
