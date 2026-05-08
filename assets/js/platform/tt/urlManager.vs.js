TT.urls = {
  onchange: function () {
    let q = location.hash.split("!/")[1];
    let c;
    if (q) {
      q = q.split("$$");
      if (q[0] > q[1]) {
        c = q[0];
        q[0] = q[1];
        q[1] = c;
      }
      TT.urls.pushState(q[0], q[1]);
    } else {
      TT.urls.pushState("khaby.lame", "charlidamelio");
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
    TT.live.setVS(e, f);
  }
};
