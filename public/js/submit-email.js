// DOM Ready =============================================================
$(document).ready(() => {
  $('#submitBtn').on('click', addEmail);
  $(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing');
	});
});
});

// Functions =============================================================
function addEmail(e) {
  e.preventDefault();

  var newEmail = $('#exampleInputEmail').val();
  var name = $('#exampleInputName').val();

  console.log(newEmail);
  console.log(name);

  var lastName;
  if(name.includes(' ')) {
    lastName = name.substr(name.indexOf(' '));
  } else {
    lastName = '';
  }
  var firstName = name.substr(0, name.indexOf(' '));

  var mailOptions = {
    email: newEmail,
    fName: firstName,
    lName: lastName
  }
  console.log(newEmail);

  //Use AJAX to post
  $.ajax({
    type: 'POST',
    data: mailOptions,
    dataType: 'json',
    ContentType: 'application/json',
    success: () => {
      console.log('it worked!');
    },
    //url: "http://localhost:3000/submitemail" //use when running locally
    url: "https://mighty-wildwood-97708/submitemail"
  });

  var form = document.getElementById("submitForm");
  form.reset();
}
