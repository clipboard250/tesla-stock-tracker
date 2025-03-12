// Function to get the most recent trading day
function getMostRecentTradingDay() {
    let today = new Date();
    let dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    if (dayOfWeek === 0) { // Sunday
        today.setDate(today.getDate() - 2); // Set to Friday
    } else if (dayOfWeek === 1) { // Monday
        today.setDate(today.getDate() - 3); // Set to Friday
    } else {
        today.setDate(today.getDate() - 1); // Set to yesterday
    }

    return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Function to load stock data from the CSV file
async function loadStockData() {
    try {
        const response = await fetch("tesla_stock_data.csv");
        const data = await response.text();

        const rows = data.split("\n").slice(1);
        const stockData = rows.map(row => row.split(",")).filter(row => row.length === 2);

        const datePicker = document.getElementById("datePicker").value;
        const selectedData = stockData.find(row => row[0] === datePicker);

        if (selectedData) {
            const date = selectedData[0];
            const price = parseFloat(selectedData[1]);
            document.getElementById("stockPrice").innerText = `Tesla closed at $${price.toFixed(2)} on ${datePicker}`;
        } else {
            document.getElementById("stockPrice").innerText = "Stock data unavailable for selected date.";
        }
    } catch (error) {
        console.error("Error loading stock data:", error);
        document.getElementById("stockPrice").innerText = "Error fetching stock data.";
    }
}

// Load stock data on page load and when date is changed
window.onload = loadStockData;
document.getElementById("getData").onclick = loadStockData;    }
}

// Load stock data when the page loads
window.onload = loadStockData;
document.getElementById("getData").addEventListener("click", () => {
    loadStockData();
});
// Set the date picker to the most recent trading day
document.getElementById("datePicker").value = getMostRecentTradingDay();
