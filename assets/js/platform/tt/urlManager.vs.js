TT.urls = {
  onchange: function () {
    let q = location.hash.split("!/")[1];
    if (q) {
      q = q.split("$$");
      TT.urls.pushState(q[0], q[1]);
    } else {
      TT.urls.pushState("khaby.lame", "charlidamelio");
    }
  },
  pushState: function (e, f) {
    history.pushState(null, null, "#!/" + e + "$$" + f);
    TT.live.setVS(e, f);
  }
};
