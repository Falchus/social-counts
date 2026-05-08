TT.query = {
  newSearch: function (e) {
    if (e.trim() === TT.live.channelID || e.trim() === "") return;

    TT.live.stop();
    if (e.trim().substr(0, 2).toUpperCase() === "UC" && e.trim().length >= 24) {
      console.log(e);
      $.getJSON("//mixerno.space/api/tiktok-user-counter/user/" + encodeURIComponent(e), function (f) {
        if (!e) {
          alert("No results found!");
          location.href = baseURL;
          return;
        }
        TT.updateManager.updateChannelID(encodeURIComponent(e));
        TT.updateManager.updateName(f.user[0].count);
        TT.updateManager.updateProfile(f.user[1].count);
        TT.urls.pushState(encodeURIComponent(e));
        TT.live.start();
      });
    } else {
      $.getJSON("//mixerno.space/api/tiktok-user-counter/search/" + encodeURIComponent(e), function (e) {
        if (!e) {
          alert("No results found!");
          location.href = baseURL;
          return;
        }
        TT.query.newSearch(e.list[0][2]);
      });
    }
  },
  search: function (e) {
    e.preventDefault();
    TT.query.newSearch($("#tt_searchvalue").val());
    $("#tt_searchvalue").val("");
  },
  bind: function () {
    $("#tt_search").on("submit", this.search);
    $("#tt_searchbutton").on("click", this.search);
  }
};
