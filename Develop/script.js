var currentDayDisplay = document.querySelector("#currentDay");
var calendarDisplay = document.querySelector("#calendar");
var timeBlocks = document.querySelectorAll(".time-block");
var saveButtons = document.querySelectorAll(".saveBtn");
var clearButton = document.querySelector("#clearBtn");

var date = dayjs();
var currentHour = dayjs().hour();

$(currentDayDisplay).text(date.format("MMMM D, YYYY"));

setCalendarDisplay();
renderDescription();

function handleSubmit() 
{
  var parentID = $(this).parent().attr('id');
  var descriptionBox = $('#' + parentID).children(".description");

  var description = descriptionBox.val();

  localStorage.setItem("Description-" + parentID, description);

  setCalendarDisplay();
  renderDescription();

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

function renderDescription()
{
  for (let i = 0; i < timeBlocks.length; i++)
  {
    var timeBlockID = $(timeBlocks[i]).attr('id');
    var description = $(timeBlocks[i]).children(".description");
    var timeBlockDescription = localStorage.getItem("Description-" + timeBlockID);

    description.text(timeBlockDescription);
  }
}

function handleClear()
{
  for (let i = 0; i < timeBlocks.length; i++)
  {
    var timeBlockID = $(timeBlocks[i]).attr('id');
    var clear = " ";

    localStorage.setItem("Description-" + timeBlockID, clear);
  }
  renderDescription();
}

for (let i = 0; i < saveButtons.length; i++)
{
  saveButtons[i].addEventListener('click', handleSubmit);
}

clearButton.addEventListener('click', handleClear);