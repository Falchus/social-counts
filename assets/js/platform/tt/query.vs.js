TT.query = {
  begin: function () {
    $.getJSON(
      "https://apitest.falchus.com/social-counts/tiktok/user/" + encodeURIComponent(TT.live.vs1),
      function (f) {
        $.getJSON(
          "https://apitest.falchus.com/social-counts/tiktok/user/" + encodeURIComponent(TT.live.vs2),
          function (g) {
            TT.updateManager.updateName(f.name, g.name);
            TT.updateManager.updateProfile(f.pfp, g.pfp);
          },
        );
      },
    );
  },
  bind: function () {}
};
