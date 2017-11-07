$(document).ready(function () {
  $('.button-primary').click((e) => {
    e.preventDefault();
    const num1 = Number($('#numPeople').val());
    const num2 = Number($('#numRounds').val());
    let sessions = pairingProblem(num1,num2);

    sessions.forEach((session, index) => {
      console.log('Session ' + (index + 1));
      session.forEach(pair => {
        console.log(pair);
      })
    });

    $('#numPeople').val('');
    $('#numRounds').val('');

  });
});
