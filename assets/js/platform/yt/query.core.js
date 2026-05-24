YT.query = {
  newSearch: function (e) {
    if (e.trim() === YT.live.id || e.trim() === "") return;

    YT.live.stop();
    $.getJSON("https://socialcounts-api.falchus.com/youtube/user/" + encodeURIComponent(e), f => {
      if (!e) {
        alert("No results found!");
        location.href = url;
        return;
      }
      YT.updateManager.updateId(encodeURIComponent(e));
      YT.updateManager.updateCover(f.banner);
      YT.updateManager.updateName(f.name);
      YT.updateManager.updateProfile(f.picture);
      YT.urls.pushState(encodeURIComponent(e));
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
