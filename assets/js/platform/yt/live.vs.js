YT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.when(
        $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + this.vs1),
        $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + this.vs2)
    ).done(([f], [g]) => {
      YT.query.begin(f, g);
      YT.updateManager.updateSubscribers(f.statistics.subs, g.statistics.subs);

      this.nextUpdate = Math.max(f.update.next, g.update.next);
    });
  },
  timer: null,
  nextUpdate: 0,
  setVS: function (e, f) {
    this.vs1 = e;
    this.vs2 = f;
    this.start();
  },
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
