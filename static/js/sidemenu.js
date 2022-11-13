// Open a side menu for tablet and lower devices
document.getElementById("open-side-menu").addEventListener("click", (event)=> {
    event.preventDefault();
    
    // Control animation start and finish to
    // avoit mixing of icons appereanse by 
    // clicking fast on it.
    let start = true

    if(start){
        start = false
        // Open menu
        let sideMenu=document.querySelector(".a-side-menu")
        sideMenu.classList.toggle("side-menu-open")

        // Toggle content of button
        let btn=document.getElementById("open-side-menu")
        let btnContent=btn.innerHTML.trim()

        if(btnContent == "Categories") {
            btn.classList.remove("side-menu-scale1")
            btn.classList.add("side-menu-scale0")

            btn.addEventListener("transitionend", () => {
                btn.innerHTML="X"
                btn.classList.add("side-menu-close-btn")
                btn.classList.remove("side-menu-scale0")
                btn.classList.add("side-menu-scale1")
                start = true
            })
        } else {
            btn.classList.remove("side-menu-scale1")
            btn.classList.add("side-menu-scale0")

            btn.addEventListener("transitionend", () => {
                btn.innerHTML="Categories"
                btn.classList.remove("side-menu-close-btn")
                btn.classList.remove("side-menu-scale0")
                btn.classList.add("side-menu-scale1")
                start = true
            })
        }
    }    
});

// Stick a top position on scrolling
document.addEventListener("scroll", ()=> {
    let position=document.body.getBoundingClientRect()
    document.querySelector(
        ".a-side-menu").style.top=Math.abs(position.top) + "px"
});