YT.live = {
  channelID: "",
  update: function () {
    $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + this.channelID, e => {
      if (e) {
        YT.updateManager.updateSubscribers(e.statistics.subs);
        YT.updateManager.updateViews(e.statistics.views);
        YT.updateManager.updateVideos(e.statistics.videos);
      } else {
        YT.query.newSearch(this.channelID);
      }
    });
  },
  timer: null,
  start: function () {
    this.stop();
    this.timer = setInterval(() => {
      this.update();
    }, 2000);
    this.update();
  },
  stop: function () {
    clearInterval(this.timer);
  }
};
