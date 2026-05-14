YT.multisearch = {
  getResults: function (e) {
    $.getJSON(
      "https://api.subscribercounter.nl/api/youtube-subscriber-count/" + encodeURIComponent(e) + "/search",
      function (e) {
        let $er = $("#results");
        $er.html("");
        e.data.forEach(function (f) {
          if (f.id === YT.live.vs1 || f.id === YT.live.vs2) return;
          $er.append(this.giveHtml(f.name, f.picture, f.id));
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
        this.changeChannel(id);
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
    this.getResults($("#searchvalue_m").val());
  },
  changeChannel: function (e) {
    if (YT.sharing.changing == null) return;
    if (YT.sharing.changing === "vs1") {
      YT.urls.pushState(e, YT.live.vs2);
    } else {
      YT.urls.pushState(YT.live.vs1, e);
    }
    this.resetCompare();
  },
  bind: function () {
    $("#comrest").on("click", this.resetCompare);
    $("#search_m").on("submit", this.newSearch);
    $("#searchbutton_m").on("click", this.newSearch);
  }
};
