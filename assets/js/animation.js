AOS.init({
    duration: 1000,
    offset: 120,
    easing: 'ease-in-out'
});

// Mobile Fullscreen Menu Behavior
$(document).ready(function () {
    var $navbarCollapse = $('#navbarSupportedContent');
    var $navbarToggler = $('.navbar-toggler');

    // Prevent body scroll when mobile menu is open
    $navbarCollapse.on('show.bs.collapse', function () {
        $('body').addClass('mobile-menu-open');
    });

    $navbarCollapse.on('hide.bs.collapse', function () {
        $('body').removeClass('mobile-menu-open');
    });

    // Close menu when a navigation link or CTA is clicked
    $navbarCollapse.find('.nav-link, .whatsapp_btn').on('click', function () {
        if ($(window).width() < 992) {
            $navbarCollapse.collapse('hide');
        }
    });
});