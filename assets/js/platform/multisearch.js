window.initMultisearch = function (ns) {
  if (!ns) return;
  const cfg = App.current;
  const searchApi = cfg.multisearchApi || cfg.api;

  ns.multisearch = {
    getResults(term) {
      const self = this;
      $.getJSON("https://socialcounts-api.falchus.com/" + searchApi + "/" + encodeURIComponent(term), res => {
        const $er = $("#results").html("");
        if (!res || !res.data) return;
        res.data.forEach(item => {
          if (App.compareMode) {
            if (item.id === ns.live.vs1 || item.id === ns.live.vs2) return;
          } else if (item.id === ns.live.id) {
            return;
          }
          $er.append(self.giveHtml(item.name, item.picture, item.id));
        });
      });
    },
    giveHtml(name, image, id) {
      const self = this;
      const $row = $("<div>", { class: "d-flex flex-row" });
      $row.append(
        $("<div>", {
          class: "round align-self-center",
          style: "background: url('" + image + "'); background-size: cover;"
        }),
        $("<div>", { class: "m-l-10 align-self-center" }).append(
          $("<h3>", { class: "m-b-0 font-light" }).text(name)
        )
      );
      return $("<div>", { class: "card-block card m-b-15" })
        .append($row)
        .on("click", () => {
          if (App.compareMode) self.swapChannel(id);
          else self.launchCompare(id);
        });
    },
    resetCompare() {
      $(".super-search").fadeOut("400", function () {
        $("#results").html("");
        $("#searchvalue_m").val("");
      });
    },
    newSearch(e) {
      e.preventDefault();
      this.getResults($("#searchvalue_m").val());
    },
    launchCompare(otherId) {
      if (otherId === ns.live.id) return;
      location.href = cfg.compareUrl(ns.live.id, otherId);
      this.resetCompare();
    },
    swapChannel(id) {
      if (ns.swapSide === "vs1") {
        ns.urls.pushState(id, ns.live.vs2);
      } else if (ns.swapSide === "vs2") {
        ns.urls.pushState(ns.live.vs1, id);
      }
      this.resetCompare();
    },
    bind() {
      const newSearch = this.newSearch.bind(this);
      $("#comrest").on("click", this.resetCompare.bind(this));
      $("#search_m").on("submit", newSearch);
      $("#searchbutton_m").on("click", newSearch);
    }
  };
};
