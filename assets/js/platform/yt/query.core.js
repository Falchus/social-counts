YT.query = {
  newSearch: function (e) {
    if (e.trim() === YT.live.channelID || e.trim() === "") return;

    YT.live.stop();
    if (e.trim().substr(0, 2).toUpperCase() === "UC" && e.trim().length >= 24) {
      $.getJSON("https://socialcounts-api.falchus.com/youtube/user/" + encodeURIComponent(e), f => {
        if (!e) {
          alert("No results found!");
          location.href = url;
          return;
        }
        YT.updateManager.updateChannelID(encodeURIComponent(e));
        YT.updateManager.updateCover(f.banner);
        YT.updateManager.updateName(f.name);
        YT.updateManager.updateProfile(f.pfp);
        YT.urls.pushState(encodeURIComponent(e));
        YT.live.start();
      });
    } else {
      $.getJSON("https://mixerno.space/api/youtube-channel-counter/search/" + encodeURIComponent(e), e => {
        if (!e) {
          alert("No results found!");
          location.href = url;
          return;
        }
        this.newSearch(e.list[0][2]);
      });
    }
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
