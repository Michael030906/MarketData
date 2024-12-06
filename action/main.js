// Fetch trending coins
async function fetchTrendingCoins() {
    const apiUrl = "https://api.coingecko.com/api/v3/search/trending";
    const coinList = document.getElementById("coinList");
    const error = document.getElementById("error");

    if (!coinList) return; // Ensure this is the crypto page

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        coinList.innerHTML = "";

        data.coins.forEach((coin, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${coin.item.name} (${coin.item.symbol})`;
            listItem.style.cursor = "pointer";
            listItem.onclick = () => fetchCoinDetails(coin.item.id);
            coinList.appendChild(listItem);
        });
    } catch (err) {
        console.error("Error fetching trending coins:", err);
        error.textContent = "Failed to fetch trending coins.";
    }
}

// Fetch coin details
async function fetchCoinDetails(coinId) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const details = document.getElementById("coinDetails");

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById("coinName").textContent = `Name: ${data.name}`;
        document.getElementById("coinSymbol").textContent = `Symbol: ${data.symbol}`;
        document.getElementById("coinMarketCapRank").textContent = `Market Cap Rank: ${data.market_cap_rank}`;
        document.getElementById("coinPrice").textContent = `Price: $${data.market_data.current_price.usd}`;
        document.getElementById("coinPriceChange").textContent = `24h Price Change: ${data.market_data.price_change_percentage_24h}%`;
        document.getElementById("coinHistory").textContent = `Historical Data: ${data.market_data.price_change_percentage_14d || "Not available"}`;
        details.style.display = "block";
    } catch (err) {
        console.error("Error fetching coin details:", err);
    }
}

// Fetch stock data
async function fetchStockData() {
    const symbolInput = document.getElementById("stockSymbol");
    const error = document.getElementById("error");
    const details = document.getElementById("stockDetails");

    if (!symbolInput) return; // Ensure this is the stock page

    const symbol = symbolInput.value.trim().toUpperCase();
    const apiKey = "KRE43IKY4V811JNA";
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;

    if (!symbol) {
        alert("Please enter a stock symbol.");
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data["Error Message"] || !data["Monthly Time Series"]) {
            error.textContent = "Invalid stock symbol or no data available.";
            return;
        }

        const timeSeries = data["Monthly Time Series"];
        const latestDate = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDate];

        document.getElementById("stockDate").textContent = `Date: ${latestDate}`;
        document.getElementById("stockOpen").textContent = `Open: ${latestData["1. open"]}`;
        document.getElementById("stockHigh").textContent = `High: ${latestData["2. high"]}`;
        document.getElementById("stockLow").textContent = `Low: ${latestData["3. low"]}`;
        document.getElementById("stockClose").textContent = `Close: ${latestData["4. close"]}`;
        document.getElementById("stockVolume").textContent = `Volume: ${latestData["5. volume"]}`;
        details.style.display = "block";
    } catch (err) {
        console.error("Error fetching stock data:", err);
        error.textContent = "Failed to fetch stock data.";
    }
}

// Hide details (common function for both stocks and crypto)
function hideDetails() {
    const coinDetails = document.getElementById("coinDetails");
    const stockDetails = document.getElementById("stockDetails");
    if (coinDetails) coinDetails.style.display = "none";
    if (stockDetails) stockDetails.style.display = "none";
}

// Auto-fetch trending coins if it's the crypto page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("coinList")) {
        fetchTrendingCoins();
    }
});
