// 'use strict';
window.addEventListener('DOMContentLoaded', function(){
    $.init('.gallery__images');
    $.inputSeach();
});

//Init app
var $ = (function(selector, context){
    var init = function(selector) {
        return document.querySelector(selector + '');
    }
    var images = [],
        filteredArr = [];

    (async function getImages() {
        await fetch('https://unsplash.it/list')
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data){
                        images = data;
                        filterPhotos(data, '');
                    })
                    .catch(function(error){
                        throw new TypeError('Can\'t get photos!', error);
                    });
    }());

    function inputSeach() {
        var input = document.querySelector('.filter__input');

        input.addEventListener('keyup', function(e) {
            var value = e.target.value.toUpperCase();
            filteredArr = filteredArr.filter(function(item, idx) {
                return item.author.toUpperCase().indexOf(value) > -1;
            });
                console.log('Filtered by author: ', filteredArr);    
        });
    }
        
    function filterPhotos(data, size) {
        var amount = amount,
            images = data,
            template = '';  

        if(size === '') {

            filteredArr = images;

            // if( !images ) {
            //     template = `<div class="spinner">Loading...</div>`
            // }
            // for (var i = 0; amount > i; i++) {
            //     template += `<div class="image__container">
            //                         <a href="#" class="image_link">
            //                             <img src="https://unsplash.it/300/300?image=`+images[i].id+`" alt="image">
            //                             </a>
            //                     </div>`;
                // gallery__images.innerHTML(template);
        }
        else if (size === 'large') {

            filteredArr = images.filter(function(image){
                return image.width > 1500;
            });

        }
        else if (size === 'middle') {

            filteredArr = images.filter(function(image){
                return image.width < 1499 && image.width > 800;
            });

        }
        else if (size === 'small') {

            filteredArr = images.filter(function(image){
                return image.width < 799;
            });

        }

        console.log('filteredArr: ', filteredArr);
        document.querySelector('.gallery__images').innerHTML = template;
        
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        var btns = document.querySelectorAll('[data-action]');
        btns.forEach(function(item, idx){
            btns[idx].addEventListener('click', function(e){
                e.preventDefault();
                var btn = e.target.dataset["action"];
                switch(btn) {
                    case "getSmallPhoto":
                        filterPhotos(images, 'small');
                        break;
                    case "getMiddlePhoto":
                        filterPhotos(images, 'middle');
                        break;
                    case "getLargePhoto":
                        filterPhotos(images, 'large');
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
        inputSeach: inputSeach,
        init: init,
    }
}());

