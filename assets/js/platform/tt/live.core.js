TT.live = {
  id: "",
  update: function () {
    $.getJSON("https://socialcounts-api.falchus.com/tiktok/user/" + this.id, e => {
      if (!e) {
        TT.query.newSearch(this.id);
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
