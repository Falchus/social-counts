TT.live = {
  channelID: "",
  update: function () {
    $.getJSON("https://apitest.falchus.com/social-counts/tiktok/user/" + this.channelID, e => {
      if (!e) {
        TT.query.newSearch(this.channelID);
        return;
      }
      TT.updateManager.updateSubscribers(e.statistics.subs);
      TT.updateManager.updateLikes(e.statistics.likes);
      TT.updateManager.updateVideos(e.statistics.videos);
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
