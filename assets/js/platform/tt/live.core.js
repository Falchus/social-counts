TT.live = {
  channelID: "",
  update: function () {
    $.getJSON("https://apitest.falchus.com/social-counts/tiktok/user/" + this.channelID, function (e) {
      if (e) {
          TT.updateManager.updateSubscribers(e.statistics.subs);
          TT.updateManager.updateLikes(e.statistics.likes);
          TT.updateManager.updateVideos(e.statistics.videos);
      } else {
        TT.query.newSearch(TT.live.channelID);
      }
    });
  },
  timer: null,
  start: function () {
    this.stop();
    this.timer = setInterval(function () {
      TT.live.update();
    }, 2000);
    TT.live.update();
  },
  stop: function () {
    clearInterval(this.timer);
  },
};
