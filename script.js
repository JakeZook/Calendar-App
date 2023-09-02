//Variable declarations
var currentDayDisplay = document.querySelector("#currentDay");
var calendarDisplay = document.querySelector("#calendar");
var timeBlocks = document.querySelectorAll(".time-block");
var saveButtons = document.querySelectorAll(".saveBtn");
var clearButton = document.querySelector("#clearBtn");

//dayjs current date and hour
var date = dayjs();
var currentHour = dayjs().hour();

//Renders the current date to HTML
$(currentDayDisplay).text(date.format("MMMM D, YYYY"));

//Renders colors on the calendar when the page is loaded
setCalendarDisplay();
//Renders description on calendar when the page is loaded
renderDescription();

//runs when the submit button on each time block is clicked
function handleSubmit() 
{
  //Gets id of the parent element for the button clicked
  var parentID = $(this).parent().attr('id');
  //Gets the textarea for of the button clicked
  var descriptionBox = $('#' + parentID).children(".description");

  //The text value of the description box set to a new variable to move into local storage
  var description = descriptionBox.val();

  //Key is based off which ID element is in, sets the description value
  localStorage.setItem("Description-" + parentID, description);

  setCalendarDisplay();
  renderDescription();

}

//Changes color of each time block based on real time
function setCalendarDisplay()
{
  for (let i = 0; i < timeBlocks.length; i++)
  {
    //Current time block
    var timeBlock = $(timeBlocks[i]);
    //Current time block ID
    var timeBlockID = $(timeBlocks[i]).attr('id');
    //Converts ID string to number
    var hour = parseInt(timeBlockID);

    //Compares current time to the timeID in the time block
    if (currentHour > hour)
    {
      //Event is in the past
      timeBlock.addClass('past');
    }
    else if (currentHour === hour)
    {
      //Event is now
      timeBlock.addClass('present');
    }
    else
    {
      //Event is in the future
      timeBlock.addClass('future');
    }
  }
}

//Renders each time block description from local memory
function renderDescription()
{
  for (let i = 0; i < timeBlocks.length; i++)
  {
    //Gets current time block
    var timeBlockID = $(timeBlocks[i]).attr('id');
    //Gets text box in current time block
    var description = $(timeBlocks[i]).children(".description");
    //Gets description from local storage of each time block
    var timeBlockDescription = localStorage.getItem("Description-" + timeBlockID);

    //Renders the description into the text box for the current time block
    description.text(timeBlockDescription);
  }
}

//When clear button clicked, clear local storage
function handleClear()
{
  for (let i = 0; i < timeBlocks.length; i++)
  {
    //Gets current time block ID
    var timeBlockID = $(timeBlocks[i]).attr('id');
    //Empty string to replace description in local storage
    var clear = " ";

    //Set time block description in local storage to blank
    localStorage.setItem("Description-" + timeBlockID, clear);
  }

  //Render the updated, empty description
  renderDescription();
}

//Adds listener to each button in the calendar
for (let i = 0; i < saveButtons.length; i++)
{
  saveButtons[i].addEventListener('click', handleSubmit);
}

//Adds listener to clear button
clearButton.addEventListener('click', handleClear);