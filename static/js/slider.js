/**
 *  This slider's script was written by me Aleksandre 
 *  bassed on the information which i got in the folowing videos:
 *  
 *  1)  https://www.youtube.com/watch?v=KHGc7eZyxKY&t=536s
 *  2)  https://www.youtube.com/watch?v=5bxFSOA5JYo
 */

// All sliders wrapper
let allSlider = Array.from(document.querySelectorAll('.video-slider-owerflow-hidden'));

// Get a single slide's rect
const slide = document.querySelector('.slide').getBoundingClientRect();


/**
 *  If a device is not a tablet so removing margin from sliding calculation
 */
let margin = 0;
if ( window.innerWidth >= 768 ) {
    margin = 30;
}

let pressed = false; // Check if a slide was pressed
const slideWidth = slide.width + margin; // Storing a single slide's width with margins
let preventClickSlide = 0; // Storing swipe range value to check id a slider has been moved or clicked
let obj = null; // Storing a current object
let innerSlider; // Storing a inner slider

//  Storing a values for a video blocks seperatly
let settings = {

    'my-list' : {
        'startx' : 0, // Storing a user's mouse/finger touch cordinates
        'cordinates' : 0, // Storing a user's mouse/finger cordinates on slide move
        'left' : 0, // Slider's left side position
        'prevTranslate' : 0, // Previous Translate
        'diff' : 0, // Difference bettwen slider's and it's container's right sides
        'boundary' : false, // Check to see if a slider crossed boundary
        'translatedValue' : 0, // Storing a slider's left position value to check if it was slided left or right
        'swipeRange' : 0, // How many pxs has been moved durring current sliding
        'swipeLength' : 1, // Incrementer of the slider's swiping length 
        'swipeValue' : slideWidth, // A value to swipe the slider each time
        'movedBy' : 0, // Storing a left position of a slider
    },
    'cont-watching' : {
        'startx' : 0,
        'cordinates' : 0,
        'left' : 0,
        'prevTranslate' : 0,
        'diff' : 0,
        'boundary' : false,
        'translatedValue' : 0,
        'swipeRange' : 0,
        'swipeLength' : 1,
        'swipeValue' : slideWidth,
        'movedBy' : 0,
    },
    'anatomy-videos' : {
        'startx' : 0,
        'cordinates' : 0,
        'left' : 0,
        'prevTranslate' : 0,
        'diff' : 0,
        'boundary' : false,
        'translatedValue' : 0,
        'swipeRange' : 0,
        'swipeLength' : 1,
        'swipeValue' : slideWidth,
        'movedBy' : 0,
    },
    'diseases-videos' : {
        'startx' : 0,
        'cordinates' : 0,
        'left' : 0,
        'prevTranslate' : 0,
        'diff' : 0,
        'boundary' : false,
        'translatedValue' : 0,
        'swipeRange' : 0,
        'swipeLength' : 1,
        'swipeValue' : slideWidth,
        'movedBy' : 0,
    },
    'subject-videos' : {
        'startx' : 0,
        'cordinates' : 0,
        'left' : 0,
        'prevTranslate' : 0,
        'diff' : 0,
        'boundary' : false,
        'translatedValue' : 0,
        'swipeRange' : 0,
        'swipeLength' : 1,
        'swipeValue' : slideWidth,
        'movedBy' : 0,
    },
    'playlist' : {
        'startx' : 0,
        'cordinates' : 0,
        'left' : 0,
        'prevTranslate' : 0,
        'diff' : 0,
        'boundary' : false,
        'translatedValue' : 0,
        'swipeRange' : 0,
        'swipeLength' : 1,
        'swipeValue' : slideWidth,
        'movedBy' : 0,
    }

}


/**
 *  Assigning events to the slider
 */
allSlider.forEach( ( slider ) => {

    // Touch Events
    slider.addEventListener( 'touchstart', touchStart);
    slider.addEventListener( 'touchmove', touchMove);
    slider.addEventListener( 'touchend', touchEnd);

    // Mouse Events
    slider.addEventListener("mousedown", touchStart);
    slider.addEventListener("mouseup", touchEnd);
    slider.addEventListener("mouseleave", touchEnd);
    slider.addEventListener("mousemove", touchMove);


});


