document.addEventListener('partial-load', function (e) {
  if (e.detail !== "chart") return;

  const section = document.getElementById("chart");
  const canvas = section && section.querySelector("canvas");
  if (!canvas) return;

  const chart = new Chart(canvas, {
    type: "line",
    data: {
      datasets: [{
        data: []
      }]
    },
    options: {
      animation: false,
      parsing: false,
      normalized: true,
      pointRadius: 0,
      pointHoverRadius: 0,
      elements: {
        line: {
          fill: false,
          tension: 0
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          type: "linear",
          display: false
        },
        y: {
          display: false,
          beginAtZero: true
        }
      }
    }
  });

  let x = 0;
  let firstValue;
  let data = chart.data.datasets[0].data;

  function push(value) {
    if (firstValue === undefined) {
      firstValue = value;
    }

    data.push({
      x: x++,
      y: value - firstValue
    });
    const width = canvas.clientWidth;
    if (width > 0 && data.length >= width) {
      reset();
    }

    chart.update("none");
  }

  function reset() {
    data.length = 0;
    firstValue = undefined;
    x = 0;
  }

  window.ChartManager = {
    push,
    reset
  };
});