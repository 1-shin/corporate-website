jQuery(document).ready(function(){
	jQuery("button.btnSend").click(function(){
	
	var form = jQuery(this).closest('form');
	
	jQuery.ajax({type:'POST', url: 'https://1-shin.com/wp-content/themes/brazil-wp/inc/contactus/contact2.php', data:jQuery(form).serialize(), success: function(response) {
		 
		 if(parseInt(response)>0)
		   {
			 if(jQuery(form).find("#spanMessage").length)
			 jQuery(form).find("#spanMessage").html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Well done!</strong> Your message has been sent.</div>');
			 else
			 alert('Your message has been sent.');
		   }
		   else{
			 if(jQuery(form).find("#spanMessage").length)
			 jQuery(form).find("#spanMessage").html('<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error! </strong> Something Wrong</div>');
			 else
			 alert('Something wrong!');
		   }   
			 
	}});
	});
	});

jQuery(document).ready(function(){ 
jQuery(function() {
		    var header = jQuery('#header');
		    var navHomeY = header.offset().top;
		    var isFixed = false;
		    var $w = jQuery(window);
		    $w.scroll(function(e) {
		        var scrollTop = $w.scrollTop();
		        var shouldBeFixed = scrollTop > 100;
		        if (shouldBeFixed && !isFixed) {
		            header.addClass('sticky');
		            isFixed = true;
		           
		        }
		        else if (!shouldBeFixed && isFixed)
		        {
		            header.removeClass("sticky");
		            isFixed = false;
		        }
		        e.preventDefault();
		    });
		});
	});
  

