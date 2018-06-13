/**************************************************************/
/* Prepares the cv to be dynamically expandable/collapsible   */
/**************************************************************/
function prepareList() {
  experimentStarted = false;

  const UPKEY = 'w';
  const DOWNKEY = 's';
  const BEGINEXPERIMENTKEY = 'p';
  const ENDEXPERIMENTKEY = 'o';
  const EXPANDKEY = 'a';
  const COLLAPSEKEY = 'd';
  const PLAYKEY = 't';

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
      toggle(this);
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
  $currentElement.find('> .info').css('border', '2px solid limegreen');

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
    $currentElement.find('> .info').css('border', '2px solid limegreen');

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
    $currentElement.find('> .info').css('border', '2px solid limegreen');

    $('body, html').animate(
      {
        scrollTop: $currentElement.position().top - 100
      },
      100
    );
  };

  var toggle = function(that) {
    if (that == event.target || event.key == EXPANDKEY || event.key == COLLAPSEKEY) {
      if (experimentStarted && $(that).hasClass('expanded')) {
        // you shouldn't be able to collapse during the experiment
      } else {
        $(that).toggleClass('expanded');
        $(that)
          .children('ul')
          .toggle('fast');

        if ($(that).hasClass('expanded')) {
          data_log(new Date().getTime(), that.id, 'expanded');
          down();
        } else {
          data_log(new Date().getTime(), that.id, 'collapsed');
        }
      }
    }
    return false;
  };

  var toggleThat = function() {
    if ($currentElement.children('ul').length) {
      toggle($currentElement[0]);
    }
    play();
  };

  var play = function() {
    if ($currentElement.children('video').length) {
      video = $currentElement.children('video')[0]
      if (video.paused) {
        video.play();
      } else {
        video.currentTime = 0;
        video.play();
      }
    }
  }

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

  $(window).keyup(function(e) {
    if (event.key == DOWNKEY) down();
    if (event.key == UPKEY) up();
    if (event.key == BEGINEXPERIMENTKEY) beginExperiment();
    if (event.key == ENDEXPERIMENTKEY) endExperiment();
    if (event.key == EXPANDKEY) toggleThat();
    if (event.key == COLLAPSEKEY) toggleThat();
    if (event.key == PLAYKEY) play();
    e.preventDefault();
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
