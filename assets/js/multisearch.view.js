YT.multisearch = {
  getResults: function (e) {
    $.getJSON(
      "//api.subscribercounter.nl/api/youtube-view-count/" + encodeURIComponent(e) + "/search",
      function (e) {
        let $er = $("#results");
        $er.html("");
        e.data.forEach(function (f) {
          if (f.id === YT.live.channelID) return;
          $er.append(YT.multisearch.giveHtml(f.name, f.picture, f.id));
        });
      },
    );
  },
  resetCompare: function () {
    $(".super-search").fadeOut("400", function () {
      $("#results").html("");
      $("#yt_searchvalue_m").val("");
    });
  },
  newSearch: function (e) {
    e.preventDefault();
    YT.multisearch.getResults($("#yt_searchvalue_m").val());
  },
  launchCompare: function (e) {
    if (e === YT.live.channelID) return;
    window.open("https://counts.live/compare/youtube-view-count/" + YT.live.channelID + "/youtube-view-count/" + e);
    this.resetCompare();
  },
  bind: function () {
    $("#yt_comrest").on("click", this.resetCompare);
    $("#yt_search_m").on("submit", this.newSearch);
    $("#yt_searchbutton_m").on("click", this.newSearch);
  },
};
