window.initQuery = function (ns) {
  if (!ns) return;
  const cfg = App.current;

  if (App.compareMode) {
    ns.query = {
      begin(a, b) {
        if (cfg.ui.cover !== false) {
          ns.updateManager.updateCover(a.banner, b.banner);
        }
        ns.updateManager.updateName(a.name, b.name);
        ns.updateManager.updateProfile(a.picture, b.picture);
      },
      bind() {}
    };
    return;
  }

  ns.query = {
    newSearch(query) {
      query = query.trim();
      if (query === ns.live.id || query === "") return;

      ns.live.stop();
      $.getJSON("https://socialcounts-api.falchus.com/" + cfg.api + "/" + encodeURIComponent(query), data => {
        if (!data) {
          alert("No results found!");
          return;
        }
        const id = data.id || query;
        ns.updateManager.updateId(id);
        if (cfg.ui.cover !== false && data.banner) {
          ns.updateManager.updateCover(data.banner);
        }
        ns.updateManager.updateName(data.name);
        ns.updateManager.updateProfile(data.picture);
        ns.urls.pushState(id);
        ns.live.start();
      });
    },
    search(e) {
      e.preventDefault();
      this.newSearch($("#searchvalue").val());
      $("#searchvalue").val("");
    },
    bind() {
      const search = this.search.bind(this);
      $("#search").on("submit", search);
      $("#searchbutton").on("click", search);
    }
  };
};
