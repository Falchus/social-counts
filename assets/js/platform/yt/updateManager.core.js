YT.updateManager = {
  prepare: function () {
    ["#subs", "#views", "#videos"].forEach(function (e) {
      new Odometer({
        el: document.querySelector(e),
        value: "0",
        format: "(,ddd)",
        theme: "minimal",
      });
    });
  },
  updateName: function (e) {
    $(".name").text(e);
  },
  updateProfile: function (e) {
    $("#profile").attr("src", e);
  },
  updateCover: function (e) {
    $("#cover").attr("src", e);
  },
  updateSubscribers: function (e) {
    $("#subs").text(e);
    ChartManager.push(e);
  },
  updateViews: function (e) {
    $("#views").text(e);
  },
  updateVideos: function (e) {
    $("#videos").text(e);
  },
  updateChannelID: function (e) {
    YT.live.channelID = e;
  }
};
