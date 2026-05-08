YT.updateManager = {
  prepare: function () {
    var odEl = ["#yt_views", "#yt_likes", "#yt_dislikes", "#yt_comments"];
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
    $(".yt_name").html(e);
  },
  updateProfile: function (e) {
    $("#yt_profile").attr("src", e);
  },
  updateCover: function (e) {
    $("#yt_cover").attr("src", e);
  },
  updateViews: function (e) {
    $("#yt_views").text(e);
  },
  updateLikes: function (e) {
    $("#yt_likes").text(e);
  },
  updateDislikes: function (e) {
    $("#yt_dislikes").text(e);
  },
  updateComments: function (e) {
    $("#yt_comments").text(e);
  },
  updateChannelID: function (e) {
    YT.live.channelID = e;
  },
};
