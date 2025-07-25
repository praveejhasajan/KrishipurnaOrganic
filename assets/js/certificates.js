document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.view-pdf-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const pdfUrl = btn.getAttribute('href');
      const modal = document.getElementById('pdfModal');
      modal.querySelector('iframe').src = pdfUrl;
      modal.classList.add('show');
      modal.style.display = 'block';
    });
  });
  document.getElementById('closePdfModal').addEventListener('click', function() {
    const modal = document.getElementById('pdfModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.querySelector('iframe').src = '';
  });
});