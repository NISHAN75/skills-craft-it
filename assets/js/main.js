/*
  The Name: Us Valve
  File: main.js
  Description: Site-wide interactions - header height sync, mobile
               offcanvas menu, Magnific Popup video modal, GSAP
               scroll animations, OverlayScrollbars, and Lenis
               smooth scroll.
*/

/* JS INDEX
-----------------------------------
1. Header Height Sync
2. Offcanvas Hamburger Menu (Bootstrap offcanvas)
3. Magnific Popup - Video Modal (YouTube / Vimeo iframe)
4. GSAP - Banner Diagonal Line Animation
5. GSAP - Product Catalog Title Stripe Animation
6. OverlayScrollbars - Custom Scrollbar
7. Lenis - Smooth Scroll
-----------------------------------
*/

(function ($) {
    $(document).ready(function () {
        

        

       

        /* ==================================================================
           2. OFFCANVAS HAMBURGER MENU
           Toggles the hamburger icon's "open" state and morphs the close
           button's two spans into an X whenever the Bootstrap offcanvas
           mobile menu is shown/hidden.
           ================================================================== */
        let offcanvasElement = $('.header-offcanvas');
        offcanvasElement.on('show.bs.offcanvas', function () {
            $('.humbarger-btn').addClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: 'rotate(45deg)',
                marginBottom: '0'
            });
            $('.btn-close span:nth-child(2)').css({
                transform: 'rotate(-45deg)',
                marginTop: '-4px'
            });
        });
        offcanvasElement.on('hide.bs.offcanvas', function () {
            $('.humbarger-btn').removeClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: '',
                marginBottom: ''
            });
            $('.btn-close span:nth-child(2)').css({
                transform: '',
                marginTop: ''
            });
        });

        /* ==================================================================
           3. MAGNIFIC POPUP - VIDEO MODAL (YouTube / Vimeo iframe)
           Any element with class "trigger-popup" opens its href inside an
           iframe lightbox. YouTube/Vimeo URLs are pattern-matched so only
           the video ID is embedded, with autoplay enabled. The Vimeo
           player instance auto-closes the popup when playback ends, and
           the background placeholder video resumes when the popup closes.
           ================================================================== */


        /* ==================================================================
           GSAP SETUP
           ================================================================== */
        gsap.registerPlugin(ScrollTrigger);




        /* ==================================================================
           6. OVERLAYSCROLLBARS - CUSTOM SCROLLBAR
           Replaces the native browser scrollbar on <body> with a themed
           OverlayScrollbars instance (click-to-scroll + drag-to-scroll
           enabled, auto-hides on mouse leave, smooth scroll behavior).
           ================================================================== */
        const {
            OverlayScrollbars,
            ClickScrollPlugin
        } = OverlayScrollbarsGlobal;
        // Initialize the ClickScrollPlugin
        OverlayScrollbars.plugin(ClickScrollPlugin);
        $("body").each(function () {
            OverlayScrollbars(this, {
                scrollbars: {
                    clickScroll: true,
                    autoHide: "leave",
                    dragScrolling: true,
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });

        /* ==================================================================
           7. LENIS - SMOOTH SCROLL
           Initializes Lenis for inertia-based smooth scrolling and wires
           it into GSAP's ticker/ScrollTrigger so scroll-driven animations
           stay perfectly in sync with the smoothed scroll position.
           ================================================================== */
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);


    });
})(jQuery);