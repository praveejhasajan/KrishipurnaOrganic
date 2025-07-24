// Simple script to scroll to product info on small screens
window.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth < 600) {
    document.querySelector('.order-btn').addEventListener('click', function(e) {
      // Example: scroll to top after clicking order
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('#navmenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('bi-list');
      navToggle.classList.toggle('bi-x');
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