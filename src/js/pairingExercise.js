/**
  Given the following inputs:
  - An integer >= 2, num1
  - An integer >= 6, num2

  Define a function that takes the 2 inputs, and outputs the following:
  - num2 permutations of pairs of all integers from 1 up to num1, in an array of arrays containing each pair
  - e.g.,
      for num1 = 4, num2 = 6
      [[1,2],[3,4]]
      [[1,3],[2,4]]
      [[1,4],[2,3]]
      [[1,2],[3,4]]
      [[1,3],[2,4]]
      [[1,4],[2,3]]

  Restrictions/Assumptions:
  - Do not print equivalent associative arrays; e.g., [1,2] & [2,1]
  - Avoid having the same array pairs in consecutive permutations
  - If num1 is odd:
  -- provide 1 array of 3 numbers (trio array); e.g., [5,6,7]
  -- minimize the occurence of having the same numbers appear inside the trio array
  -- minimize the occurence of having numbers that appear inside the trio array for consecutive permutions
  - You may use other data structures, aside from arrays, to display the results
*/

// for even num1
// create num1 / 2 pairs (empty arrays)
// start populating the arrays by looping thru numbers up to num1
// for next permutation, start filling arrays with 1 then next number in sequence up to num1
// then go back to 2 and drop into last position
// 1234, 1342, 1423
// 12 34 56, 13 45 62, 14 *56 23 (14 25 36), 15 *62 *34 (15 23 46), 16 *23 *45 (16 24 35)

// keep track of used pairs and when they were paired
// before dropping in a number into a pair, check for existence of pair
// if pair already used, move to next number


// for odd num1
// same process,
// when determining number of pairs, round up
//drop last number in a single array initially
// find a trio
// keep track of trio and permuation number
// for subsequent trios, check against past trios
// check if current num in trio in past permutations



// Alternative
// Create pairs for each number by iterating up to num1, and creating subsequent pairs with each number up to num1. Save them into a queue.
// Start creating each permutation starting with 1st pair, then moving thru queue until max pairs reached
// need to check if dequeued pair contains any of the numbers in previous pairs
// then move to next pair, and go thru queue to build permutations, until max pairs reached

// Other
// randomize order of numbers up to num1
// then start pairing

const pairingExercise = (num1, num2) => {
  // determine number of pairs
  let numPairs = Math.round(num1 / 2);
  let pairsQueue = generatePairs(num1);
  console.log('pairsQueue', pairsQueue);
  let triedPairs = [];
  const allSessions = [];
  // const numQueue = generateQueue(num1);
  let trackSessions = num2;
  // start tracking number of sessions
  let prevSession = new Session();

  while (trackSessions) {
    let currentSession = new Session();
    let trackPairs = numPairs;

    while (trackPairs) {
      // let currentPair = getRandomPair(num1);
      let currentPair = pairsQueue.shift();

      while (currentPair && currentPair.isComplete) {
        triedPairs.push(currentPair);
        // currentPair = currentPair ? currentPair : triedPairs.shift();
        if (currentPair.isChecked(currentSession, prevSession)) {
          currentSession.pairs.push(currentPair);
          trackPairs--;
          currentPair = pairsQueue.shift();
        } //else {
          // currentPair = triedPairs.shift();
          // if (currentPair && currentPair.isChecked(currentSession)) {
          //   console.log('currentPair', currentPair);
          //   currentSession.pairs.push(currentPair);
          //   trackPairs--;
          // }
        //}
      }
    }

    allSessions.push(currentSession);
    prevSession = currentSession;
    trackSessions--;
  }

  return allSessions;
};

function generateQueue(max) {
  let arr = [];

  for (let i = 1; i <= max; i++) {
    arr.push(i);
  }

  return arr;
}

function getRandomPair (max) {
  let firstNum = generateRandomInt(max);
  let secondNum;

  while (!secondNum) {
    secondNum = generateRandomInt(max);
    if (secondNum === firstNum) secondNum = NaN;
  }

  return new Pair(firstNum, secondNum);
}

function generatePairs (max) {
  let numQueue = generateQueue(max);
  let pairs = [];
  let current;

  while (numQueue.length) {
    current = numQueue.shift();
    let arr = numQueue.map(function (next) {
      return new Pair(current, next);
    });
    pairs = [...pairs, ...arr];
  }
  return pairs;
}


function generateRandomInt (max) {
  let num = Math.round(Math.random()*max);
  while (num === 0) num = Math.round(Math.random()*max);
  return num;
}

const Pair = function (num1, num2) {
  this.first = num1;
  this.second = num2;
};

Pair.prototype.getValue = function (key) {
  return this[key];
};

Pair.prototype.contains = function (value) {
  return (this.first === value || this.second === value);
};

Pair.prototype.isComplete = function () {
  return (this.first !== undefined && this.second !== undefined);
}

Pair.prototype.isChecked = function (session, prevSession) {
  return (!session.contains(this)
    && !session.contains(this.first)
    && !session.contains(this.second)
    && (prevSession && !prevSession.contains(this)));
}

const Session = function () {
  this.pairs = [];
};

Session.prototype.contains = function (value) {
  if (typeof value === 'number') {
    return this.pairs.find(function (pair) { return pair.contains(value) });
  } else return this.pairs.filter((el) => {
    if ((el.first === value.first && el.second === value.second) ||
    (el.first === value.second && el.second === value.first)) return el;
  }).length;
};


// let session1 = new Session();
// session1.pairs.push(new Pair(1,2));
// session1.pairs.push(new Pair(3,4));
// console.log(session1);
// let result = session1.contains(4);
// console.log(result);
// console.log(result ? 'found' : 'not found' );
// let newPair = new Pair(2,3);
// console.log(newPair);
// console.log(newPair.isComplete());

// console.log(pairingExercise(4,6));

let sessions = pairingExercise(2,2);

sessions.forEach((session, index) => {
  console.log('Session ' + (index + 1));
  session.pairs.forEach((pair) => {
    console.log(pair);
  })
});

// console.log(getRandomPair(4));

// console.log(generateQueue(2));
// console.log(generatePairs(3));
