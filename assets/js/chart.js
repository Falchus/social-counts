$(function () {
    const canvas = document.getElementById("chart");
    if (!canvas) return;

    const chart = new Chart(canvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                data: [],
            }]
        },
        options: {
            animation: false,
            pointRadius: 0,
            pointHoverRadius: 0,
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
                    display: false
                },
                y: {
                    display: false,
                    beginAtZero: true
                }
            }
        }
    });

    let firstValue;

    function push(value) {
        if (firstValue === undefined) {
            firstValue = value;
            chart.data.labels.push("");
            chart.data.datasets[0].data.push(0);
            chart.update();
            return;
        }

        chart.data.labels.push(new Date().toLocaleTimeString());
        chart.data.datasets[0].data.push(value - firstValue);

        if (chart.data.labels.length > 30) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        chart.update();
    }

    window.ChartManager = {
        push
    };
});