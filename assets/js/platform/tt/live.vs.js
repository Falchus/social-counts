TT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.getJSON("//tiktok-api.tokcounter.com/user/data/" + TT.live.vs1, function (f) {
      $.getJSON("//tiktok-api.tokcounter.com/user/data/" + TT.live.vs2, function (g) {
        TT.updateManager.updateSubscribers(f.stats.followers, g.stats.followers);
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
