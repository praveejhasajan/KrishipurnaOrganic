(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let action = form.getAttribute('action');
      if (!action) {
        showError(form, 'Form action is missing!');
        return;
      }

      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(response => response.text())
        .then(data => {
          form.querySelector('.loading').classList.remove('d-block');
          if (data.trim() === 'OK') {
            form.querySelector('.sent-message').classList.add('d-block');
            form.reset();
          } else {
            showError(form, data);
          }
        })
        .catch(error => {
          showError(form, 'Submission failed: ' + error.message);
        });
    });
  });

  function showError(form, error) {
    form.querySelector('.loading').classList.remove('d-block');
    form.querySelector('.error-message').textContent = error;
    form.querySelector('.error-message').classList.add('d-block');
  }
})();
