TT.query = {
  begin: function (f, g) {
      TT.updateManager.updateName(f.name, g.name);
      TT.updateManager.updateProfile(f.picture, g.picture);
  },
  bind: function () {}
};
