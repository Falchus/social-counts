TT.urls = {
  onchange: function () {
    const q = location.hash.split("!/")[1];
    if (q) {
      TT.query.newSearch(location.hash.split("!/")[1]);
    } else {
      const coolGuys = [
        "mrbeast",
        "khaby.lame"
      ];
      TT.query.newSearch(coolGuys[Math.floor(Math.random() * coolGuys.length)]);
    }
  },
  pushState: function (e) {
    history.pushState(null, null, "#!/" + e);
    TT.query.newSearch(e);
  }
};
