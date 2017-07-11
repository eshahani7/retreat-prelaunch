// DOM Ready =============================================================
$(document).ready(() => {
  $('#submitBtn').on('click', addEmail);
  $('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

// Functions =============================================================
function addEmail(e) {
  e.preventDefault();

  var newEmail = $('#email').val();
  var name = $('#name').val();

  var lastName;
  if(name.include(' ')) {
    lastName = name.substr(name.indexOf(' '));
  } else {
    lastName = '';
  }
  var firstName = name.substr(0, name.indexOf(' ') -1 );

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
    url: "http://localhost:3000/submitemail"
  });

  var form = document.getElementById("emailForm");
  form.reset();
}
