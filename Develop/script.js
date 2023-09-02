var currentDayDisplay = document.querySelector("#currentDay");
var calendarDisplay = document.querySelector("#calendar");
var timeBlocks = document.querySelectorAll(".time-block");
var saveButtons = document.querySelectorAll(".saveBtn");

var date = dayjs();
var currentHour = dayjs().hour();

$(currentDayDisplay).text(date.format("MMMM D, YYYY"));

setCalendarDisplay();

function handleSubmit() {
  var parent = $(this).parent();
  var parentID = $(this).parent().attr('id');
  var descriptionBox = $('#' + parentID).children(".description");
  var description = descriptionBox.val()

  localStorage.setItem("Description-" + parentID, description);
  
  setCalendarDisplay();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

    // console.log(calendarDisplay.children[0].children[1].textContent);
  // TODO: Add code to display the current date in the header of the page.
}

function setCalendarDisplay()
{
  for (let i = 0; i < timeBlocks.length; i++)
  {
    var timeBlock = $(timeBlocks[i]);
    var timeBlockID = $(timeBlocks[i]).attr('id');
    var hour = parseInt(timeBlockID);

    var test = 13;

    if (test > hour)
    {
      timeBlock.addClass('past');
    }
    else if (test === hour)
    {
      timeBlock.addClass('present');
    }
    else
    {
      timeBlock.addClass('future');
    }
  }

}

for (let i = 0; i < saveButtons.length; i++)
{
  saveButtons[i].addEventListener('click', handleSubmit);
}