YT.urls = {
  onchange: function () {
    let q = location.hash.split("!/")[1];
    if (q) {
      q = q.split("$$");
      this.pushState(q[0], q[1]);
    } else {
      this.pushState("UC-lHJZR3Gqxm24_Vd_AJ5Yw", "UCq-Fj5jknLsUf-MWSy4_brA");
    }
  },
  pushState: function (e, f) {
    history.pushState(null, null, "#!/" + e + "$$" + f);
    YT.live.setVS(e, f);
  }
};