// DOM Ready =============================================================
$(document).ready(() => {
  $('#submitBtn').on('click', addEmail);
});

// Functions =============================================================
function addEmail(e) {
  e.preventDefault();

  var newEmail = $('#email').val();
  var mailOptions = {
    email: newEmail
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
}
