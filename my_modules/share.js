'use strict'

const share = (selector) => {

	var fbShareBtns = document.querySelectorAll(selector);

	[].forEach.call( fbShareBtns, function(element){
	    
	    element.addEventListener('click', function(e) {
	        
	        e.preventDefault();

		    const title = encodeURIComponent( this.getAttribute('data-title') );
		    const desc = encodeURIComponent( this.getAttribute('data-desc') );
		  	const url = encodeURIComponent( this.getAttribute('data-url') );
		    const image = encodeURIComponent( this.getAttribute('data-image') );
	        const hashtags = encodeURIComponent( this.getAttribute('data-hashtags') );


	        let share;
	        
	        //vk
	        if (this.className.indexOf('vk') > -1){

		        share = 'https://vk.com/share.php';
		        share += '?url=' + url;
		        share += '&title=' + title;
		        share += '&description=' + desc;
		        share += '&image=' + image;
			}
	        
	        //ok
	        if (this.className.indexOf('ok') > -1){

		        share = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		        share += '&st._surl=' + url;
		       	//share += '&st.comments=' + desc;
		        //share += '&title=' + title;
			}

			//fb
	        if (this.className.indexOf('fb') > -1){
	        	share = 'https://www.facebook.com/sharer/sharer.php';
                share += '?u=' + url;
	        }

			//tw
	        if (this.className.indexOf('tw') > -1){	        
	        	share = 'https://twitter.com/intent/tweet';
	        	share += '?url=' + url;
	        	share += '&text=' + title + ' ' + image;
	        	share += '&hashtags=' + hashtags;
	        }

	        window.open(share, '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0');


	        console.log(share);


	        //burunduki

	        const text = document.querySelectorAll('.bur-step__text--res');
	        const games = document.querySelectorAll('.bur-step__games');

	        [].forEach.call( text, function(element){

	        	element.style.display = 'none';

	        });

	        [].forEach.call( games, function(element){

	        	element.style.display = 'block';

	        });

	    }); 
	}); 

};


export default share;