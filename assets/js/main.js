/**
 * Kamrul Hasan — Portfolio Main JS
 */
(function () {
  "use strict";

  /* ==================== Header Toggle ==================== */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navmenu = document.querySelector('#navmenu');

  function toggleMobileNav() {
    navmenu.classList.toggle('mobile-nav-active');
    mobileNavToggle.classList.toggle('bi-list');
    mobileNavToggle.classList.toggle('bi-x');
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileNav);
  }

  // Close mobile nav on link click
  document.querySelectorAll('#navmenu a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navmenu.classList.contains('mobile-nav-active')) {
        toggleMobileNav();
      }
    });
  });

  /* ==================== Preloader ==================== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(function () { preloader.remove(); }, 500);
    });
  }

  /* ==================== Scroll Top ==================== */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* ==================== AOS Init ==================== */
  function aosInit() {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 60
    });
  }
  window.addEventListener('load', aosInit);

  /* ==================== Typed.js ==================== */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000
    });
  }

  /* ==================== PureCounter ==================== */
  new PureCounter();

  /* ==================== Skills Animation ==================== */
  document.querySelectorAll('.skills-animation').forEach(function (item) {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        item.querySelectorAll('.progress .progress-bar').forEach(function (el) {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /* ==================== GLightbox ==================== */
  GLightbox({ selector: '.glightbox' });

  /* ==================== Isotope ==================== */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') || 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') || '*';
    let sort = isotopeItem.getAttribute('data-sort') || 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterBtn) {
      filterBtn.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') { aosInit(); }
      }, false);
    });
  });

  /* ==================== Swiper ==================== */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {
      let config = JSON.parse(swiperElement.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiperElement, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /* ==================== Hash Scroll Fix ==================== */
  window.addEventListener('load', function () {
    if (window.location.hash) {
      let section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(function () {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /* ==================== Navmenu Scrollspy ==================== */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(function (link) {
      if (!link.hash) return;
      let section = document.querySelector(link.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(function (active) { active.classList.remove('active'); });
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
