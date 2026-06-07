/**
 * Enhanced Inner Page Navigation
 * Replaces old BizLand header with immersive navigation
 * Adds breadcrumbs, enhanced footer, and page hero sections
 */
(function() {
  'use strict';

  // Only run on inner pages (not index.html)
  var isHomePage = window.location.pathname === '/' || 
                   window.location.pathname === '/index.html' ||
                   window.location.pathname.endsWith('/index.html');
  if (isHomePage) return;

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    replaceHeader();
    addBreadcrumbs();
    enhanceFooter();
    initMobileNav();
    addFonts();
  }

  function addFonts() {
    // Add Google Fonts if not already present
    if (!document.querySelector('link[href*="Playfair+Display"]')) {
      var link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }

  function replaceHeader() {
    var oldHeader = document.getElementById('header');
    if (!oldHeader) return;

    // Get the current page info
    var pageName = getPageName();
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Build new navigation
    var nav = document.createElement('nav');
    nav.className = 'nav-fluid';
    nav.id = 'navFluid';
    nav.innerHTML = 
      '<a href="index.html" class="nav-logo">KRISHIPURNA <span>ORGANIC</span></a>' +
      '<ul class="nav-links">' +
        '<li><a href="index.html#hero">Home</a></li>' +
        '<li><a href="index.html#about">About</a></li>' +
        '<li><a href="index.html#products">Products</a></li>' +
        '<li><a href="index.html#export">Services</a></li>' +
        '<li><a href="index.html#contact">Contact</a></li>' +
        '<li><a href="export-inquiry.html" class="nav-cta">Get Quote</a></li>' +
      '</ul>' +
      '<div class="nav-hamburger" id="navHamburger">' +
        '<span></span><span></span><span></span>' +
      '</div>';

    // Build mobile nav
    var mobileNav = document.createElement('div');
    mobileNav.className = 'nav-mobile';
    mobileNav.id = 'navMobile';
    mobileNav.innerHTML = 
      '<div class="close-btn" id="navClose">&times;</div>' +
      '<a href="index.html#hero" onclick="closeMobileNav()">Home</a>' +
      '<a href="index.html#about" onclick="closeMobileNav()">About</a>' +
      '<a href="index.html#products" onclick="closeMobileNav()">Products</a>' +
      '<a href="index.html#export" onclick="closeMobileNav()">Services</a>' +
      '<a href="index.html#contact" onclick="closeMobileNav()">Contact</a>' +
      '<a href="export-inquiry.html">Get Quote</a>';

    // Replace old header
    oldHeader.parentNode.replaceChild(nav, oldHeader);
    document.body.appendChild(mobileNav);

    // Hide old topbar if present
    var topbar = document.querySelector('.topbar');
    if (topbar) topbar.style.display = 'none';
  }

  function getPageName() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '').replace(/-/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function addBreadcrumbs() {
    var main = document.querySelector('main') || document.querySelector('.main');
    if (!main) return;

    var pageName = getPageName();
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Don't add breadcrumbs if already present
    if (document.querySelector('.breadcrumb-bar')) return;

    var breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb-bar';
    breadcrumb.innerHTML = 
      '<div class="container">' +
        '<nav class="breadcrumb" aria-label="breadcrumb">' +
          '<a href="index.html">Home</a>' +
          ' &raquo; ' +
          '<span class="active">' + escapeHtml(pageName) + '</span>' +
        '</nav>' +
      '</div>';

    // Insert before main content
    main.parentNode.insertBefore(breadcrumb, main);
  }

  function enhanceFooter() {
    var footer = document.getElementById('footer');
    if (!footer) return;

    // Check if footer already has enhanced structure
    if (footer.querySelector('.footer-enhanced')) return;

    var currentYear = new Date().getFullYear();

    footer.innerHTML = 
      '<div class="container footer-enhanced">' +
        '<div class="row gy-4">' +
          '<div class="col-lg-3 col-md-6">' +
            '<h4>KRISHIPURNA ORGANIC</h4>' +
            '<p>2nd floor, housing complex, Plot no 337,<br>' +
            'Nishat Park, Sector 15 Dwarka,<br>' +
            'Kakrola, Delhi, 110078</p>' +
            '<p><strong>Phone:</strong> +91-9211959766<br>' +
            '<strong>Email:</strong> enquiry@krishipurnaorganic.com</p>' +
          '</div>' +
          '<div class="col-lg-2 col-md-6">' +
            '<h4>Company</h4>' +
            '<ul class="list-unstyled">' +
              '<li><a href="index.html#about">About Us</a></li>' +
              '<li><a href="index.html#export">Export Services</a></li>' +
              '<li><a href="certifications.html">Certifications</a></li>' +
              '<li><a href="catalogues.html">Catalogue</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="col-lg-2 col-md-6">' +
            '<h4>Buyer Resources</h4>' +
            '<ul class="list-unstyled">' +
              '<li><a href="export-inquiry.html">Export Inquiry</a></li>' +
              '<li><a href="bulk-order.html">Bulk Orders</a></li>' +
              '<li><a href="distributor.html">Distributor Program</a></li>' +
              '<li><a href="index.html#faq">FAQs</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="col-lg-3 col-md-6">' +
            '<h4>Export Countries</h4>' +
            '<div class="row">' +
              '<div class="col-6"><ul class="list-unstyled">' +
                '<li><a href="usa-export.html">USA</a></li>' +
                '<li><a href="uae-export.html">UAE</a></li>' +
                '<li><a href="uk-export.html">UK</a></li>' +
                '<li><a href="canada-export.html">Canada</a></li>' +
                '<li><a href="australia-export.html">Australia</a></li>' +
                '<li><a href="germany-export.html">Germany</a></li>' +
              '</ul></div>' +
              '<div class="col-6"><ul class="list-unstyled">' +
                '<li><a href="france-export.html">France</a></li>' +
                '<li><a href="italy-export.html">Italy</a></li>' +
                '<li><a href="spain-export.html">Spain</a></li>' +
                '<li><a href="singapore-export.html">Singapore</a></li>' +
                '<li><a href="japan-export.html">Japan</a></li>' +
                '<li><a href="qatar-export.html">Qatar</a></li>' +
              '</ul></div>' +
            '</div>' +
          '</div>' +
          '<div class="col-lg-2 col-md-6">' +
            '<h4>Follow Us</h4>' +
            '<div class="social-links d-flex gap-2">' +
              '<a href="https://www.facebook.com/MAKHANABAZAR" target="_blank" rel="noopener"><i class="bi bi-facebook"></i></a>' +
              '<a href="https://www.instagram.com/krishipurnaorganics/" target="_blank" rel="noopener"><i class="bi bi-instagram"></i></a>' +
              '<a href="https://www.linkedin.com/company/krishipurna-organic-pvt-ltd" target="_blank" rel="noopener"><i class="bi bi-linkedin"></i></a>' +
            '</div>' +
            '<a href="export-inquiry.html" class="btn btn-success btn-sm mt-3">Request Export Quote</a>' +
          '</div>' +
        '</div>' +
        '<div class="copyright">&copy; ' + currentYear + ' <strong><span>Krishipurna Organic</span></strong>. All Rights Reserved</div>' +
      '</div>';
  }

  function initMobileNav() {
    var hamburger = document.getElementById('navHamburger');
    var mobileNav = document.getElementById('navMobile');
    var closeBtn = document.getElementById('navClose');

    if (hamburger) {
      hamburger.addEventListener('click', function() {
        if (mobileNav) mobileNav.classList.add('open');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        if (mobileNav) mobileNav.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Global close function for breadcrumb links
    window.closeMobileNav = function() {
      if (mobileNav) mobileNav.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
      document.body.style.overflow = '';
    };
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
