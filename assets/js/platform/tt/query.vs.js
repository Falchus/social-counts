TT.query = {
  begin: function () {
    $.getJSON(
      "https://tiktok-api.tokcounter.com/user/data/" + encodeURIComponent(TT.live.vs1),
      function (f) {
        $.getJSON(
          "https://tiktok-api.tokcounter.com/user/data/" + encodeURIComponent(TT.live.vs2),
          function (g) {
            TT.updateManager.updateName(f.username, g.username);
            TT.updateManager.updateProfile(f.avatar, g.avatar);
          },
        );
      },
    );
  },
  bind: function () {}
};
