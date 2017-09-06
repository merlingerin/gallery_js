// 'use strict';
window.addEventListener('DOMContentLoaded', function(){
    $.init('.gallery__images');
    $.inputSeach();
    $.currentSize('.filter__list');
});

//Init app
var $ = (function(selector, context){
    var init = function(selector) {
        gallery = document.querySelector(selector + '');
    };

    var gallery = '',
        images = [],
        filteredArr = [],
        currentPage = 0,
        maxPage = 0;




    ////////////////////////
    //Fetch all photos from API
    ///////////////////////
    (function getImages() {
              fetch('https://unsplash.it/list')
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

    ////////////////////////////////
    //Change current filter by size
    ///////////////////////////////
    function currentSize(elem) {
        var btns = document.querySelector(elem);
        btns.addEventListener('click', function(e) {
          e.preventDefault();

          var current = document.querySelector(elem + ' .active');
          
          current.classList.remove('active');
          e.target.classList.add('active');

        })     
    }


    ////////////////////////////////
    //Render pagination
    ///////////////////////////////
    function pagination (currentPage, nextPage, maxPage) {
      var prev = document.querySelector('.link--prev'),
          next = document.querySelector('.link--next');

      if( nextPage <= 0 ) {
        prev.style.display = 'none';
      }
      else if (nextPage >= maxPage) {
        next.style.display = 'none';
      }
      else {
        prev.style.display = 'inline-block';
        next.style.display = 'inline-block';
      }

      if(nextPage < 0) {
        return 0;
      }
      else if(nextPage > maxPage) {
        return maxPage;
      }
      else {
        return nextPage;
      }
    }

    ////////////////////////
    //Render gallery
    ///////////////////////
    function renderGallery(images, perPage, idx ) {
      console.log('currentPage gallery ', currentPage);

      maxPage = Math.ceil(images.length/perPage);
      var template = '',
          imagesValue = images.length,
          i = 0;



      for ( i; perPage > i; i++) {

        if(images[i + (currentPage * perPage)] == undefined ) {

        }
        else {
            template += `<div class="image__container">
                            <a href="#" class="image_link">
                                <img src="https://unsplash.it/300/300?image=`+images[i + (currentPage * perPage)].id+`" alt="image">
                                </a>
                        </div>`;
        }
      }
      gallery.innerHTML = template;
    }
    ////////////////////////
    //Seach photos by Author
    ///////////////////////
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
    
    ////////////////////////
    //Filter Photos by size
    ///////////////////////    
    function filterPhotos(data, size) {
        var amount = amount,
            images = data,
            template = '';  

        if(size === '') {

            filteredArr = images;

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

        renderGallery(filteredArr, 20);
        console.log('filteredArr: ', filteredArr);        
    }

    ////////////////////////
    //Catch actions
    ///////////////////////
    document.addEventListener("DOMContentLoaded", function(event) {
        var btns = document.querySelectorAll('[data-action]'),
            pageNumber = document.querySelector('.page-number');

        btns.forEach(function(item, idx){
            btns[idx].addEventListener('click', function(e){
                e.preventDefault();
                var btn = e.target.dataset["action"];
                switch(btn) {
                    case "getSmallPhoto":
                        currentPage = pagination(currentPage, -maxPage, maxPage);
                        filterPhotos(images, 'small');
                        pageNumber.innerHTML = ' [ '+ (currentPage + 1) +' ] ';
                        break;
                    case "getMiddlePhoto":
                        currentPage = pagination(currentPage, -maxPage, maxPage);
                        filterPhotos(images, 'middle');
                        pageNumber.innerHTML = ' [ '+ (currentPage + 1) +' ] ';
                        break;
                    case "getLargePhoto":
                        filterPhotos(images, 'large');
                        break;
                    case "increasPage":
                        currentPage = pagination(currentPage, currentPage + 1, maxPage);
                        renderGallery(filteredArr, 20);
                        pageNumber.innerHTML = ' [ '+ (currentPage + 1) +' ] ';
                        break;
                    case "decreasPage":
                        currentPage = pagination(currentPage, currentPage - 1, maxPage);
                        renderGallery(filteredArr, 20);
                        pageNumber.innerHTML = ' [ '+ (currentPage + 1) +' ] ';
                        break;
                    default:
                      return true;
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
        currentSize: currentSize
    }
}());

