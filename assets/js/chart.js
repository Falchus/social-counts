$(function () {
    const canvas = document.getElementById("chart");
    if (!canvas) return;

    const chart = new Chart(canvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                data: []
            }]
        },
        options: {
            animation: false,
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
    let pending = false;

    function push(value) {
        if (firstValue === undefined) {
            firstValue = value;
        }

        chart.data.labels.push("");
        chart.data.datasets[0].data.push(value - firstValue);

        if (!pending) {
            pending = true;
            requestAnimationFrame(() => {
                chart.update("none");
                pending = false;
            })
        }
    }

    window.ChartManager = {
        push
    };
});