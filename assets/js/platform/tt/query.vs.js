TT.query = {
  begin: function () {
    $.getJSON(
      "//mixerno.space/api/tiktok-user-counter/user/" + encodeURIComponent(TT.live.vs1),
      function (f) {
        $.getJSON(
          "//mixerno.space/api/tiktok-user-counter/user/" + encodeURIComponent(TT.live.vs2),
          function (g) {
            TT.updateManager.updateName(f.user[0].count, g.user[0].count);
            TT.updateManager.updateProfile(f.user[1].count, g.user[1].count);
          },
        );
      },
    );
  },
  bind: function () {}
};
