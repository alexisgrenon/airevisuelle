//@prepros-prepend jquery.js
//@prepros-prepend functions.js
//@prepros-prepend plugins.js
//@prepros-prepend jquery.validate.min.js

//custom JS goes here!
$(document).ready(function(){
		$('.col-eq-height').matchHeight();
		$('form.widget-contact-form').validate();
});