
// Get opacity value
function getElmOpacity(elm) {
    elmOpacity = window.getComputedStyle(elm).getPropertyValue("opacity");
    return elmOpacity;
}

// Fade out loading
window.addEventListener("load", () => {
// Grab element
let loadElm = document.querySelector('.loading');
let fadeOut = setInterval(() => {
        // Elements opacity
        opacity = getElmOpacity(loadElm);  
        // Decrease opacity
        if(opacity > 0){
            loadElm.style.opacity -= 0.03;
        } else { // Stop interval
            clearInterval(fadeOut);
            loadElm.style.opacity -= '0';
            loadElm.style.display = 'none';
        }
    }, 10)
});


// Initialize Bootstrap tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


/*
    This script is copyed from
    https://www.w3schools.com/howto/howto_js_countdown.asp
    and it is modified
*/

page = '';

function diasferoTimer(countDownDate){

    var countDownDate = countDownDate;
    
    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("days").innerHTML = days + ' : ';
        document.getElementById("houres").innerHTML = hours + ' : ';
        document.getElementById("minutes").innerHTML = minutes + ' : ';
        document.getElementById("seconds").innerHTML = seconds;
        
        //+ "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").innerHTML = 'END';
            document.getElementById("houres").innerHTML = 'END';
            document.getElementById("minutes").innerHTML = 'END';
            document.getElementById("seconds").innerHTML = 'END';
        }
    }, 1000);
}
