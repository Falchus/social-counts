TT.query = {
  begin: function () {
    $.getJSON(
      "https://apitest.falchus.com/social-counts/tiktok/user/" + encodeURIComponent(TT.live.vs1), f => {
        $.getJSON(
          "https://apitest.falchus.com/social-counts/tiktok/user/" + encodeURIComponent(TT.live.vs2), g => {
            TT.updateManager.updateName(f.name, g.name);
            TT.updateManager.updateProfile(f.pfp, g.pfp);
          },
        );
      },
    );
  },
  bind: function () {}
};
