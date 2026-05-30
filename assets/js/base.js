window.getNsObject = function (nsName) {
  if (!window[nsName]) {
    window[nsName] = {};
  }
  return window[nsName];
};

window.API = "https://socialcounts-api.falchus.com/";

window.ODOMETER = {
  value: 0,
  format: "(,ddd)",
  theme: "minimal"
};

window.ChartManager = {
  push: function (value) {},
  reset: function () {}
};