// Function to call when a user touch a finger/mouse
function touchStart( e ) {

    obj = this; // Storing current slide object

    innerSlider = obj.querySelector(`.sliders-container`); // Geting current slider's inside div

    pressed = true; // User has pressed

    // Storing current touch point
    settings[`${obj.id}`].startx = getPositionX( e ) - innerSlider.offsetLeft; 
     
    innerSlider.classList.add( 'grabbing' ); // Adding a grabbing class

    // Storing inner slider's translated value
    settings[`${obj.id}`].translatedValue = getElementRectLeft();

}


/**
 * Function to call when a user moves a lider
 * @param {event} e 
 */
function touchMove( e ) {

    if( pressed ) { // If user has pressed

        settings[`${obj.id}`].cordinates = getPositionX(e); // Get slider's cordinates

        // Calculate slider's left position value
        settings[`${obj.id}`].left = settings[`${obj.id}`].cordinates - settings[`${obj.id}`].startx;

        // Storing left in move variable to use independent
        settings[`${obj.id}`].movedBy = settings[`${obj.id}`].left;

        // Calculating current swipe range;
        settings[`${obj.id}`].swipeRange = Math.abs( settings[`${obj.id}`].movedBy - settings[`${obj.id}`].prevTranslate );
        
        // Storing swipe range to other variable to use it in a prevent lick function
        preventClickSlide = settings[`${obj.id}`].swipeRange;

        // Assigning a value to the slider's left position
        innerSlider.style.left = `${ settings[`${obj.id}`].left }px`;

        // Checking to see if a slider gouse out of sliderable area
        checkSlidersEdges();

        // Incrementing a swipe lenght
        countSwipeLength();

        // Increamenting
        settings[`${obj.id}`].movedBy ++;

    }

}


/**
 *  Function to call when a user mooves out a finger/mouse
 */
function touchEnd() {

    pressed = false; // User has removed a finger/mouse

    innerSlider.classList.remove('grabbing'); // removing a grabbing class

    // Calculating previous translate and swipe values
    checkSwipeMaxRange();

    // Check to see if a slider goes outside of swipable area
    checkBoundary();

}


/**
 *  Checking to see if a user clicks fast on the slider
 *  If not returning a true and allowing to start slliding
 * @returns if a slider is not moved more than 10px returning false
 */
function startSliding() {

    if ( preventClickSlide > 10 ) {

        preventClickSlide = 0;

        return true;

    }

    return false;

}


/**
 * Depending on a device returning a user finger/mouse touch point
 * @param {event} e  
 */
function getPositionX( e ) {

    return e.type.includes( 'mouse' ) ? e.pageX : e.touches[0].clientX;

}


/**
 *  Cheking to see if a slider goes outside a swipable area.
 *  If so depending on the direction accordingly assigning a true value to the
 *  variables: leftSide and rightSide
 */

let leftSide = false;
let rightSide = false;

function checkSlidersEdges () {

    let outer = obj.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    // Check to prevent a swipe of the first slide to the right
    if ( parseInt( innerSlider.style.left ) > 0 ) {

        settings[`${obj.id}`].boundary = true;
        
        leftSide = true;

        return true;

    }

    // If a inslide slider's right position is less than outer slider's right position
    if ( inner.right < outer.right ) {

        settings[`${obj.id}`].boundary = true;

        rightSide = true;

        return true;

    }

    // Storing a differance beetwen outer and inside slider's right sides.
    settings[`${obj.id}`].diff = inner.width - outer.width;
    
}


/**
 *  Incrementing a swipeLength variable 
 */
function countSwipeLength(){

    if ( settings[`${obj.id}`].swipeRange >= settings[`${obj.id}`].swipeLength * slideWidth) {

        settings[`${obj.id}`].swipeLength ++;
    }

}


/**
 *  Calculating previouse translated and swiped values
 */
