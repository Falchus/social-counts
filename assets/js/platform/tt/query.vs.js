TT.query = {
  begin: function (f, g) {
      TT.updateManager.updateName(f.name, g.name);
      TT.updateManager.updateProfile(f.pfp, g.pfp);
  },
  bind: function () {}
};
