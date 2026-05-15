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

      this.nextUpdate = e.update.next;
    });
  },
  timer: null,
  nextUpdate: 0,
  start: function () {
    this.stop();
    this.update();
    this.timer = setTimeout(() => {
      this.start();
    }, this.nextUpdate || 10000);
  },
  stop: function () {
    clearTimeout(this.timer);
  }
};
