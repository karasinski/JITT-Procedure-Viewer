/**************************************************************/
/* Prepares the cv to be dynamically expandable/collapsible   */
/**************************************************************/
function prepareList() {
  $('#expList').find('li:has(ul)').click(function(event) {
    if (this == event.target) {
      $(this).toggleClass('expanded');
      $(this).children('ul').toggle('fast');

      if ($(this).hasClass('expanded')) {
        console.log(this.id, 'expanded')
      } else {
        console.log(this.id, 'collapsed')
      }
    }
    return false;
  })
  .addClass('collapsed')
  .children('ul').hide();

  //Create the button funtionality
  $('#expandList').unbind('click').click(function() {
    console.log('expand all');
    $('.collapsed').addClass('expanded');
    $('.collapsed').children().show('fast');
  })
  $('#collapseList').unbind('click').click(function() {
    console.log('collapse all');
    $('.collapsed').removeClass('expanded');
    $('.collapsed').children('ul').hide('fast');
  })

  // Set up this marker moving technology
  $currentElement = $('li:visible').first();
  $currentElement.find('> .info').css('border', '2px solid red');

  var down = function() {
    $('.info').css('border', '');
    $allElements = $('li:visible');

    if ($currentElement[0] == $allElements.last()[0]) {
      $nextElement = $('li:visible').first();
    } else {
      $nextElement = $($allElements[$.inArray($currentElement[0], $allElements)+1]);
    }

    console.log('down from', $currentElement.attr('id'), 'to', $nextElement.attr('id'))
    $currentElement = $nextElement;
    $currentElement.find('> .info').css('border', '2px solid red')

    $("body, html").animate({
        scrollTop: $currentElement.position().top - 100
    });
  }

  var up = function() {
    $('.info').css('border', '');
    $allElements = $('li:visible');

    if ($currentElement[0] == $allElements.first()[0]) {
      $nextElement = $('li:visible').last();
    } else {
      $nextElement = $($allElements[$.inArray($currentElement[0], $allElements)-1]);
    }

    console.log('up', $currentElement.attr('id'), 'to', $nextElement.attr('id'));
    $currentElement = $nextElement;
    $currentElement.find('> .info').css('border', '2px solid red');
    
    $("body, html").animate({
        scrollTop: $currentElement.position().top - 100
    });
  }
  
  var beginExperiment = function() {
    $('.listControl').hide();
  }

  $(window).keypress(function(e) {
    if (event.key == "s") down();
    if (event.key == "w") up();
    if (event.key == "p") beginExperiment();
  });
  $('#down').unbind('click').click(down);
  $('#up').unbind('click').click(up);
}

/**************************************************************/
/* Functions to execute on loading the document               */
/**************************************************************/
$(document).ready(function() {
  prepareList()
});
