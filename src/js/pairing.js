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
      const roundsOfPairs = generatePairs(studentsArr, rounds)
      return handleOddStudent(roundsOfPairs, oddStudent);
  }
  return generatePairs(studentsArr, rounds);
}

const generatePairs = (studentsArr, rounds) => {
  const pairs = [];
  const noOfPairs = studentsArr.length/2;
  for (let j = 0; j < rounds; j++) {
    pairs[j] = [];
    for (let k = 0; k < noOfPairs; k++) {
      pairs[j].push([studentsArr[k], studentsArr[studentsArr.length - 1 - k]]);
    }
    studentsArr.splice(1, 0, studentsArr.pop());
  }
  return pairs;
}

const handleOddStudent = (roundsOfPairs, oddStudent) => {
  let calcTrio = 0;
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
    const trioPair = calcTrio % roundsOfPairs.length
    setOfPairs[trioPair].push(oddStudent)
    calcTrio++
    if (oddStudent > 1) oddStudent --
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
