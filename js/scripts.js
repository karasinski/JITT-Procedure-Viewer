/**************************************************************/
/* Prepares the cv to be dynamically expandable/collapsible   */
/**************************************************************/
function prepareList() {
  $('#expList').find('li:has(ul)').click(function(event) {
    if (this == event.target) {
      $(this).toggleClass('expanded');
      $(this).children('ul').toggle('fast');

      // Log which ID was toggled
      // Can grab text of step with $(this).clone().children().remove().end().text()
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
    $('.collapsed').addClass('expanded');
    $('.collapsed').children().show('fast');
  })
  $('#collapseList').unbind('click').click(function() {
    $('.collapsed').removeClass('expanded');
    $('.collapsed').children().hide('fast');
  })

};

/**************************************************************/
/* Functions to execute on loading the document               */
/**************************************************************/
$(document).ready(function() {
  prepareList()
});
