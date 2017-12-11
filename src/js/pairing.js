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
    const randomIndex = Math.floor(Math.random() * noOfPairs * 2);
    if (j > 0 && j % 2 === 0) studentsArr.push(studentsArr.splice(randomIndex, 1)[0]);
    for (let k = 0; k <= noOfPairs - 1; k++) {
      const l = k * 2;
      pairs[j].push([studentsArr[l], studentsArr[l + 1]]);
    }
    studentsArr.push(studentsArr.splice(1, 1)[0]);
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
    const trioPair = calcTrio % setOfPairs.length
    setOfPairs[trioPair].push(oddStudent)
    if (oddStudent > 1) oddStudent--
    else oddStudent = totalStudents
    // prevent value of calcTrio to go above number of pairs
    if (trioPair === setOfPairs.length) calcTrio -= setOfPairs.length
    else calcTrio++
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
