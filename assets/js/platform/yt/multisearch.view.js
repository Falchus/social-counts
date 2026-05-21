YT.multisearch = {
  getResults: function (e) {
    $.getJSON(
      "https://api.subscribercounter.nl/api/youtube-view-count/" + encodeURIComponent(e) + "/search", e => {
        let $er = $("#results");
        $er.html("");
        e.data.forEach(function (f) {
          if (f.id === YT.live.channelID) return;
          $er.append(this.giveHtml(f.name, f.picture, f.id));
        });
      },
    );
  },
  resetCompare: function () {
    $(".super-search").fadeOut("400", function () {
      $("#results").html("");
      $("#searchvalue_m").val("");
    });
  },
  newSearch: function (e) {
    e.preventDefault();
    this.getResults($("#searchvalue_m").val());
  },
  launchCompare: function (e) {
    if (e === YT.live.channelID) return;
    window.open("https://counts.live/compare/youtube-view-count/" + YT.live.channelID + "/youtube-view-count/" + e);
    this.resetCompare();
  },
  bind: function () {
    const newSearch = this.newSearch.bind(this);

    $("#comrest").on("click", this.resetCompare.bind(this));
    $("#search_m").on("submit", newSearch);
    $("#searchbutton_m").on("click", newSearch);
  }
};
