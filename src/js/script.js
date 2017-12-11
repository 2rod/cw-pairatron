$(document).ready(function () {
  let $container = $('.container');
  let $numPeople = $('#numPeople');
  let $numRounds = $('#numRounds');
  let $button = $('.button-primary');
  let $error = $('.error');
  let $results = $('.results');
  let $table = $('.results table');
  $('.button-primary').click((e) => {
    e.preventDefault();

    $error.hide().html(''); // hide previous error messages

    $results.fadeOut('fast', () => { // hide previous
      $table.html(''); // empty table

      // grab form values
      const num1 = Number($numPeople.val());
      const num2 = Number($numRounds.val());

      // check for minimum values
      if (num1 < 3) { // display warning and focus on input fields
        $error.append(messageOutput('Number of people must be >= 3!'))
          .show();
        $numPeople.focus();
      }
      else if (num2 < 1) { // display warning and focus on input fields
        $error.append(messageOutput('Number of rounds must be >= 1!'))
          .show();
        $numRounds.focus();
      } else {
        // change value of submit button
        $button.attr('value', 'RUN AGAIN!');

        // generate pairings
        let sessions = pairingProblem(num1,num2);

        // set table headings & generate header row
        let headings = ['Exercise', 'Pairs'];
        $table.append(generateHeaderRow(headings));

        // loop thru generated pairings
        sessions.forEach((session, index) => {
          $table.append(generateRow(pairsOutput(session), ++index));
        });

        // reduce top margin from container
        $container.css('margin-top', 0);

        // remove hidden class to display results table
        $results.fadeIn('slow');
      }
    });

  });

  $numPeople.change(() => {
    $button.attr('value', 'GO!');
  });

  $numRounds.change(() => {
    $button.attr('value', 'GO!');
  });

  const pairsOutput = (pairs) => {
    let pairsStr = '';
    pairs.forEach((pair) => {
      pairsStr += JSON.stringify(pair) + ' ';
    });
    return pairsStr;
  };

  const messageOutput = (message) => {
    return `<p>${message}</p>`
  };
});
