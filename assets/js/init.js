$(window).bind("popstate", YT.urls ? YT.urls.onchange : false);
$(function () {
  YT.updateManager.prepare();
  YT.multisearch.bind();
  YT.query.bind();
  YT.urls && YT.urls.onchange();
});
