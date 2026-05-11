TT.multisearch = {
  getResults: function (e) {
    $.getJSON(
      "//tiktok-api.tokcounter.com/user/search/" + encodeURIComponent(e),
      function (e) {
        let $er = $("#results");
        $er.html("");
        e.data.forEach(function (f) {
          if (f.id === TT.live.vs1 || f.id === TT.live.vs2) return;
          $er.append(TT.multisearch.giveHtml(f.username, f.avatar, f.id));
        });
      },
    );
  },
  giveHtml: function (name, image, id) {
    let $e = $("<div>", {
      class: "round align-self-center",
      style: "background: url('" + image + "');background-size:cover;",
    });
    let $ee = $("<h3>", {
      class: "m-b-0 font-light",
    }).text(name);
    let $f = $("<div>", {
      class: "m-l-10 align-self-center",
    }).append($ee);
    let $g = $("<div>", {
      class: "d-flex flex-row",
    });
    $g.append($e).append($f);
    return $("<div>", {
      class: "card-block card m-b-15",
    })
      .append($g)
      .on("click", function () {
        TT.multisearch.changeChannel(id);
      });
  },
  resetCompare: function () {
    $(".super-search").fadeOut("400", function () {
      $("#results").html("");
      $("#searchvalue_m").val("");
    });
  },
  newSearch: function (e) {
    e.preventDefault();
    TT.multisearch.getResults($("#searchvalue_m").val());
  },
  changeChannel: function (e) {
    if (TT.sharing.changing == null) return;
    if (TT.sharing.changing === "vs1") {
      TT.urls.pushState(e, TT.live.vs2);
    } else {
      TT.urls.pushState(TT.live.vs1, e);
    }
    this.resetCompare();
  },
  bind: function () {
    $("#comrest").on("click", this.resetCompare);
    $("#search_m").on("submit", this.newSearch);
    $("#searchbutton_m").on("click", this.newSearch);
  },
};
