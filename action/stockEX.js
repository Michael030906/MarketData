
function renderAppleStockChart() {
    const ctx = document.getElementById("appleStockChart").getContext("2d");

    const dates = [
        "2024-11-27", "2024-11-28", "2024-11-29", "2024-12-01",
        "2024-12-02", "2024-12-03", "2024-12-04", "2024-12-05",
        "2024-12-06", "2024-12-07",
    ];
    const prices = [175.32, 177.41, 178.90, 180.25, 179.56, 181.00, 182.45, 183.10, 184.20, 185.50];

    new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Price (USD)",
                    data: prices,
                    borderColor: "#6200ea",
                    borderWidth: 2,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Price (USD)",
                    },
                    beginAtZero: false,
                },
            },
        },
    });
}

document.addEventListener("DOMContentLoaded", renderAppleStockChart);