function checkSwipeMaxRange() {

    if ( settings[`${obj.id}`].swipeRange >= ( settings[`${obj.id}`].swipeLength - 1 ) * slideWidth ) {

        if ( leftOrRight() ) {

            settings[`${obj.id}`].prevTranslate += ( settings[`${obj.id}`].swipeLength - 1 ) * slideWidth;

            settings[`${obj.id}`].swipeValue -=  ( settings[`${obj.id}`].swipeLength - 1 ) * slideWidth;

        } else {

            settings[`${obj.id}`].swipeValue += ( settings[`${obj.id}`].swipeLength - 1 ) * slideWidth;

            settings[`${obj.id}`].prevTranslate -= ( settings[`${obj.id}`].swipeLength - 1 ) * slideWidth;


        }

    }

}


/**
 *  Checking a boundary of a slider to see if it goes outside swipable area.
 *  If so returning a slider at the defoult position
 *  And if slider did not crosse a boundary making a
 *  One slider transition
 */
function checkBoundary() {

    if ( settings[`${obj.id}`].boundary ) {

        if( leftSide ) { // If a slider crosses a left side

            if ( startSliding() ) {

                setDefaultLeft(); // returning to the defoult left position

                leftSide = false;
    
                return;

            }

        } else if ( rightSide )  {  // If a slider crosses a right side

            if ( startSliding() ) {

                setDefaultRight(); // returning to the defoult right position

                rightSide = false;

            }

        }

    } else { // If a slider doesn't cross a boundary 

        transitionByOneSlide(); // Calling a slider's transition function

        settings[`${obj.id}`].boundary = false;

    }
   
}

/**
 *  This funcrion sets a default left position to the slider 
 *  if it crosses a left side boundary
 */
function setDefaultLeft() {

    let backToZero = setInterval( () => {
        
        settings[`${obj.id}`].left -= 10;

        // Rounding a left position's value
        if ( settings[`${obj.id}`].left < -20 || settings[`${obj.id}`].left > 20 ) {

            settings[`${obj.id}`].left = 0;

        }
        
        // When it less than 0 stopping a interval
        if ( settings[`${obj.id}`].left <= 0 ) {
 
            clearInterval( backToZero ); // Stopping a interval

            /* Setting a defoult values to the following variables : */

            settings[`${obj.id}`].boundary = false;

            settings[`${obj.id}`].prevTranslate = 0;

            settings[`${obj.id}`].swipeLength = 1;

            settings[`${obj.id}`].swipeValue = slideWidth;
 
        }
        
        // Assignin a left side position to the slider
        innerSlider.style.left = `${ settings[`${obj.id}`].left }px`;
 
    },1)
 
 }
 
 
/**
 *  This funcrion sets a default right position to the slider 
 *  if it crosses a right side boundary
 */
 function setDefaultRight() {
 
     let backTo = setInterval( () => {
 
        settings[`${obj.id}`].left += 10;
         
         // If a left is more than previously translated stopping a interval
         if( settings[`${obj.id}`].left >= -settings[`${obj.id}`].diff ) {
 
             clearInterval( backTo ); // Stopping a inteval
            
             /* Setting a defoult values to the following variables : */

             settings[`${obj.id}`].boundary = false;

             settings[`${obj.id}`].swipeLength = 1;
 
         }
         
         // Assigning a value to the slider
         innerSlider.style.left = `${ settings[`${obj.id}`].left }px`;
 
     },1)
   
 }


/**
 *  This function check and prepears a slider to make one swipe left or right
 */
function transitionByOneSlide() {

    if ( leftOrRight() ) { // If a slider moves to the right

        // If a slider's current move is more than 100px
        if ( settings[`${obj.id}`].movedBy > ( settings[`${obj.id}`].prevTranslate + 100) ) {

            if ( startSliding() ) { // If slider has been moved more than 10px

                swipeRight(); // Make a right swipe

            }
    
        } else { // If a slider has not moved more than 100px

            if ( startSliding() ) {

                backToLeftt(); // Returning back to it's original position 

            }

        }

    } else { // If a slider moves to the left

        // If a slider has been moved more than 100px
        if ( settings[`${obj.id}`].movedBy < settings[`${obj.id}`].prevTranslate - 100 ) {      

            if ( startSliding() ) { // if a slider is not moved by many clicks

                swipeLeft(); // Make a swipe to the left

            } 
    
        } else { // If a slider has not moved more than 100px

            if ( startSliding() ) { // And it wasn't moved by clicks

                backToRight(); // Returning a lider to the starting position

            }

        }

    }
    
}



