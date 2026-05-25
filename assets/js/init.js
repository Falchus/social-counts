$(window).bind("popstate", function () {
  if (App.current && App.getNs().urls) App.getNs().urls.onchange();
});

$(function () {
  const ns = App.getNs();

  if (window.PAGE_CONFIG) {
    Layout.init(window.PAGE_CONFIG.layout);
  }

  ns.updateManager.prepare();
  ns.multisearch.bind();
  ns.query.bind();
  ns.urls && ns.urls.onchange();
});
