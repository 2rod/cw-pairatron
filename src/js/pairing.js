const pairingProblem = (students, rounds) => {
  const studentsArr = []
  let oddStudent;
  for (let i = 1; i <= students; i++) {
    studentsArr.push(i)
  }
  if (students % 2 === 1) {
    if (students == 3) { // handle special case for 3
      return generateTrioCase(studentsArr, rounds);
    } else oddStudent = studentsArr.pop()
      students -=1
      const roundsOfPairs = generatePairs1(studentsArr, rounds)
      return handleOddStudent(roundsOfPairs, oddStudent);
  }
  return generatePairs1(studentsArr, rounds);
}

const generatePairs = (studentsArr, rounds) => {
  const pairs = [];
  const noOfPairs = studentsArr.length/2;
  for (let j = 0; j < rounds; j++) {
    pairs[j] = [];
    for (let k = 0; k <= noOfPairs - 1; k++) {
      const l = k * 2;
      pairs[j].push([studentsArr[l], studentsArr[l + 1]]);
    }
    studentsArr.push(studentsArr.splice(1, 1)[0]);
  }
  return pairs;
}

const generatePairs1 = (pairs, num2) => {
  const res = []
  let oddPair;

  for (let j = 0; j < num2; j++) {
    res[j] = []
    for (let k = 0; k < pairs.length/2; k++) {
      res[j].push([pairs[k], pairs[pairs.length - 1 - k]]);
    }
    pairs.splice(1, 0, pairs.pop());
  }
  return res;
}

const handleOddStudent = (roundsOfPairs, oddStudent) => {
  let calcTrio = 0;
  const trioPair = Math.floor(Math.random() * roundsOfPairs[0].length)
  const totalStudents = oddStudent;
  roundsOfPairs.forEach(setOfPairs => {
    setOfPairs.forEach(pair => {
      pair.forEach((student, i) => {
        if (student >= oddStudent) {
          student++
          pair[i] = student;
        }
      })
    })
    setOfPairs[trioPair].push(oddStudent)
    if (oddStudent > 1) oddStudent--
    else oddStudent = totalStudents
  })
  return roundsOfPairs;
}

const generateTrioCase = (numArr, rounds) => {
  let res = [];
  let round = [];
  let single;
  while (rounds) {
    single = numArr.shift();
    round = [];
    round.push([single], [...numArr]);
    res.push(round);
    numArr.push(single);
    rounds--;
  }
  return res;
}
