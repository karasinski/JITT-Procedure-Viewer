/**************************************************************/
/* Prepares the cv to be dynamically expandable/collapsible   */
/**************************************************************/
function prepareList() {
  experimentStarted = false;

  function data_log() {
    if (experimentStarted) {
      args = Array.prototype.slice.call(arguments);
      data = args.join();
      console.log(data);
      uint8array = encoder.encode(data + '\n');
      writer.write(uint8array);
    }
  }

  $('#expList')
    .find('li:has(ul)')
    .click(function(event) {
      if (this == event.target) {
        if (experimentStarted && $(this).hasClass('expanded')) {
          // you shouldn't be able to collapse during the experiment
        } else {
          $(this).toggleClass('expanded');
          $(this)
            .children('ul')
            .toggle('fast');

          if ($(this).hasClass('expanded')) {
            data_log(new Date().getTime(), this.id, 'expanded');
          } else {
            data_log(new Date().getTime(), this.id, 'collapsed');
          }
        }
      }
      return false;
    })
    .addClass('collapsed')
    .children('ul')
    .hide();

  //Create the button funtionality
  $('#expandList')
    .unbind('click')
    .click(function() {
      data_log(new Date().getTime(), 'expand all');
      $('.collapsed').addClass('expanded');
      $('.collapsed')
        .children()
        .show('fast');
    });
  $('#collapseList')
    .unbind('click')
    .click(function() {
      data_log(new Date().getTime(), 'collapse all');
      $('.collapsed').removeClass('expanded');
      $('.collapsed')
        .children('ul')
        .hide('fast');
    });

  // Set up this marker moving technology
  $currentElement = $('li:visible').first();
  $currentElement.find('> .info').css('border', '2px solid red');

  var down = function() {
    $('.info').css('border', '');
    $allElements = $('li:visible');

    if ($currentElement[0] == $allElements.last()[0]) {
      $nextElement = $('li:visible').first();
    } else {
      $nextElement = $($allElements[$.inArray($currentElement[0], $allElements) + 1]);
    }

    data_log(
      new Date().getTime(),
      'down from',
      $currentElement.attr('id'),
      'to',
      $nextElement.attr('id')
    );
    $currentElement = $nextElement;
    $currentElement.find('> .info').css('border', '2px solid red');

    $('body, html').animate(
      {
        scrollTop: $currentElement.position().top - 100
      },
      100
    );
  };

  var up = function() {
    $('.info').css('border', '');
    $allElements = $('li:visible');

    if ($currentElement[0] == $allElements.first()[0]) {
      $nextElement = $('li:visible').last();
    } else {
      $nextElement = $($allElements[$.inArray($currentElement[0], $allElements) - 1]);
    }

    data_log(
      new Date().getTime(),
      'up from',
      $currentElement.attr('id'),
      'to',
      $nextElement.attr('id')
    );
    $currentElement = $nextElement;
    $currentElement.find('> .info').css('border', '2px solid red');

    $('body, html').animate(
      {
        scrollTop: $currentElement.position().top - 100
      },
      100
    );
  };

  var beginExperiment = function() {
    filename = 'subject_' + $('#subjectid').val() + '.txt';
    fileStream = streamSaver.createWriteStream(filename);
    writer = fileStream.getWriter();
    encoder = new TextEncoder();

    $('.listControl').hide();
    experimentStarted = true;
    data_log(new Date().getTime(), 'experiment started');
  };

  var endExperiment = function() {
    data_log(new Date().getTime(), 'experiment ended');
    writer.close();
  };

  $(window).keypress(function(e) {
    if (event.key == 's') down();
    if (event.key == 'w') up();
    if (event.key == 'p') beginExperiment();
    if (event.key == 'q') endExperiment();
  });
  $('#down')
    .unbind('click')
    .click(down);
  $('#up')
    .unbind('click')
    .click(up);
}

/**************************************************************/
/* Functions to execute on loading the document               */
/**************************************************************/
$(document).ready(function() {
  prepareList();
});
