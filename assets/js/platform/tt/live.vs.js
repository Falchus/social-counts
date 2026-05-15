TT.live = {
  vs1: "",
  vs2: "",
  update: function () {
    $.getJSON("https://apitest.falchus.com/social-counts/tiktok/user/" + this.vs1, f => {
      $.getJSON("https://apitest.falchus.com/social-counts/tiktok/user/" + this.vs2, g => {
        TT.query.begin();
        TT.updateManager.updateSubscribers(f.statistics.subs, g.statistics.subs);

        this.nextUpdate = Math.max(f.update.next, g.update.next);
      });
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
    }, this.nextUpdate || 10000);
  },
  stop: function () {
    clearTimeout(this.timer);
  }
};
