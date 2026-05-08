YT.urls = {
  onchange: function () {
    const q = location.hash.split("!/")[1];
    if (q) {
      YT.query.newSearch(location.hash.split("!/")[1]);
    } else {
      const coolGuys = [
        "UCX6OQ3DkcsbYNE6H8uQQuVA",
        "UCMiJRAwDNSNzuYeN2uWa0pA",
        "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
      ];
      YT.query.newSearch(coolGuys[Math.floor(Math.random() * coolGuys.length)]);
    }
  },
  pushState: function (e) {
    history.pushState(null, null, "#!/" + e);
    YT.query.newSearch(e);
  }
};
