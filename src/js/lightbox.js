////////////////////////
//Module lightbox
///////////////////////
var lightbox = (function() {

    var elem = undefined,
        active_src = '',
        next_src = '',
        prev_src = '',
        container = null,
        container_img = null,
        next_elem = null,
        prev_elem = null,
        current_elem = null,
        reset_src = '../img/lightbox-loader.svg';


	////////////////////////
	//Init lightbox
	///////////////////////
    var init = function() {

        container = document.getElementById('lightbox'),
        container_img = document.getElementById('lighbox-image');
        btn_next = document.querySelector('.lightbox__controlls--next');
        btn_prev = document.querySelector('.lightbox__controlls--prev');

        document.addEventListener('click', function(e) {
            e.preventDefault();

            var elem = e.target,
                trigger = e.target
                .parentElement
                .classList
                .toString()
                .indexOf('image_link') > -1;

            if (trigger && e.target.src != '') {
                active_src = e.target.src;
                e.target.parentElement.parentElement.classList.add('active');

                next_elem = document.querySelector('.gallery__images .active').nextElementSibling || null;
                prev_elem = document.querySelector('.gallery__images .active').previousElementSibling || null;
                current_elem = document.querySelector('.gallery__images .active');
                // next_src = document.querySelector('.gallery__images .active').nextElementSibling.querySelector('img').src || '';

                show(active_src);
            } else if (elem.id === 'lightbox__close' || elem.id === 'lightbox__container') {
                hide();
            }
            else if( e.target.classList.toString().indexOf('lightbox__controlls--next') > -1) {
            	if(next_elem != null) {
            		nextImage();
            	}
            }
			else if( e.target.classList.toString().indexOf('lightbox__controlls--prev') > -1) {
            	if(prev_elem != null) {
		        	prevImage();
		        }
            }

        });

    }

	////////////////////////
	//Lightbox controlls
	///////////////////////
    function show(src) {

        container_img.src = active_src.replace('300/300', '800/800');
        container.classList.add('active');

    }

    function hide() {

    	container_img.src = './src/img/lightbox-loader.svg';
        container.classList.remove('active');

    }

    function nextImage() {
    	current_elem.classList.remove('active');
    	if(next_elem != null ) {
	    	next_elem.classList.add('active');
    	}

    	container_img.src = next_elem.querySelector('img').src.replace('300/300', '400/400');
    	next_elem = document.querySelector('.gallery__images .active').nextElementSibling;
        prev_elem = document.querySelector('.gallery__images .active').previousElementSibling;
        current_elem = document.querySelector('.gallery__images .active');
    }

    function prevImage() {
    	current_elem.classList.remove('active');
    	
    	if(prev_elem != null ) {
	    	prev_elem.classList.add('active');
    	}

    	container_img.src = prev_elem.querySelector('img').src.replace('300/300', '400/400');;
    	next_elem = document.querySelector('.gallery__images .active').nextElementSibling;
        prev_elem = document.querySelector('.gallery__images .active').previousElementSibling;
        current_elem = document.querySelector('.gallery__images .active');
    }


    return {
        init: init
    }

}());