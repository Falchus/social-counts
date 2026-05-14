TT.urls = {
  onchange: function () {
    let q = location.hash.split("!/")[1];
    if (q) {
      q = q.split("$$");
      this.pushState(q[0], q[1]);
    } else {
      this.pushState("khaby.lame", "charlidamelio");
    }
  },
  pushState: function (e, f) {
    history.pushState(null, null, "#!/" + e + "$$" + f);
    TT.live.setVS(e, f);
  }
};
