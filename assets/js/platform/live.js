window.initLive = function (ns) {
  if (!ns) return;
  const cfg = App.current;

  if (App.compareMode) {
    ns.live = {
      vs1: "",
      vs2: "",
      timer: null,
      nextUpdate: cfg.poll,
      scheduleNext(delay) {
        this.nextUpdate = delay || this.nextUpdate || cfg.poll;
        this.timer = setTimeout(() => this.update(), this.nextUpdate);
      },
      update() {
        if (!this.vs1 || !this.vs2) return;
        $.when(
          $.getJSON("https://socialcounts-api.falchus.com/" + cfg.api + "/" + encodeURIComponent(this.vs1)),
          $.getJSON("https://socialcounts-api.falchus.com/" + cfg.api + "/" + encodeURIComponent(this.vs2))
        ).done(([a], [b]) => {
          if (!a || !b) {
            this.scheduleNext(cfg.poll);
            return;
          }
          ns.query.begin(a, b);
          ns.updateManager.updateSubscribers(a.statistics.subs, b.statistics.subs);
          this.scheduleNext(Math.max(a.update.next, b.update.next));
        }).fail(() => {
          this.scheduleNext(cfg.poll);
        });
      },
      setVS(a, b) {
        this.vs1 = a;
        this.vs2 = b;
        this.start();
      },
      start() {
        this.stop();
        this.update();
      },
      stop() {
        clearTimeout(this.timer);
        this.timer = null;
      }
    };
    return;
  }

  const stats = Object.keys(cfg.layout.stats);

  ns.live = {
    id: "",
    timer: null,
    nextUpdate: cfg.poll,
    update() {
      if (!this.id) return;
      $.getJSON("https://socialcounts-api.falchus.com/" + cfg.api + "/" + encodeURIComponent(this.id), data => {
        if (!data) {
          this.nextUpdate = cfg.poll;
        } else {
          stats.forEach(stat => {
            if (data.statistics && data.statistics[stat] != null) {
              ns.updateManager.setStat(stat, data.statistics[stat]);
            }
          });
          this.nextUpdate = (data.update && data.update.next) || cfg.poll;
        }
        this.timer = setTimeout(() => this.update(), this.nextUpdate);
      }).fail(() => {
        this.nextUpdate = cfg.poll;
        this.timer = setTimeout(() => this.update(), this.nextUpdate);
      });
    },
    start() {
      this.stop();
      this.update();
    },
    stop() {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
};
