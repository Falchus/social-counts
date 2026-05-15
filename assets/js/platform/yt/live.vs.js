YT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + this.vs1, f => {
      $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + this.vs2, g => {
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
    this.timer = setInterval(() => {
      this.update();
    }, 2000);
    this.update();
  },
  stop: function () {
    clearInterval(this.timer);
  }
};
