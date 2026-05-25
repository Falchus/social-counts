window.App = {
  current: null,
  compareMode: false,
  base: "/social-counts/assets/js/",

  isCompare() {
    return location.pathname.replace(/\/+$/, "").endsWith("/compare");
  },

  getPlatformKey() {
    return PlatformRegistry.resolveKey({
      compare: this.isCompare()
    });
  },

  buildPool(platform) {
    const pool = document.getElementById("pool");
    if (!pool) return;
    pool.innerHTML = platform.stats.map(s => {
      const extra = s.extraClass ? ' data-extra-class="' + s.extraClass + '"' : "";
      return '<div class="item" data-key="' + s.id + '">' +
          '<h1 id="' + s.id + '"' + extra + '>0</h1>' +
          '<span class="label">' + s.label + '</span></' + 'div>';
    }).join("");
  },

  applyUi(platform) {
    const cover = document.getElementById("cover");
    const profile = document.querySelector(".little-profile");
    const infoRow = document.getElementById("info");

    if (cover) {
      cover.style.maxHeight = platform.ui.cover === false ? "0" : "";
    }

    if (profile) {
      profile.classList.remove("views");
      if (platform.ui.profileClass) {
        profile.classList.add(platform.ui.profileClass);
      }
    }

    if (infoRow) {
      infoRow.hidden = !platform.ui.infoRow;
    }
  },

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = this.base + src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  },

  getNs() {
    return getNsObject(this.current.ns);
  },

  async boot() {
    this.compareMode = this.isCompare();
    const key = this.getPlatformKey();
    this.current = PLATFORMS[key];

    if (!this.compareMode) {
      window.PAGE_CONFIG = {
        layout: this.current.layout
      };
      this.buildPool(this.current);
      this.applyUi(this.current);
    }

    for (const script of PLATFORM_SCRIPTS) {
      await this.loadScript(script);
    }
    Platform.init(this.current.ns);
    await this.loadScript("init.js");
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.boot());
} else {
  App.boot();
}
