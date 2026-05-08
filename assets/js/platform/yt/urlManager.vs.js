YT.urls = {
  onchange: function () {
    let q = location.hash.split("!/")[1];
    if (q) {
      q = q.split("$$");
      YT.urls.pushState(q[0], q[1]);
    } else {
      YT.urls.pushState("UC-lHJZR3Gqxm24_Vd_AJ5Yw", "UCq-Fj5jknLsUf-MWSy4_brA");
    }
  },
  pushState: function (e, f) {
    let c;
    if (e > f) {
      c = e;
      e = f;
      f = c;
    }
    history.pushState(null, null, "#!/" + e + "$$" + f);
    YT.live.setVS(e, f);
  }
};
