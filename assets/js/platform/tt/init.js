$(window).bind("popstate", TT.urls ? TT.urls.onchange : false);
$(function () {
  TT.updateManager.prepare();
  TT.multisearch.bind();
  TT.query.bind();
  TT.urls && TT.urls.onchange();
});
