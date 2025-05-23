$(document).ready(function () {
  console.log("jQuery is ready!");

  $('#register-form').on('submit', function (e) {
    e.preventDefault();

    let fullname = $('#fullname').val().trim();
    let email = $('#email').val().trim();
    let password = $('#password').val().trim();
    let valid = true;

    // Clear previous errors
    $('.form-text.text-danger').text('');
    $('#message').removeClass().addClass('alert d-none');

    // Validation
    if (fullname === '') {
      $('#error-fullname').text('Vui lòng nhập họ tên.');
      valid = false;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $('#error-email').text('Email không hợp lệ.');
      valid = false;
    }

    if (password.length < 6) {
      $('#error-password').text('Mật khẩu phải từ 6 ký tự.');
      valid = false;
    }

    if (!valid) return;

    // Send AJAX
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      data: {
        fullname: fullname,
        email: email,
        password: password
      },
      success: function (response) {
        $('#message')
          .removeClass('d-none alert-danger')
          .addClass('alert-success alert')
          .text('Đăng ký thành công!');

        $('#register-form').slideUp();
        $('#congrats').fadeIn();
      },
      error: function () {
        $('#message')
          .removeClass('d-none alert-success')
          .addClass('alert-danger alert')
          .text('❌ Server bận, vui lòng thử lại sau.');
      }
    });
  });
});
