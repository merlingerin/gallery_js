////////////////////////
//App Javascript Gallery
///////////////////////
var $ = (function(selector, context) {
    var init = function(selector) {
        gallery = document.querySelector(selector + '');
    };

    var gallery = '',   /*gallery container*/
        images = [],    /*array with fetched images from API*/
        pickedSize = '',    /*active size from filter by size*/
        filteredArr = [],   /*array filterd from images[] by size*/
        searchArr = [],     /*array filtered from filteredArr[] by author*/
        currentPage = 0,    /*current page in pagination*/
        seachInput_value = '',  /*Value from serach input by author*/
        perPage = 20,           /*max images per page*/
        maxPage = 0;            /*computed props depends on used images array and images amount perPage*/




    ////////////////////////
    //Fetch all photos from API
    ///////////////////////
    (function getImages() {
        fetch('https://unsplash.it/list')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                images = data;
                filterPhotos(data, '');
            })
            .catch(function(error) {
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
            pickedSize = e.target.innerHTML;
        })
    }


    ////////////////////////////////
    //Render pagination
    ///////////////////////////////
    function pagination(currentPage, nextPage, maxPage) {
        var prev = document.querySelector('.link--prev'),
            next = document.querySelector('.link--next');

        console.log('currentPage', currentPage);
        console.log('nextPage', nextPage);
        console.log('maxPage', maxPage);
            prev.style.display = 'none';
            next.style.display = 'none';

        if (nextPage <= 0) {

            if( nextPage <=0 && maxPage === 0 ) {
                prev.style.display = 'none';
                next.style.display = 'none';
            }
            else {
                prev.style.display = 'none';
                next.style.display = 'inline-block';
            }
            

        } else if (nextPage >= maxPage) {

            next.style.display = 'none';
            prev.style.display = 'inline-block';

        } else if ( maxPage === 0 ) {

            prev.style.display = 'none';
            next.style.display = 'none';

        } else {

            prev.style.display = 'inline-block';
            next.style.display = 'inline-block';

        }


        if (nextPage < 0) {
            return 0;
        } else if (nextPage > maxPage) {
            return maxPage;
        } else {
            return nextPage;
        }
    }

    ////////////////////////
    //Render gallery
    ///////////////////////
    function renderGallery(images, perPage, idx) {

        console.log('currentPage gallery ', currentPage);

        var pageNumber = document.querySelector('.page-number');

        if(images.length / perPage < 1) {
            maxPage = 0;
        }
        else {
            maxPage = Math.round(images.length / perPage);
        }
        
        var template = '',
            imagesValue = images.length,
            i = 0;

        for (i; perPage > i; i++) {

            if (images[i + (currentPage * perPage)] == undefined) {

            } else {
                template += `<div class="image__container">
                                <a href="#" class="image_link">
                                    <img src = "https://unsplash.it/300/300?image=` + images[i + (currentPage * perPage)].id + `"
                                        alt = "image" >
                                </a>
                            </div>`;
            }
        }
        gallery.innerHTML = template;
        pageNumber.innerHTML = ' [ ' + (currentPage + 1) + ' ] ';
    }
    ////////////////////////
    //Seach photos by Author
    ///////////////////////
    function inputSeach() {
        var input = document.querySelector('.filter__input');

        input.addEventListener('keyup', function(e) {

            seachInput_value = e.target.value.toUpperCase();

            if( seachInput_value != '') {
                searchArr = filteredArr.filter(function(item, idx) {
                    return item.author.toUpperCase().indexOf(seachInput_value) > -1;
                });

                maxPage = searchArr.length/perPage;

                
                renderGallery(searchArr, 20);
                pagination(0, -maxPage, maxPage);
            }
            else {
                renderGallery(filteredArr, 20);
            }
            
        });
    }

    ////////////////////////
    //Filter Photos by size
    ///////////////////////    
    function filterPhotos(data, size) {
        var amount = amount,
            images = data,
            template = '';

        if (size === '') {

            filteredArr = images;

        } else if (size === 'large') {

            filteredArr = images.filter(function(image) {
                return image.width > 1500;
            });

        } else if (size === 'middle') {

            filteredArr = images.filter(function(image) {
                return image.width < 1499 && image.width > 800;
            });

        } else if (size === 'small') {

            filteredArr = images.filter(function(image) {
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
        var btns = document.querySelectorAll('[data-action]');
            

        btns.forEach(function(item, idx) {
            btns[idx].addEventListener('click', function(e) {
                e.preventDefault();
                var btn = e.target.dataset["action"];
                switch (btn) {
                    case "getSmallPhoto":
                        filterPhotos(images, 'small');
                        currentPage = pagination(0, -maxPage, Math.round(filteredArr.length/perPage));
                        filterPhotos(images, 'small');
                        break;
                    case "getMiddlePhoto":
                        filterPhotos(images, 'middle');
                        currentPage = pagination(0, -maxPage, Math.round(filteredArr.length/perPage));
                        filterPhotos(images, 'middle');
                        break;
                    case "getLargePhoto":
                        filterPhotos(images, 'large');
                        currentPage = pagination(0, -maxPage, Math.round(images.length/perPage));
                        filterPhotos(images, 'large');
                        break;
                    case "increasPage":
                        currentPage = pagination(currentPage, currentPage + 1, maxPage);
                        console.log(seachInput_value);
                        renderGallery( seachInput_value != '' ? searchArr : filteredArr, 20);
                        break;
                    case "decreasPage":
                        currentPage = pagination(currentPage, currentPage - 1, maxPage);
                        console.log(seachInput_value);
                        renderGallery(seachInput_value != '' ? searchArr : filteredArr, 20);
                        break;
                    default:
                        return true;
                }
            });
        })
    });

    return {
        inputSeach: inputSeach,
        init: init,
        currentSize: currentSize
    }
}());