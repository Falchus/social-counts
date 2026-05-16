YT.live = {
  channelID: "",
  update: function () {
    $.getJSON("https://socialcounts-api.falchus.com/youtube/user/" + this.channelID, e => {
      if (!e) {
        YT.query.newSearch(this.channelID);
        return;
      }
      YT.updateManager.updateSubscribers(e.statistics.subs);
      YT.updateManager.updateViews(e.statistics.views);
      YT.updateManager.updateVideos(e.statistics.videos);

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
    }, this.nextUpdate || 2000);
  },
  stop: function () {
    clearTimeout(this.timer);
  }
};
