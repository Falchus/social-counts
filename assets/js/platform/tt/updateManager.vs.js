TT.updateManager = {
  prepare: function () {
    const odEl = ["#tt_subs_vs1", "#tt_subs_vs2", "#tt_diff"];
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
    $("#tt_profile_vs1").attr("src", e);
    $("#tt_profile_vs2").attr("src", f);
  },
  updateSubscribers: function (e, f) {
    $("#tt_subs_vs1").text(e);
    $("#tt_subs_vs2").text(f);
    $("#tt_diff").text(Math.abs(parseInt(e) - parseInt(f)));
    if (parseInt(e) - parseInt(f) > 0) {
      $(document.body).addClass("leading-left").removeClass("leading-right");
    } else {
      $(document.body).addClass("leading-right").removeClass("leading-left");
    }
  },
};
