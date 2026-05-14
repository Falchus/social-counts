YT.query = {
  newSearch: function (e) {
    if (e.trim() === YT.live.channelID || e.trim() === "") return;

    YT.live.stop();
    if (e.trim().substr(0, 2).toUpperCase() === "UC" && e.trim().length >= 24) {
      $.getJSON("https://apitest.falchus.com/social-counts/youtube/user/" + encodeURIComponent(e), function (f) {
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
      $.getJSON("https://mixerno.space/api/youtube-channel-counter/search/" + encodeURIComponent(e), function (e) {
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
    $("#search").on("submit", this.search);
    $("#searchbutton").on("click", this.search);
  }
};
