// DOM Ready =============================================================
$(document).ready(() => {
  $('#submitBtn').on('click', addEmail);
});

// Functions =============================================================
function addEmail(e) {
  e.preventDefault();

  var newEmail = $('#email').val();
  var firstName = $('#fName').val();
  var lastName = $('#lName').val();
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
