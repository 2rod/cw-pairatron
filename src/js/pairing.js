const pairingProblem = (num1, num2) => {
  const pairs = []
  let oddPair;
  for (let i = 1; i <= num1; i++) {
    pairs.push(i)
  }
  if (num1 % 2 === 1) {
    if (num1 == 3) { // handle special case for 3
      return generateTrioCase(pairs, num2);
    } else oddPair = pairs.pop()
      num1 -=1
  }
  return generatePairs(pairs, num2, oddPair);
}

const generatePairs = (numArr, numRounds, extraNum) => {
  const res = [];
  const halfLen = numArr.length/2;
  for (let j = 0; j < numRounds; j++) {
    res[j] = [];
    for (let k = 0; k < halfLen; k++) {
      res[j].push([numArr[k], numArr[numArr.length - 1 - k]]);
    }
    let l = getRandomInt(halfLen);
    if (extraNum !== undefined) {
      res[j][l].push(extraNum);
      const extraNum2 = res[j][l].shift();
      let m = getRandomInt(halfLen);
      m = getRandomInt(halfLen);
      res[j][m].push(extraNum2);
    }
    numArr.splice(1, 0, numArr.pop());
  }
  return res;
}

const generateTrioCase = (numArr, numRounds) => {
  let res = [];
  let round = [];
  let single;
  while (numRounds) {
    single = numArr.shift();
    round = [];
    round.push([single], [...numArr]);
    res.push(round);
    numArr.push(single);
    numRounds--;
  }
  return res;
}

const getRandomInt = (max) => {
  return Math.round(Math.random() * Math.floor(max - 1))
}
