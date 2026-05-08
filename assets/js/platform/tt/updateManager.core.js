TT.updateManager = {
  prepare: function () {
    const odEl = ["#tt_subs", "#tt_views", "#tt_videos"];
    odEl.forEach(function (e) {
      new Odometer({
        el: document.querySelector(e),
        value: "0",
        format: "(,ddd)",
        theme: "minimal",
      });
    });
  },
  updateName: function (e) {
    $(".tt_name").text(e);
  },
  updateProfile: function (e) {
    $("#tt_profile").attr("src", e);
  },
  updateSubscribers: function (e) {
    $("#tt_subs").text(e);
  },
  updateViews: function (e) {
    $("#tt_views").text(e);
  },
  updateVideos: function (e) {
    $("#tt_videos").text(e);
  },
  updateChannelID: function (e) {
    TT.live.channelID = e;
  },
};
