// This script is written by this video:
// https://www.youtube.com/watch?v=o1yMqPyYeAo

const date = new Date();

let eventday = [[4,13],[3,24],[3,17],[2,11],[7,18],[7,23],[8,18],[8,4],[9,18],[10,4]];
let eventLink = '/';

let calendarInit = (eventday, eventLink) =>{
    
    // let eday = eventday;

    // Geg a container of the calendar's days
    const currentMonthDays = document.querySelector(".days");

    // Get a last day of the current month
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Get a last day name of the previous month
    let prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();

    // Get a week day when a the current month starts
    const firstDayIndex = date.getDay(); 

    // Get a week day name of the last day for the current month
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    // Calculate a quantity of the loop iteration for the next days
    let nextMonthsDays = 7 - lastDayIndex - 1; 

    // Array for the month days
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    // Set a current month to the calendar
    document.querySelector(".showen-month").innerHTML = month[date.getMonth()];

    let days = "";

    // Set a previuos month's days
    for(let x = firstDayIndex; x > 0; x-- ){
        days += `<div class="prev-month">${prevLastDay - x + 1}</div>`;
    }


    // Set a current month's days
    for(let i = 1; i <= lastDate; i++){
        days += `<div>${i}</div>`;   
    }


    // Set a next month's days
    for(let j = 1; j <= nextMonthsDays; j++){
        days += `<div class="next-month">${j}</div>`;
        currentMonthDays.innerHTML = days;
    }


    // Set a event's days to the calendar
    for(let m = 0; m < eventday.length; m++){
        if(eventday[m][0] === date.getMonth()){
           let element = document.querySelector(`.days div:nth-child(${eventday[m][1]})`);  
           element.classList.add("event-day");
           element.innerHTML = `<a href="" class="event-day-a-tag">${eventday[m][1]}</a>`;
        }
    }

    
}



// Switch to the previous month
document.querySelector(".switch-to-prev-month").addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    calendarInit(eventday, eventLink);  
});


// Switch to the next month
document.querySelector(".switch-to-next-month").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    calendarInit(eventday, eventLink);
});



