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

window.updateOdometer = function (odometer, val) {
  if (odometer.value) return odometer.update(val);
  val = odometer.cleanValue(val);
  odometer.value = val;
  odometer.render(val);
};

window.ChartManager = {
  push: function (value) {},
  reset: function () {}
};