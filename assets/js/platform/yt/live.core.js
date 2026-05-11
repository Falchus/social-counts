YT.live = {
  channelID: "",
  update: function () {
    $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + this.channelID, function (e) {
      if (e) {
        YT.updateManager.updateSubscribers(e.statistics.subs);
        YT.updateManager.updateViews(e.statistics.views);
        YT.updateManager.updateVideos(e.statistics.videos);
      } else {
        YT.query.newSearch(YT.live.channelID);
      }
    });
  },
  timer: null,
  start: function () {
    this.stop();
    this.timer = setInterval(function () {
      YT.live.update();
    }, 2000);
    YT.live.update();
  },
  stop: function () {
    clearInterval(this.timer);
  },
};
