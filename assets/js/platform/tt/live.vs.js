TT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.getJSON("https://mixerno.space/api/tiktok-user-counter/user/" + TT.live.vs1, function (f) {
      $.getJSON("https://mixerno.space/api/tiktok-user-counter/user/" + TT.live.vs2, function (g) {
        TT.updateManager.updateSubscribers(f.counts[0].count, g.counts[0].count);
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
    TT.query.begin();
    this.timer = setInterval(function () {
      TT.live.update();
    }, 10000);
    TT.live.update();
  },
  stop: function () {
    clearInterval(this.timer);
  },
};
