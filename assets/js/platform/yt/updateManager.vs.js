YT.updateManager = {
  prepare: function () {
    const odEl = ["#subs_vs1", "#subs_vs2", "#diff"];
    odEl.forEach(function (e) {
      new Odometer({
        el: document.querySelector(e),
        value: "0",
        format: "(,ddd)",
        theme: "minimal",
      });
    });
  },
  updateName: function (e, f) {
    $(".vs1_name").text(e);
    $(".vs2_name").text(f);
  },
  updateProfile: function (e, f) {
    $("#profile_vs1").attr("src", e);
    $("#profile_vs2").attr("src", f);
  },
  updateCover: function (e, f) {
    $("#cover_vs1").attr("src", e);
    $("#cover_vs2").attr("src", f);
  },
  updateSubscribers: function (e, f) {
    $("#subs_vs1").text(e);
    $("#subs_vs2").text(f);
    $("#diff").text(Math.abs(parseInt(e) - parseInt(f)));
    if (parseInt(e) - parseInt(f) > 0) {
      $(document.body).addClass("leading-left").removeClass("leading-right");
    } else {
      $(document.body).addClass("leading-right").removeClass("leading-left");
    }
  },
};
