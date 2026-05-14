$(function () {
    const canvas = document.getElementById("chart");
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
                decimation: {
                    enabled: true,
                    algorithm: "lttb",
                    samples: canvas.clientWidth
                },
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
    let pending = false;

    function push(value) {
        if (firstValue === undefined) {
            firstValue = value;
        }

        const data = chart.data.datasets[0].data;
        data.push({
            x: x++,
            y: value - firstValue
        });
        if (data.length >= canvas.clientWidth) {
            data.length = 0;
            firstValue = undefined;
        }

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