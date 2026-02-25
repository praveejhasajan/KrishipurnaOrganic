/**
* Template Name: Reveal
* Template URL: https://bootstrapmade.com/reveal-bootstrap-corporate-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    if (!mobileNavToggleBtn) return;
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }


  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    if (typeof imagesLoaded === 'undefined' || typeof Isotope === 'undefined') return;
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#navmenu ul li a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          if (mobileNavToggleBtn) {
            mobileNavToggleBtn.classList.remove('bi-x');
            mobileNavToggleBtn.classList.add('bi-list');
          }
        }
      });
    });
  });

  /**
   * Lead generation UI elements shared across pages
   */
  function ensureQuoteButton() {
    const navList = document.querySelector('#navmenu ul');
    if (!navList || navList.querySelector('.nav-quote-btn')) return;
    const li = document.createElement('li');
    li.innerHTML = '<a href="export-inquiry.html" class="nav-quote-btn">Request Export Quote</a>';
    navList.appendChild(li);
  }

  function ensureWhatsappButton() {
    if (document.querySelector('.floating-whatsapp')) return;
    const wa = document.createElement('a');
    wa.href = 'https://wa.me/919211959766?text=Hello%20Krishipurna%20Organic%2C%20I%20am%20interested%20in%20importing%20your%20products.%20Please%20share%20your%20best%20export%20quotation.';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.className = 'floating-whatsapp';
    wa.setAttribute('aria-label', 'Chat on WhatsApp');
    wa.innerHTML = '<i class="bi bi-whatsapp"></i>';
    document.body.appendChild(wa);
  }

  function ensureLeadPopup() {
    if (document.querySelector('.lead-popup')) return;

    const backdrop = document.createElement('div');
    backdrop.className = 'lead-popup-backdrop';

    const popup = document.createElement('div');
    popup.className = 'lead-popup';
    popup.innerHTML = `
      <div class="lead-popup-header">
        <h3>Get Export Price List</h3>
        <button type="button" class="lead-popup-close" aria-label="Close popup">&times;</button>
      </div>
      <div class="lead-popup-body">
        <p class="lead-popup-note">Share your requirement and get MOQ, lead time, and CIF/FOB quote within 24 hours.</p>
        <form id="lead-popup-form">
          <input type="text" class="form-control" name="name" placeholder="Full Name*" required>
          <input type="email" class="form-control" name="email" placeholder="Business Email*" required>
          <input type="text" class="form-control" name="subject" value="Export Inquiry" hidden>
          <input type="text" class="form-control" name="company" placeholder="Company Name">
          <div class="row g-2">
            <div class="col-6">
              <select class="form-select" name="product">
                <option value="">Product Interest</option>
                <option>Makhana</option>
                <option>Sattu</option>
                <option>Poha</option>
                <option>Millets</option>
                <option>Bajra</option>
                <option>Oats</option>
                <option>Cashew</option>
              </select>
            </div>
            <div class="col-6">
              <input type="text" class="form-control" name="country" placeholder="Destination Country">
            </div>
          </div>
          <textarea class="form-control" name="message" rows="3" placeholder="Required quantity, packaging type, and target port*" required></textarea>
          <button class="lead-submit-btn" type="submit">Request Export Quote</button>
          <div class="lead-popup-status" aria-live="polite"></div>
        </form>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(popup);

    const closeBtn = popup.querySelector('.lead-popup-close');
    const form = popup.querySelector('#lead-popup-form');
    const status = popup.querySelector('.lead-popup-status');

    const showPopup = () => {
      if (sessionStorage.getItem('lead_popup_closed') === '1') return;
      popup.classList.add('show');
      backdrop.classList.add('show');
    };

    const closePopup = () => {
      popup.classList.remove('show');
      backdrop.classList.remove('show');
      sessionStorage.setItem('lead_popup_closed', '1');
    };

    setTimeout(showPopup, 8000);

    document.addEventListener('mouseout', (e) => {
      if (e.clientY <= 0) showPopup();
    });

    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Submitting...';
      status.className = 'lead-popup-status';

      const fd = new FormData(form);
      const company = (fd.get('company') || '').toString().trim();
      const product = (fd.get('product') || '').toString().trim();
      const country = (fd.get('country') || '').toString().trim();
      const message = (fd.get('message') || '').toString().trim();
      const enhancedMessage = `Company: ${company || 'N/A'}\nProduct: ${product || 'N/A'}\nCountry: ${country || 'N/A'}\nRequirement: ${message}`;
      fd.set('message', enhancedMessage);
      fd.delete('company');
      fd.delete('product');
      fd.delete('country');

      try {
        const res = await fetch('assets/forms/contact.php', {
          method: 'POST',
          body: fd
        });
        const text = (await res.text()).trim();
        if (!res.ok || text !== 'OK') {
          throw new Error('Submission failed');
        }
        status.textContent = 'Thank you. Our export team will contact you shortly.';
        status.classList.add('success');
        form.reset();
        sessionStorage.setItem('lead_popup_closed', '1');
        setTimeout(closePopup, 1500);
      } catch (err) {
        status.textContent = 'Unable to submit now. Please email enquiry@krishipurnaorganic.com.';
        status.classList.add('error');
      }
    });
  }

  ensureQuoteButton();
  ensureWhatsappButton();
  ensureLeadPopup();

  /**
   * Export inquiry form submission to Google Apps Script
   */
  function initExportInquiryForms() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbzwhjKdiZocgV2zwppcd27fZtwPukBnXXH4Sz4gryEa4m0iN_VnaqclG1sTEpj99uqy/exec";
    document.querySelectorAll('.export-inquiry-form').forEach((form) => {
      if (form.id === 'exportInquiryForm') return;
      if (form.dataset.scriptUrl && !form.dataset.scriptUrl.includes('PASTE_')) return;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const getValue = (name) => {
          const field = form.querySelector(`[name="${name}"]`);
          return field ? field.value : '';
        };

        const data = {
          name: getValue('name'),
          email: getValue('email'),
          company: getValue('company'),
          country: getValue('country'),
          product: getValue('product') || getValue('products'),
          quantity: getValue('quantity'),
          details: getValue('details'),
          phone: getValue('phone'),
          incoterms: getValue('incoterms'),
          port: getValue('port')
        };

        const messageField = form.querySelector('[name="message"]');
        if (messageField) {
          const message = [
            `Company: ${data.company || 'N/A'}`,
            `Country: ${data.country || 'N/A'}`,
            `Product: ${data.product || 'N/A'}`,
            `Quantity: ${data.quantity || 'N/A'}`,
            `Phone: ${data.phone || 'N/A'}`,
            `Incoterms: ${data.incoterms || 'N/A'}`,
            `Port: ${data.port || 'N/A'}`,
            `Details: ${data.details || 'N/A'}`
          ].join('\n');
          messageField.value = message;
        }

        try {
          await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
          }).catch(() => {});

          alert('Export inquiry submitted successfully');
          form.reset();
        } catch (err) {
          alert('Error submitting form');
        }
      });
    });
  }

  /**
   * Generic Google Sheet form submission (per-form script URL)
   */
  function initSheetForms() {
    document.querySelectorAll('form[data-script-url]').forEach((form) => {
      if (!form.dataset.scriptUrl || form.dataset.scriptUrl.includes('PASTE_')) return;
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {};
        form.querySelectorAll('[name]').forEach((field) => {
          data[field.name] = field.value;
        });

        const messageField = form.querySelector('[name="message"]');
        if (messageField) {
          const message = Object.entries(data)
            .filter(([key]) => key !== 'message')
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
          messageField.value = message;
          data.message = messageField.value;
        }

        fetch(form.dataset.scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(data)
        }).catch(() => {});

        alert('Bulk inquiry submitted successfully');
        form.reset();
      });
    });
  }

  initExportInquiryForms();
  initSheetForms();

})();
