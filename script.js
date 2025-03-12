// Function to get the most recent trading day
function getMostRecentTradingDay() {
    let today = new Date();
    let dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

    if (dayOfWeek === 0) {
        // If today is Sunday, set date to last Friday
        today.setDate(today.getDate() - 2);
    } else if (dayOfWeek === 6) {
        // If today is Saturday, set date to last Friday
        today.setDate(today.getDate() - 1);
    }

    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

// Function to load stock data from the CSV file
async function loadStockData() {
    const response = await fetch("tesla_stock_data.csv");
    const data = await response.text();

    // Parse CSV
    const rows = data.split("\n").slice(1); // Skip the header row
    const latestStock = rows[rows.length - 1].split(","); // Get the last available row

    const date = latestStock[0];
    const price = latestStock[1];

    document.getElementById("stockPrice").innerText = `Tesla closed at $${parseFloat(price).toFixed(2)} on ${date}`;
}

// Set the date picker to the most recent trading day
document.getElementById("datePicker").value = getMostRecentTradingDay();

// Load stock data when the page loads
window.onload = loadStockData;