/**
 *  If ia user slides to the right side and he/she doesn't make it more than 100px
 *  so this function returns a slider at the starting position
 */
function backToRight() {

    let toRight = setInterval( () => {

        settings[`${obj.id}`].movedBy += 10;

        // When it is a close to finish rounding it ro the prevTranslate's value;
        if ( settings[`${obj.id}`].movedBy > 15 || settings[`${obj.id}`].movedBy < 15 ) {

            settings[`${obj.id}`].movedBy = settings[`${obj.id}`].prevTranslate;

        }

        innerSlider.style.left = ` ${ settings[`${obj.id}`].movedBy }px `;

        // Check to see when a slider comes close to the prevously translated value
        if ( settings[`${obj.id}`].movedBy >= settings[`${obj.id}`].prevTranslate ) {

            clearInterval( toRight );

        }

    },1)
}



/**
 *  If ia user slides to the left side and he/she doesn't make it more than 100px
 *  so this function returns a slider at the starting position
 */
function backToLeftt() {

    let toLeft = setInterval( () => {

        settings[`${obj.id}`].movedBy -= 10;

        innerSlider.style.left = ` ${ settings[`${obj.id}`].movedBy }px `;

        if ( settings[`${obj.id}`].movedBy <= settings[`${obj.id}`].prevTranslate ) {

            clearInterval( toLeft );

        }

    },1)
}


/**
 *  This function checks to find a direction of the sliding
 */
let right = Boolean;
function leftOrRight() {

    if ( getElementRectLeft() < settings[`${obj.id}`].translatedValue ) {

        right = false;

    } else {

        right = true;

    }

    return right;

}


/**
 *  This function return a inside slider's left position
 */
function getElementRectLeft() {

    let rect = innerSlider.getBoundingClientRect();

    return rect.left;
}



/**
 *  This function swipes to the left side
 */
function swipeLeft() {
    
    let sliderSwipe = setInterval( () => { // Starting a interval

        settings[`${obj.id}`].movedBy -= 10; // Decrementing 

        // Assigning a value to the slider's left position
        innerSlider.style.left = `${ settings[`${obj.id}`].movedBy }px`; 

        if ( settings[`${obj.id}`].movedBy < -settings[`${obj.id}`].swipeValue ) {

            clearInterval( sliderSwipe ); // Clearing a interval

            settings[`${obj.id}`].movedBy = 0; // Making a moved by a 0

            settings[`${obj.id}`].prevTranslate = innerSlider.offsetLeft;

            settings[`${obj.id}`].swipeValue += slideWidth;

            settings[`${obj.id}`].swipeLength = 1;

        }

    },1)

}


/**
 *  This function swipes to the right side
 */
function swipeRight() {
    
    let sliderSwipe = setInterval( () => { // Starting a sliding

        settings[`${obj.id}`].movedBy += 10; // Incrementing

        // Assigning a value to the left position of the slider
        innerSlider.style.left = `${ settings[`${obj.id}`].movedBy }px`;

        if ( settings[`${obj.id}`].movedBy > settings[`${obj.id}`].prevTranslate + slideWidth ) {

            clearInterval( sliderSwipe ); // Clearing a interval

            settings[`${obj.id}`].movedBy = 0;

            settings[`${obj.id}`].prevTranslate = innerSlider.offsetLeft;

            settings[`${obj.id}`].swipeValue -= slideWidth;

            settings[`${obj.id}`].swipeLength = 1;

        }

    },1)

}


// // Animation function
// function animation() {
    
//     setSliderPosition();

//     // If a user tuches to the slide so starting animation
//     if(pressed) requestAnimationFrame(animation);
// }


// function setSliderPosition(){

//     innerSlider.style.left = `${ left }px`;
    
// }






// //  Get a translateX value
// function getTranslateX() {

//     var style = window.getComputedStyle(innerSlider);
//     var matrix = new WebKitCSSMatrix(style.transform);
//     return Number(matrix.m41);
// }







/* 
   This code was written by this tutorial: 
   https://www.youtube.com/watch?v=5bxFSOA5JYo&t=859s
 */

// // Selectinig all slides
// const allSlides = Array.from(document.querySelectorAll(".slide"));

