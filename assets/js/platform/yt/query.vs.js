YT.query = {
  begin: function (f, g) {
      YT.updateManager.updateCover(f.banner, g.banner);
      YT.updateManager.updateName(f.name, g.name);
      YT.updateManager.updateProfile(f.picture, g.picture);
  },
  bind: function () {}
};
