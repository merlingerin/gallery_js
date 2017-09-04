// 'use strict';

//Init app
(function $(selector, context){
    var elem = document.querySelector(selector + '');
    var images = [];
    fetch('https://unsplash.it/list')
                    .then(function(response) {
                        return response.json();
                        
                    })
                    .then(function(response) {
                        images = response.json();
                    }) 
                    .catch(function(error){
                        throw Error('Can\'t get photos!', error)
                    });
    
    document.addEventListener("DOMContentLoaded", function(event) {
        var btns = document.querySelectorAll('[data-action]');
        btns.forEach(function(item, idx){
            btns[idx].addEventListener('click', function(e){
                e.preventDefault();
                var btn = e.target.dataset["action"];
                switch(btn) {
                    case "getSmallPhoto":
                        console.log(images);
                        break;
                    case "getMiddlePhoto":
                        console.log('2');
                        break;
                    case "getLargePhoto":
                        console.log('3');
                        break;
                }
            });
        })
    });
    
    (function bindAction(){
        
    }());

    function myGallery() {
       console.log(typeof images);
    }

    function preloader() {

    }

    return {
        images: images,
        myGallery: myGallery
    }
}());

