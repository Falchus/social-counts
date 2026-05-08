$(window).bind("popstate", function () {
  YT.urls && YT.urls.onchange();
  TT.urls && TT.urls.onchange();
});
$(function () {
  YT.updateManager.prepare();
  YT.multisearch.bind();
  YT.query.bind();
  YT.urls && YT.urls.onchange();

  TT.updateManager.prepare();
  TT.multisearch.bind();
  TT.query.bind();
  TT.urls && TT.urls.onchange();
});
