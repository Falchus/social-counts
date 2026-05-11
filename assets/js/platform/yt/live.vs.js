YT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + YT.live.vs1, function (f) {
      $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + YT.live.vs2, function (g) {
        YT.updateManager.updateSubscribers(f.statistics.subs, g.statistics.subs);
      });
    });
  },
  timer: null,
  setVS: function (e, f) {
    this.vs1 = e;
    this.vs2 = f;
    this.start();
  },
  start: function () {
    this.stop();
    YT.query.begin();
    this.timer = setInterval(function () {
      YT.live.update();
    }, 10000);
    YT.live.update();
  },
  stop: function () {
    clearInterval(this.timer);
  },
};
