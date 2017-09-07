///////////////////////////////////
//Main js - Initialize all methods
//////////////////////////////////
window.addEventListener('DOMContentLoaded', function() {
    $.init('.gallery__images');
    $.inputSeach();
    $.currentSize('.filter__list');
    lightbox.init();
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