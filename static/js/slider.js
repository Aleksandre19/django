/**
 *  This slider's script was written by me Aleksandre 
 *  bassed on the information which i got in the folowing videos:
 *  
 *  1)  https://www.youtube.com/watch?v=KHGc7eZyxKY&t=536s
 *  2)  https://www.youtube.com/watch?v=5bxFSOA5JYo
 */

// All sliders wrapper
let allSlider = Array.from(document.querySelectorAll('.video-slider-owerflow-hidden'));


// Setting a left position to the inner sliders
let containers = Array.from(document.querySelectorAll('.sliders-container'));

containers.forEach( ( container ) => {

    container.style.left = '0px';

});


/**
 *  Setting a click event listener to slider arrow switcher
 */
let arrows = Array.from( document.querySelectorAll( '.desk-video-switchwer' ) );

arrows.forEach( ( arrow ) => {

    arrow.addEventListener( 'click', switcher);
    arrow.addEventListener("mousedown", deskAddGrabbing);
    arrow.addEventListener("mouseup", deskRemoveGrabbing);

});


/**
 *  Depending on the devices removing margins and
 *  calculating each slide's width 
 */
let wiw = window.innerWidth;
let margin = 0;

if ( wiw >= 768 && wiw < 992 ) {
    
    margin = 30;

} else if ( wiw >= 992 ) {

    margin = 30;

    let slides = Array.from( document.querySelectorAll( ' .slide ' ) );

    slides.forEach( ( slide ) => {
        slide.style.width = ` ${ desktopSlideWidth() }px `;
    });

}


// Get a single slide's rect
const slide = document.querySelector('.slide').getBoundingClientRect();


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
        'leftSide' : false, 
        'rightSide' : false,
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
        'leftSide' : false, 
        'rightSide' : false,
    },
    'diseases' : {
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
        'leftSide' : false, 
        'rightSide' : false,
    },
    'subject' : {
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
        'leftSide' : false, 
        'rightSide' : false,
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
        'leftSide' : false, 
        'rightSide' : false,
    },
    'categories' : {
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
        'leftSide' : false, 
        'rightSide' : false,
    },
    'anatomy' : {
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
        'leftSide' : false, 
        'rightSide' : false,
    },
    'projects' : {
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
        'leftSide' : false, 
        'rightSide' : false,
    },
    'by-raitings' : {
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
        'leftSide' : false, 
        'rightSide' : false,
    },
    'same-videos' : {
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
        'leftSide' : false, 
        'rightSide' : false,
    }

}


/**
 * This function calculates each slider's width for desktop devices
 * @returns a each slider's width
 */
function desktopSlideWidth() {

    let wrapper = document.querySelector( '.video-slider-owerflow-hidden' ).getBoundingClientRect();
    let deskWidth = wrapper.width / 3 - 30;
    return deskWidth;

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
    //slider.addEventListener("mouseleave", touchEnd);
    slider.addEventListener("mousemove", touchMove);

});



/**
 *  By pressing on the switcher arrows adding a grabbing class
 */
function deskAddGrabbing() {

    if ( this.id == 'left' ) {
        elm = document.querySelector(`#${this.parentElement.nextElementSibling.children[0].id} 
        .sliders-container`).classList.add( 'grabbing' );
    } 

    if (this.id == 'right') {
        document.querySelector(`#${this.parentElement.previousElementSibling.children[0].id} 
        .sliders-container`).classList.add( 'grabbing' );
    }

}



/**
 *  By pressing on the switcher arrows removing a grabbing class
 */
function deskRemoveGrabbing() {
    let elm;

    if ( this.id == 'left' ) {
        elm = document.querySelector(`#${this.parentElement.nextElementSibling.children[0].id} 
        .sliders-container`);

        elm.addEventListener('transitionend', () => {
             elm.classList.remove('grabbing');
        });
    } 

    if ( this.id == 'right' ) {
        elm = document.querySelector(`#${this.parentElement.previousElementSibling.children[0].id} 
        .sliders-container`);

        elm.addEventListener('transitionend', () => {
            elm.classList.remove('grabbing');
        })
    }

}


/**
 * This function moves slider on the Desktop Devices
 * by clicking on the left or right arrows
 * @param {event} e 
 */
function switcher ( e ) {

    e.preventDefault();

    let selector;

    // Depending on the arrow's direction selecting a slider's container
    if ( this.dataset.direction == 'left' ) {
        selector = `#${this.parentElement.nextElementSibling.children[0].id} .sliders-container`;
    } 

    if ( this.dataset.direction == 'right' ) {
        selector = `#${this.parentElement.previousElementSibling.children[0].id} .sliders-container`;
    }
    
    // Get a Section Wrapper div for current arrow
    innerSlider = document.querySelector(`${ selector }`);
    
    // Get a current outer div element
    obj = innerSlider.parentElement;

    // Set a previouse translate to the movedBy variable
    settings[`${ obj.id }`].movedBy = settings[`${ obj.id }`].prevTranslate;

    // Checking edges
    checkSlidersEdges();
    
    // Sliding a slider to the left side
    if ( this.dataset.direction == 'left' ) {

        settings[`${ obj.id }`].leftSide = false;

        if ( !settings[`${ obj.id }`].rightSide ) {

            swipeLeft();        

        }

    }


    // Sliding a slider to the right side
    if ( this.dataset.direction == 'right' ) {

        settings[`${obj.id}`].rightSide = false;

        if ( !settings[`${obj.id}`].leftSide ) {

            swipeRight();

        }

    }  

}


// Function to call when a user touch a finger/mouse
function touchStart(e) {
    
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

        settings[`${obj.id}`].cordinates = getPositionX( e ); // Get slider's cordinates

        // Calculate slider's left position value
        settings[`${obj.id}`].left = settings[`${obj.id}`].cordinates - settings[`${obj.id}`].startx;

        // Storing left in move variable to use independently
        settings[`${obj.id}`].movedBy = settings[`${obj.id}`].left;

        // Calculating current swipe range;
        settings[`${obj.id}`].swipeRange = Math.abs( settings[`${obj.id}`].movedBy - settings[`${obj.id}`].prevTranslate );
        
        // Storing swipe range to other variable to use it in a prevent click function
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
function touchEnd( e ) {

    pressed = false; // User has removed a finger/mouse

    click = false;

    if (innerSlider.classList.contains('grabbing')) {
        innerSlider.classList.remove('grabbing'); // removing a grabbing class
    }
    
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

function checkSlidersEdges () {

    let outer = obj.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    // Check to prevent a swipe of the first slide to the right
    if ( parseInt( innerSlider.style.left ) >= 0 ) {

        settings[`${obj.id}`].boundary = true;

        settings[`${obj.id}`].leftSide = true;

        return true;

    }


    // If a inslide slider's right position is less than outer slider's right position
    if ( inner.right < outer.right ) {

        settings[`${obj.id}`].boundary = true;

        settings[`${obj.id}`].rightSide = true;

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

        if( settings[`${obj.id}`].leftSide ) { // If a slider crosses a left side

            if ( startSliding() ) {

                setDefaultLeft(); // returning to the default left position

                // leftSide = false;

                settings[`${obj.id}`].leftSide = false;
    
                return;

            }

        } else if ( settings[`${obj.id}`].rightSide )  {  // If a slider crosses a right side

            if ( startSliding() ) {

                setDefaultRight(); // returning to the default right position

                // rightSide = false;

                settings[`${obj.id}`].rightSide = false;

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


