// Custom JS for blank.html

document.addEventListener('DOMContentLoaded', function () {
  // Example: Log page loaded
  console.log('Blank page loaded');

  // Mobile nav toggle logic (same as main.js)
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('#navmenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('bi-list');
      navToggle.classList.toggle('bi-x');
      document.body.classList.toggle('mobile-nav-active');
    });
  }

  // Dropdown for mobile
  document.querySelectorAll('.navmenu .dropdown > a').forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('open');
        const submenu = dropdown.querySelector('ul');
        if (submenu) {
          submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
      }
    });
  });
});