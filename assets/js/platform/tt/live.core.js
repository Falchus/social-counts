TT.live = {
  channelID: "",
  update: function () {
    $.getJSON("https://mixerno.space/api/tiktok-user-counter/user/" + this.channelID, function (e) {
      if (e) {
          TT.updateManager.updateSubscribers(e.counts[0].count);
          TT.updateManager.updateLikes(e.counts[2].count);
          TT.updateManager.updateVideos(e.counts[4].count);
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
