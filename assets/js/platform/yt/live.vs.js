YT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.getJSON("https://backend.mixerno.space/api/youtube/estv3/" + YT.live.vs1, function (f) {
      $.getJSON("https://backend.mixerno.space/api/youtube/estv3/" + YT.live.vs2, function (g) {
        YT.updateManager.updateSubscribers(f.items[0].statistics.subscriberCount, g.items[0].statistics.subscriberCount);
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
