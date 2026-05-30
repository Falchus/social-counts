$(function () {
  "use strict";
  function set() {
    const width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
    const topOffset = 70;
    if (width < 1170) {
      $("body").addClass("mini-sidebar");
      $(".navbar-brand span").hide();
      $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
      $(".sidebartoggler i").addClass("ti-menu");
    } else {
      $("body").removeClass("mini-sidebar");
      $(".navbar-brand span").show();
    }

    let height = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
      $(".page-wrapper").css("min-height", height + "px");
    }
  }
  $(window).ready(set);
  $(window).on("resize", set);

  $(".fix-header .topbar").stick_in_parent({});

  $(".nav-toggler").click(() => {
    $("body").toggleClass("show-sidebar");
    $(".nav-toggler i").toggleClass("ti-menu");
    $(".nav-toggler i").addClass("ti-close");
  });
  $("a[href^='#']").on("click", e => {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $(this.hash).offset().top - 90
      },
      300
    );
  });

  $("body").trigger("resize");
});
