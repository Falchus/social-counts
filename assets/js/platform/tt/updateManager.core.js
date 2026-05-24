TT.updateManager = {
  prepare: function () {
    ["#subs", "#likes", "#videos"].forEach(e => {
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
  updateSubscribers: function (e) {
    $("#subs").text(e);
    ChartManager.push(e);
  },
  updateLikes: function (e) {
    $("#likes").text(e);
  },
  updateVideos: function (e) {
    $("#videos").text(e);
  },
  updateChannelID: function (e) {
    TT.live.channelID = e;
    ChartManager.reset();
  }
};
