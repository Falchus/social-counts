(function () {
  const SITE = "/social-counts";
  const DEFAULT = "yt";
  const ALIASES = {
    tiktok: "tt"
  };

  function buildLayout(stats, overrides) {
    const statMap = Object.fromEntries(stats.map(s => [s.id, s.label]));
    return Object.assign({
      default: stats[0].id,
      stats: statMap,
      chart: stats[0].id
    }, overrides || {});
  }

  function definePlatform(key, config) {
    const defaults = config.defaults || [];
    return {
      ns: config.ns || key.toUpperCase().replace(/[^a-z0-9]/gi, ""),
      api: config.api,
      poll: config.poll ?? 2000,
      stats: config.stats,
      layout: buildLayout(config.stats, config.layout),
      ui: Object.assign({
        cover: true,
        infoRow: false
      }, config.ui),
      defaults: defaults,
      compareDefaults: config.compareDefaults || (defaults.length >= 2 ? defaults.slice(0, 2) : null),
      compareUrl(a, b) {
        return PlatformRegistry.comparePageUrl(key, a, b);
      },
      nameHtml: !!config.nameHtml
    };
  }

  window.PLATFORMS = {
    yt: definePlatform("yt", {
      ns: "YT",
      api: "youtube/user",
      stats: [
        {
          id: "subs",
          label: "Subscribers"
        },
        {
          id: "views",
          label: "Views"
        },
        {
          id: "videos",
          label: "Videos"
        }
      ],
      layout: {
        info: "subs"
      },
      ui: {
        infoRow: true
      },
      defaults: [
        "UCX6OQ3DkcsbYNE6H8uQQuVA",
        "UCMiJRAwDNSNzuYeN2uWa0pA",
        "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
      ],
      compareDefaults: [
        "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
        "UCq-Fj5jknLsUf-MWSy4_brA"
      ]
    }),
    "yt-video": definePlatform("yt-video", {
      ns: "YT",
      api: "youtube/video",
      nameHtml: true,
      stats: [
        {
          id: "views",
          label: "Views"
        },
        {
          id: "likes",
          label: "Likes"
        },
        {
          id: "dislikes",
          label: "Dislikes"
        },
        {
          id: "comments",
          label: "Comments"
        }
      ],
      layout: {
        default: "views",
        chart: "views"
      },
      ui: {
        cover: false,
        profileClass: "views"
      },
      defaults: [
        "dBxOYE2j55U",
        "9bZkp7q19f0",
        "60ItHLz5WEA"
      ],
      compareDefaults: [
        "XqZsoesa55w",
        "kJQP7kiw5Fk"
      ]
    }),

    tt: definePlatform("tt", {
      ns: "TT",
      api: "tiktok/user",
      poll: 10000,
      stats: [
        {
          id: "subs",
          label: "Subscribers"
        },
        {
          id: "likes",
          label: "Likes"
        },
        {
          id: "videos",
          label: "Videos"
        }
      ],
      defaults: [
        "mrbeast",
        "khaby.lame"
      ],
      compareDefaults: [
        "khaby.lame",
        "charlidamelio"
      ]
    })
  };

  window.PLATFORM_SCRIPTS = [
    "platform/urlManager.js",
    "platform/updateManager.js",
    "platform/query.js",
    "platform/live.js",
    "platform/multisearch.js",
    "platform/boot.js"
  ];

  window.PlatformRegistry = {
    SITE,
    DEFAULT_KEY: DEFAULT,
    ALIASES,

    normalizeKey(raw) {
      if (!raw) return DEFAULT;
      if (PLATFORMS[raw]) return raw;
      if (ALIASES[raw]) return ALIASES[raw];
      return raw;
    },

    getParam() {
      const raw = new URLSearchParams(location.search).get("platform");
      return this.normalizeKey(raw || DEFAULT);
    },

    resolveKey({ compare } = {}) {
      const key = this.getParam();
      if (compare && !PLATFORMS[key]?.compareDefaults) return DEFAULT;
      return PLATFORMS[key] ? key : DEFAULT;
    },

    pagePath(key) {
      key = this.normalizeKey(key);
      if (key === DEFAULT) return SITE + "/";
      return SITE + "/?platform=" + encodeURIComponent(key);
    },

    comparePagePath(key) {
      key = this.normalizeKey(key);
      if (key === DEFAULT) return SITE + "/compare/";
      return SITE + "/compare/?platform=" + encodeURIComponent(key);
    },

    comparePageUrl(key, a, b) {
      let url = this.comparePagePath(key);
      if (a != null && b != null) url += "#!/" + a + "$$" + b;
      return url;
    },

    buildUrl(id) {
      const pageQs = new URLSearchParams(location.search);
      pageQs.delete("stat");
      const platform = pageQs.get("platform");
      if (!platform || platform === DEFAULT) pageQs.delete("platform");

      let hash = id ? "#!/" + id : "";
      const active = window.Layout && Layout.config ? Layout.getActive() : null;
      const defaultStat = Layout && Layout.config ? Layout.config.default : null;
      if (active && active !== defaultStat) {
        hash += "?stat=" + encodeURIComponent(active);
      }

      const qs = pageQs.toString();
      return (qs ? "?" + qs : "") + hash;
    },

    buildCompareUrl(a, b) {
      const pageQs = new URLSearchParams(location.search);
      pageQs.delete("stat");
      const platform = pageQs.get("platform");
      if (!platform || platform === DEFAULT) pageQs.delete("platform");
      const qs = pageQs.toString();
      return (qs ? "?" + qs : "") + "#!/" + a + "$$" + b;
    }
  };
})();

window.buildUrl = (id) => PlatformRegistry.buildUrl(id);
window.buildCompareUrl = (a, b) => PlatformRegistry.buildCompareUrl(a, b);