// // Defining variables
// let isDragging = false,
//     animationID = 0,
//     sliderLength = 1,
//     slider = '',
//     slides = [],
//     obje = null,
//     swiped = false;


// // Defining a variables to store values of each slider-containers
// let valuesStorage = {
//     // Slider Container's name
//     'mylist-sliders-container' : {
//         'startPos' : 0,
//         'currentTranslate' : 0,
//         'prevTranslate' : 0,
//         'currentIndex' : 0

//     },
//     // Slider Container's name
//     'cont-watching-sliders-container' : {
//         'startPos' : 0,
//         'currentTranslate' : 0,
//         'prevTranslate' : 0,
//         'currentIndex' : 0

//     } ,
//     // Slider Container's name
//     'by-anatomy-sliders-container' : {
//         'startPos' : 0,
//         'currentTranslate' : 0,
//         'prevTranslate' : 0,
//         'currentIndex' : 0

//     },
//     // Slider Container's name
//     'by-diseases-sliders-container' : {
//         'startPos' : 0,
//         'currentTranslate' : 0,
//         'prevTranslate' : 0,
//         'currentIndex' : 0

//     },
//     // Slider Container's name
//     'by-subject-sliders-container' : {
//         'startPos' : 0,
//         'currentTranslate' : 0,
//         'prevTranslate' : 0,
//         'currentIndex' : 0

//     },
//     // Slider Container's name
//     'playlist-sliders-container' : {
//         'startPos' : 0,
//         'currentTranslate' : 0,
//         'prevTranslate' : 0,
//         'currentIndex' : 0

//     }
// }


//  // Assigning a events for a each video slide  
// allSlides.forEach((slide, index) => {

//     // const slideDesc = slide.querySelector('p');
//     // slideDesc.addEventListener('dragstart', (e) => e.preventDefault );

//     // Touch Events
//     slide.addEventListener("touchstart", touchStart(index));
//     slide.addEventListener("touchend", touchEnd);
//     slide.addEventListener("touchmove", touchMove);

//     // Mouse Events
//     slide.addEventListener("mousedown", touchStart(index));
//     slide.addEventListener("mouseup", touchEnd);
//     slide.addEventListener("mouseleave", touchEnd);
//     slide.addEventListener("mousemove", touchMove);
    
// });


// // Starting a sliding 
// function touchStart(index) {

//     return function(event){
        
//         // Set a current object for a global use
//         obje = this;
        
//         let test = obje.getBoundingClientRect();

//         console.log(test.width)

//         valuesStorage[`${parentNode(obje)}`].currentIndex = index;

//         // Check to see if user has not yet swiped
//         let cIndex =  valuesStorage[`${parentNode(obje)}`].currentIndex;
//         let = cTranslate = valuesStorage[`${parentNode(obje)}`].currentTranslate;
//         if(cIndex === 0 || cIndex === 1 && swiped == false && cTranslate == 0){
//             showSwiping(this);  
//         }
        
//         // Storing a start position
//         valuesStorage[`${parentNode(this)}`].startPos = getPositionX(event);

//         isDragging = true;

//         // Selecting current container
//         slider = document.querySelector(`#${parentNode(this)}`);

//         // Selecting current container's slides 
//         slides = Array.from(document.querySelectorAll(`#${parentNode(this)} .slide`));

//         // // Storing a current slide's index
//         // valuesStorage[`${parentNode(obje)}`].currentIndex = slides.indexOf(this);

//         // Storing a current animation's ID
//         animationID = requestAnimationFrame(animation);

//         // Adding a grabbing class on a current container
//         slider.classList.add('grabbing');
//     }

// }


// // Finishing sliding
// function touchEnd() {

//     isDragging = false;

//     // Canceling animation
//     cancelAnimationFrame(animationID);

//     // If a user has already swiped so hidding the swipe icon
//     let = cIndex =  valuesStorage[`${parentNode(this)}`].currentIndex;
//     if(cIndex === 0 || cIndex === 1){
//         hideSwipe(this);  
//     }

//     // console.log(valuesStorage[`${parentNode(obje)}`].currentTranslate);
    
