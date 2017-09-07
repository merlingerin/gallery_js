///////////////////////////////////
//Main js - Initialize all methods
//////////////////////////////////
window.addEventListener('DOMContentLoaded', function() {
    $.init('.gallery__images');    /* -------- Initialize App Gallery, '.gallery__images' - container for rendered images*/
    $.inputSeach();                 /* -------- Initialize this method to activating search  */
    $.currentSize('.filter__list'); /* --------- Inititialize this method for filtering images by size*/
    lightbox.init();                /* --------- Custom lightbox lib with slider*/
});

window.addEventListener('load', function(){

    ///////////////////////////////////
    //Preloader toggle
    //////////////////////////////////
    setTimeout(function(){

        document.querySelector('.preloader').classList.add('disable');
        document.body.style.overflow = 'visible';


        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);

    }, 2000);

});