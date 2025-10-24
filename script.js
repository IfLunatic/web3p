(function ($) {
  $(function () {
    var $win = $(window);
    var $parallax = $(".parallax");

    if ($parallax.length === 0) return;

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      $parallax.css("background-attachment", "fixed");
      return;
    }

    var winH = $win.height();
    var lastScrollY = $win.scrollTop();
    var ticking = false;

    function isInViewport($el, scrollY, vh) {
      var top = $el.offset().top;
      var h = $el.outerHeight();
      var bottom = top + h;
      var buffer = 120;
      var viewTop = scrollY - buffer;
      var viewBottom = scrollY + vh + buffer;
      return bottom > viewTop && top < viewBottom;
    }
    function update() {
      var scrollY = lastScrollY;

      $parallax.each(function () {
        var $section = $(this);

        if (!isInViewport($section, scrollY, winH)) return;
        var speed = parseFloat($section.data("speed"));
        if (isNaN(speed)) speed = 0.4; 
        var sectionTop = $section.offset().top;
        var y = Math.round((scrollY - sectionTop) * speed);
        $section.css("background-position", "50% " + y + "px");
      });

      ticking = false;
    }

    function onScroll() {
      lastScrollY = $win.scrollTop();
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    function onResize() {
      winH = $win.height();
      onScroll();
    }

    $win.on("scroll", onScroll);
    $win.on("resize orientationchange", onResize);

    onResize();
  });
})(jQuery);
