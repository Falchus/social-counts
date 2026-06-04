window.initUpdateManager = function (ns) {
  if (!ns) return;
  const cfg = App.current;

  if (App.compareMode) {
    ns.updateManager = {
      prepare() {
        ["#subs_vs1", "#subs_vs2", "#diff"].forEach(sel => {
          const el = document.querySelector(sel);
          if (!el) return;
          new Odometer(Object.assign({
            el: el
          }, ODOMETER));
        });
      },
      updateName(a, b) {
        $(".vs1_name").text(a);
        $(".vs2_name").text(b);
      },
      updateProfile(a, b) {
        $("#profile_vs1").attr("src", a);
        $("#profile_vs2").attr("src", b);
      },
      updateCover(a, b) {
        if (cfg.ui.cover === false) return;
        $("#cover_vs1").attr("src", a);
        $("#cover_vs2").attr("src", b);
      },
      updateSubscribers(a, b) {
        $("#subs_vs1").text(a);
        $("#subs_vs2").text(b);
        $("#diff").text(Math.abs(parseInt(a, 10) - parseInt(b, 10)));
        if (parseInt(a, 10) - parseInt(b, 10) > 0) {
          $(document.body).addClass("leading-left").removeClass("leading-right");
        } else {
          $(document.body).addClass("leading-right").removeClass("leading-left");
        }
      }
    };
    return;
  }

  const stats = Object.keys(cfg.layout.stats);

  ns.updateManager = {
    odometers: {},

    prepare() {
      stats.forEach(stat => {
        const el = document.querySelector("#" + stat);
        if (!el) return;
        this.odometers[stat] = new Odometer(Object.assign({
          el: el
        }, ODOMETER));
      });
    },
    updateName(name) {
      $(".name")[cfg.nameHtml ? "html" : "text"](name);
    },
    updateProfile(src) {
      $("#profile").attr("src", src);
    },
    updateCover(src) {
      const cover = document.getElementById("cover");
      if (cover && cfg.ui.cover !== false) {
        cover.src = src;
      }
    },
    setStat(stat, val) {
      const odometer = this.odometers[stat];
      if (odometer) {
        updateOdometer(odometer, val);
      } else {
        $("#" + stat).text(val);
      }
      if (window.Layout && Layout.getActive() === stat) {
        ChartManager.push(val);
      }
    },
    updateId(id) {
      ns.live.id = id;
      ChartManager.reset();
    }
  };
};
