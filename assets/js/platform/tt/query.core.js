TT.query = {
  newSearch: function (e) {
    if (e.trim() === TT.live.id || e.trim() === "") return;
    TT.live.stop();

    $.getJSON("https://socialcounts-api.falchus.com/tiktok/user/" + encodeURIComponent(e), f => {
      if (!e) {
        alert("No results found!");
        location.href = url;
        return;
      }
      TT.updateManager.updateId(encodeURIComponent(e));
      TT.updateManager.updateName(f.name);
      TT.updateManager.updateProfile(f.picture);
      TT.urls.pushState(encodeURIComponent(e));
      TT.live.start();
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