//     // Calculating how much a slide being moved
//     const movedBy = valuesStorage[`${parentNode(obje)}`].currentTranslate - 
//     valuesStorage[`${parentNode(obje)}`].prevTranslate;

//     // console.log(movedBy < -100 && valuesStorage[`${parentNode(obje)}`].currentIndex < slides.length - sliderLength)
    
//     // If a slide has been moved more than 100px to the left incrementing a index value
//     if(movedBy < -100 && valuesStorage[`${parentNode(obje)}`].currentIndex < slides.length - sliderLength) {

//         valuesStorage[`${parentNode(obje)}`].currentIndex += 1;
//         // When a user makes first swipe so setting a value to true
//         swiped = true;
//     }

//     // If a slide has been moved more than 100px to the right incrementing a index value
//     if(movedBy > 100 && valuesStorage[`${parentNode(obje)}`].currentIndex > 0) {
//         valuesStorage[`${parentNode(obje)}`].currentIndex -= 1;
//     }

//     // // Seting a position to the slide
//     // setPositionByIndex();

//     valuesStorage[`${parentNode(obje)}`].prevTranslate = 
//     valuesStorage[`${parentNode(obje)}`].currentTranslate;

//     // Removing a grabbing class to the container
//     slider.classList.remove('grabbing');

// }


// // Moving a slide
// function touchMove(event) {
//     // Checking if a user is swiping
//     if(isDragging){

//         // Storing a current position
//         const currentPosition = getPositionX(event);

//         // Calculatin a moving distance of the slide
//         valuesStorage[`${parentNode(obje)}`].currentTranslate =
//         valuesStorage[`${parentNode(obje)}`].prevTranslate + 
//         currentPosition - valuesStorage[`${parentNode(obje)}`].startPos;
//     }
// }


// // Depending on a device returning a slide's position
// function getPositionX(event) {
//     return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
// }


// // Animation function
// function animation() {
//     // Setting a position to the slide
//     setSliderPosition();

//     // If a user tuches to the slide so starting animation
//     if(isDragging) requestAnimationFrame(animation);
// }


// // Setting a position to the slide
// function  setSliderPosition(){
//     let ct = valuesStorage[`${parentNode(obje)}`].currentTranslate;
//     slider.style.transform = `translateX(${ct}px)`;
// }


// // // Setting a position  to the slide by index
// // function setPositionByIndex() {

// //     valuesStorage[`${parentNode(obje)}`].currentTranslate =
// //     valuesStorage[`${parentNode(obje)}`].currentIndex * -334;



// //     valuesStorage[`${parentNode(obje)}`].prevTranslate = 
// //     valuesStorage[`${parentNode(obje)}`].currentTranslate;

// //     // Setting a position to the slider
// //     setSliderPosition();
// // }

// // // Depending on the devices calculating a slider's translate value
// // function calcTranslateValue(obje){
// //     let wInnerW = window.innerWidth;
// //     if(wInnerW < 768) {
// //         return -wInnerW;
// //     }else if(wInnerW >= 768) {
// //         if(swiped == false && valuesStorage[`${parentNode(obje)}`].currentIndex != 1 ) {
// //             return -wInnerW / 4 + 15;
// //         } else {
// //             return -wInnerW / 2 + 15;
// //         }
// //     }
    
// // }


// // Storing a parent element's ID of the current slide
// function parentNode(obj) {
//     return obj.parentNode.id
// }

// // Show a swiping gif
// function showSwiping(obje){
//     obje.querySelector('.swipe-icon').classList.add('show-swiping');
// }

// // Hide a swiping gif
// function hideSwipe(obje) {
//     obje.querySelector('.swipe-icon').classList.remove('show-swiping');
// }


// let sliderWrapper = document.querySelector('.video-slider-owerflow-hidden');

// let innerSlider = document.querySelector('.sliders-container');

// function checkBoundary() {

//     let outer = sliderWrapper.getBoundingClientRect();
//     let inner = innerSlider.getBoundingClientRect();

//     console.log(outer);
//     console.log(inner);

//     if(parseInt(innerSlider.style.left) > 0){
//         innerSlider.style.left = '0px';
//     }else if(inner.right < outer.right) {
//         innerSlider.style.left = `-${inner.width - outer.width}px`;
//     }
// }