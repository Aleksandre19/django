/* 
   This code was written by this tutorial: 
   https://www.youtube.com/watch?v=5bxFSOA5JYo&t=859s
 */

// Selectinig all slides
const allSlides = Array.from(document.querySelectorAll(".slide"));


// Defining variables
let isDragging = false,
    animationID = 0,
    slider = '',
    slides = [],
    obje = null,
    swiped = false;


// Defining a variables to store values of each slider-containers
let valuesStorage = {
    // Slider Container's name
    'mylist-sliders-container' : {
        'startPos' : 0,
        'currentTranslate' : 0,
        'prevTranslate' : 0,
        'currentIndex' : 0

    },
    // Slider Container's name
    'cont-watching-sliders-container' : {
        'startPos' : 0,
        'currentTranslate' : 0,
        'prevTranslate' : 0,
        'currentIndex' : 0

    } ,
    // Slider Container's name
    'by-anatomy-sliders-container' : {
        'startPos' : 0,
        'currentTranslate' : 0,
        'prevTranslate' : 0,
        'currentIndex' : 0

    },
    // Slider Container's name
    'by-diseases-sliders-container' : {
        'startPos' : 0,
        'currentTranslate' : 0,
        'prevTranslate' : 0,
        'currentIndex' : 0

    },
    // Slider Container's name
    'by-subject-sliders-container' : {
        'startPos' : 0,
        'currentTranslate' : 0,
        'prevTranslate' : 0,
        'currentIndex' : 0

    },
    // Slider Container's name
    'playlist-sliders-container' : {
        'startPos' : 0,
        'currentTranslate' : 0,
        'prevTranslate' : 0,
        'currentIndex' : 0

    }
}


 // Assigning a events for a each video slide  
allSlides.forEach((slide) => {

    // const slideDesc = slide.querySelector('p');
    // slideDesc.addEventListener('dragstart', (e) => e.preventDefault );

    // Touch Events
    slide.addEventListener("touchstart", touchStart());
    slide.addEventListener("touchend", touchEnd);
    slide.addEventListener("touchmove", touchMove);

    // Mouse Events
    slide.addEventListener("mousedown", touchStart());
    slide.addEventListener("mouseup", touchEnd);
    slide.addEventListener("mouseleave", touchEnd);
    slide.addEventListener("mousemove", touchMove);
    
});


// Starting a sliding 
function touchStart(index) {

    return function(event){
        
        // Set a current object for a global use
        obje = this;

        // Check to see if user has not yet swiped
        let = cIndex =  valuesStorage[`${parentNode(obje)}`].currentIndex;
        let = cTranslate = valuesStorage[`${parentNode(obje)}`].currentTranslate;
        if(cIndex === 0 && swiped == false && cTranslate == 0){
            showSwiping(this);  
        }
        
        // Storing a start position
        valuesStorage[`${parentNode(this)}`].startPos = getPositionX(event);

        isDragging = true;
    
        // Selecting current container
        slider = document.querySelector(`#${parentNode(this)}`);

        // Selecting current container's slides 
        slides = Array.from(document.querySelectorAll(`#${parentNode(this)} .slide`));

        // Storing a current slide's index
        valuesStorage[`${parentNode(obje)}`].currentIndex = slides.indexOf(this);

        // Storing a current animation's ID
        currentID = requestAnimationFrame(animation);

        // Adding a grabbing class on a current container
        slider.classList.add('grabbing');
    }

}


// Finishing sliding
function touchEnd() {

    isDragging = false;

    // Canceling animation
    cancelAnimationFrame(animationID);

    // If a user has already swiped so hidding the swipe icon
    let = cIndex =  valuesStorage[`${parentNode(this)}`].currentIndex;
    if(cIndex === 0){
        hideSwipe(this);  
    }

    // Calculating how much a slide being moved
    const movedBy = valuesStorage[`${parentNode(obje)}`].currentTranslate - 
    valuesStorage[`${parentNode(obje)}`].prevTranslate;

    // If a slide has been moved more than 100px to the left incrementing a index value
    if(movedBy < -100 && valuesStorage[`${parentNode(obje)}`].currentIndex < slides.length - 1) {
        valuesStorage[`${parentNode(obje)}`].currentIndex += 1;
        // When a user makes first swipe so setting a value to true
        swiped = true;
    }

    // If a slide has been moved more than 100px to the right incrementing a index value
    if(movedBy > 100 && valuesStorage[`${parentNode(obje)}`].currentIndex > 0) {
        valuesStorage[`${parentNode(obje)}`].currentIndex -= 1;
    }

    // Seting a position to the slide
    setPositionByIndex();

    // Removing a grabbing class to the container
    slider.classList.remove('grabbing');

}


// Moving a slide
function touchMove(event) {
    // Checking if a user is swiping
    if(isDragging){

        // Storing a current position
        const currentPosition = getPositionX(event);

        // Calculatin a moving distance of the slide
        valuesStorage[`${parentNode(obje)}`].currentTranslate =
        valuesStorage[`${parentNode(obje)}`].prevTranslate + 
        currentPosition - valuesStorage[`${parentNode(obje)}`].startPos;
    }
}


// Depending on a device returning a slide's position
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}


// Animation function
function animation() {
    // Setting a position to the slide
    setSliderPosition();

    // If a user tuches to the slide so starting animation
    if(isDragging) requestAnimationFrame(animation);
}


// Setting a position to the slide
function  setSliderPosition(){
    let ct = valuesStorage[`${parentNode(obje)}`].currentTranslate;
    slider.style.transform = `translateX(${ct}px)`;
}


// Setting a position  to the slide by index
function setPositionByIndex() {
    valuesStorage[`${parentNode(obje)}`].currentTranslate = 
    valuesStorage[`${parentNode(obje)}`].currentIndex * -window.innerWidth;

    valuesStorage[`${parentNode(obje)}`].prevTranslate = 
    valuesStorage[`${parentNode(obje)}`].currentTranslate;

    // Setting a position to the slider
    setSliderPosition();
}


// Storing a parent element's ID of the current slide
function parentNode(obj) {
    return obj.parentNode.id
}

// Show a swiping gif
function showSwiping(obje){
    obje.querySelector('.swipe-icon').classList.add('show-swiping');
}

// Hide a swiping gif
function hideSwipe(obje) {
    obje.querySelector('.swipe-icon').classList.remove('show-swiping');
}