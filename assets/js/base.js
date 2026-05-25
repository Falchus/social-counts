window.getNsObject = function (nsName) {
  if (!window[nsName]) {
    window[nsName] = {};
  }
  return window[nsName];
};

window.ChartManager = {
  push: function (value) {},
  reset: function () {}
};