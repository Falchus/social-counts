YT.query = {
  begin: function () {
    $.getJSON(
      "https://backend.mixerno.space/api/youtube/estv3/" + encodeURIComponent(YT.live.vs1),
      function (f) {
        $.getJSON(
          "https://backend.mixerno.space/api/youtube/estv3/" + encodeURIComponent(YT.live.vs2),
          function (g) {
            YT.updateManager.updateCover(f.items[0].brandingSettings.image, g.items[0].brandingSettings.image);
            YT.updateManager.updateName(f.items[0].snippet.title, g.items[0].snippet.title);
            YT.updateManager.updateProfile(f.items[0].snippet.thumbnails.default.url, g.items[0].snippet.thumbnails.default.url);
          },
        );
      },
    );
  },
  bind: function () {}
};
