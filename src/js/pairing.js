const pairingProblem = (num1, num2) => {
  const res = []
  const pairs = []
  let oddPair;
  for (let i = 1; i <= num1; i++) {
    pairs.push(i)
  }
  if (num1 % 2 === 1) {
    oddPair = pairs.pop()
    num1 -=1
  }
  for (let j = 0; j < num2; j++) {
    res[j] = []
    for (let k = 0; k < num1/2; k++) {
      res[j].push([pairs[k], pairs[num1 - 1 - k]]);
    }
    let l = Math.round(Math.random() * Math.floor(num1/2 - 1))
    if (oddPair !== undefined) {
      res[j][l].push(oddPair)
      if (num1 != 3) {
        const thirdPerson = res[j][l].shift()
        let m = Math.round(Math.random() * Math.floor(num1/2 - 1))
        while (m === l) {
          m = Math.round(Math.random() * Math.floor(num1/2 - 1))
        }
        res[j][m].push(thirdPerson)
      }
    }
    pairs.splice(1, 0, pairs.pop());
  }
  return res;
}
