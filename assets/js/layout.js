window.Layout = {
  config: null,
  active: null,

  init(config) {
    this.config = config;
    const { stat } = parseHash();
    this.active = stat && config.stats[stat] ? stat : config.default;
    this.apply();
    this.bindClicks();
  },

  applyH1Class(h1, size) {
    h1.classList.remove("display-1", "display-5");
    h1.classList.add(size);
    const extra = h1.dataset.extraClass;
    if (extra) {
      extra.split(/\s+/).forEach(cls => cls && h1.classList.add(cls));
    }
  },

  apply() {
    const primary = document.getElementById("primary");
    const secondary = document.getElementById("secondary");
    const extras = document.getElementById("extras");
    const pool = document.getElementById("pool");
    if (!primary || !pool) return;

    document.querySelectorAll(".item").forEach(u => pool.appendChild(u));
    primary.innerHTML = "";
    if (secondary) secondary.innerHTML = "";

    const items = [...pool.querySelectorAll(".item")];
    const activeItem = items.find(u => u.dataset.key === this.active);
    const others = items.filter(u => u.dataset.key !== this.active);

    if (activeItem) {
      this.applyH1Class(activeItem.querySelector("h1"), "display-1");
      const wrap = document.createElement("div");
      wrap.className = "card-body";
      const inner = document.createElement("div");
      inner.className = "position-relative";
      const white = document.createElement("div");
      white.className = "white";
      white.appendChild(activeItem);
      inner.appendChild(white);
      wrap.appendChild(inner);
      primary.appendChild(wrap);
    }

    if (secondary && others.length) {
      const colSize = Math.floor(12 / others.length);
      others.forEach(item => {
        this.applyH1Class(item.querySelector("h1"), "display-5");
        const col = document.createElement("div");
        col.className = "col-12 col-lg-" + colSize;

        const card = document.createElement("div");
        card.className = "card";
        const cardBlock = document.createElement("div");
        cardBlock.className = "card-block";
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const pos = document.createElement("div");
        pos.className = "position-relative";
        const white = document.createElement("div");
        white.className = "mt-2 ml-2 white";
        white.appendChild(item);
        pos.appendChild(white);
        cardBody.appendChild(pos);
        cardBlock.appendChild(cardBody);
        card.appendChild(cardBlock);
        col.appendChild(card);
        secondary.appendChild(col);
      });
    }

    if (extras) {
      extras.hidden = others.length === 0;
    }

    const info = document.getElementById("info");
    if (info && this.config.info) {
      info.hidden = this.active !== this.config.info;
    }

    this.refreshOdometers();
  },

  refreshOdometers() {
    if (!App.current || App.compareMode) return;
    const um = App.getNs().updateManager;
    if (!um || !um.odometers) return;
    Object.values(um.odometers).forEach(od => {
      if (od.render) {
        od.render();
      }
    });
  },

  set(key) {
    if (!this.config.stats[key] || key === this.active) return;
    this.active = key;
    const { id } = parseHash();
    history.replaceState(null, null, buildUrl(id));
    this.apply();
    this.bindClicks();
    if (window.ChartManager) {
      ChartManager.reset();
      const um = App.getNs().updateManager;
      const od = um?.odometers?.[key];
      const raw = od ? od.value : document.getElementById(key)?.textContent;
      const num = Number(String(raw).replace(/,/g, ""));
      if (Number.isFinite(num)) {
        ChartManager.push(num);
      }
      const live = App.getNs().live;
      if (live?.id) {
        live.start();
      }
    }
  },

  bindClicks() {
    document.querySelectorAll("#secondary .item").forEach(item => {
      const card = item.closest(".card");
      const target = card || item;
      target.onclick = () => this.set(item.dataset.key);
    });
  },

  getActive() {
    return this.active;
  }
};
