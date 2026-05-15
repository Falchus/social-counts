YT.updateManager = {
  prepare: function () {
    ["#views", "#likes", "#dislikes", "#comments"].forEach(function (e) {
      new Odometer({
        el: document.querySelector(e),
        value: "0",
        format: "(,ddd)",
        theme: "minimal",
      });
    });
  },
  updateName: function (e) {
    $(".name").html(e);
  },
  updateProfile: function (e) {
    $("#profile").attr("src", e);
  },
  updateCover: function (e) {
    $("#cover").attr("src", e);
  },
  updateViews: function (e) {
    $("#views").text(e);
    ChartManager.push(e);
  },
  updateLikes: function (e) {
    $("#likes").text(e);
  },
  updateDislikes: function (e) {
    $("#dislikes").text(e);
  },
  updateComments: function (e) {
    $("#comments").text(e);
  },
  updateChannelID: function (e) {
    YT.live.channelID = e;
  }
};
