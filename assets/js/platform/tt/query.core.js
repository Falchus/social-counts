TT.query = {
  newSearch: function (e) {
    if (e.trim() === TT.live.channelID || e.trim() === "") return;
    TT.live.stop();

    console.log(e);
    $.getJSON("https://tiktok-api.tokcounter.com/user/data/" + encodeURIComponent(e), function (f) {
      if (!e) {
        alert("No results found!");
        location.href = baseURL;
        return;
      }
      TT.updateManager.updateChannelID(encodeURIComponent(e));
      TT.updateManager.updateName(f.username);
      TT.updateManager.updateProfile(f.avatar);
      TT.urls.pushState(encodeURIComponent(e));
      TT.live.start();
    });
  },
  search: function (e) {
    e.preventDefault();
    TT.query.newSearch($("#searchvalue").val());
    $("#searchvalue").val("");
  },
  bind: function () {
    $("#search").on("submit", this.search);
    $("#searchbutton").on("click", this.search);
  }
};
