window.initUrlManager = function (ns) {
  if (!ns) return;
  const cfg = App.current;

  if (App.compareMode) {
    ns.urls = {
      onchange() {
        const { a, b } = parseCompareHash();
        if (a || b) {
          this.pushState(a || cfg.compareDefaults[0], b || cfg.compareDefaults[1]);
        } else {
          this.pushState(cfg.compareDefaults[0], cfg.compareDefaults[1]);
        }
      },
      pushState(a, b) {
        history.pushState(null, null, buildCompareUrl(a, b));
        ns.live.setVS(a, b);
      }
    };
    return;
  }

  ns.urls = {
    onchange() {
      const { id } = parseHash();
      if (id) {
        ns.query.newSearch(id);
      } else {
        const defaults = cfg.defaults;
        ns.query.newSearch(defaults[Math.floor(Math.random() * defaults.length)]);
      }
    },
    pushState(id) {
      history.pushState(null, null, buildUrl(id));
    }
  };
};
