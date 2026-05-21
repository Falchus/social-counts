YT.query = {
  newSearch: function (e) {
    if (e.trim() === YT.live.channelID || e.trim() === "") return;

    YT.live.stop();
    $.getJSON("https://socialcounts-api.falchus.com/youtube/video/" + encodeURIComponent(e), e => {
      if (!e) {
        alert("No results found!");
        return;
      }
      YT.updateManager.updateChannelID(e.id);
      YT.updateManager.updateCover(e.picture);
      YT.updateManager.updateName(e.name);
      YT.updateManager.updateProfile(e.picture);
      YT.urls.pushState(e.id);
      YT.live.start();
    });
  },
  search: function (e) {
    e.preventDefault();
    this.newSearch($("#searchvalue").val());
    $("#searchvalue").val("");
  },
  bind: function () {
    const search = this.search.bind(this);

    $("#search").on("submit", search);
    $("#searchbutton").on("click", search);
  }
};
