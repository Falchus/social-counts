YT.live = {
  channelID: "",
  update: function () {
    $.getJSON("//backend.mixerno.space/api/youtube/estv3/" + this.channelID, function (e) {
      if (e) {
        YT.updateManager.updateSubscribers(e.items[0].statistics.subscriberCount);
        YT.updateManager.updateViews(e.items[0].statistics.viewCount);
        YT.updateManager.updateVideos(e.items[0].statistics.videoCount);
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
