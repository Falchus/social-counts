YT.live = {
  channelID: "",
  update: function () {
    $.getJSON("https://socialcounts-api.falchus.com/youtube/video/" + this.channelID, e => {
      if (!e) {
        YT.query.newSearch(this.channelID);
        return;
      }
      YT.updateManager.updateViews(e.statistics.views);
      YT.updateManager.updateLikes(e.statistics.likes);
      YT.updateManager.updateDislikes(e.statistics.dislikes);
      YT.updateManager.updateComments(e.statistics.comments);
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
