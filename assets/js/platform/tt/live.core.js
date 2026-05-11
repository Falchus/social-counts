TT.live = {
  channelID: "",
  update: function () {
    $.getJSON("//tiktok-api.tokcounter.com/user/data/" + this.channelID, function (e) {
      if (e) {
        TT.updateManager.updateSubscribers(e.stats.followers);
        TT.updateManager.updateLikes(e.stats.likes);
        TT.updateManager.updateVideos(e.stats.videos);
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
