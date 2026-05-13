YT.query = {
  begin: function () {
    $.getJSON(
      "https://apitest.falchus.com/social-counts/youtube/user/" + encodeURIComponent(YT.live.vs1),
      function (f) {
        $.getJSON(
          "https://apitest.falchus.com/social-counts/youtube/user/" + encodeURIComponent(YT.live.vs2),
          function (g) {
            YT.updateManager.updateCover(f.banner, g.banner);
            YT.updateManager.updateName(f.name, g.name);
            YT.updateManager.updateProfile(f.pfp, g.pfp);
          },
        );
      },
    );
  },
  bind: function () {}
};
