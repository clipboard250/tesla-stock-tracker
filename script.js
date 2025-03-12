// Function to get the most recent trading day
function getMostRecentTradingDay() {
    let today = new Date();
    let dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

    // If today is Saturday or Sunday, set it to last Friday
    if (dayOfWeek === 0) {
        today.setDate(today.getDate() - 2);
    } else if (dayOfWeek === 6) {
        today.setDate(today.getDate() - 1);
    }

    return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
}

// Function to load stock data from the CSV file
async function loadStockData() {
    try {
        const response = await fetch("tesla_stock_data.csv");
        const data = await response.text();

        // Parse CSV
        const rows = data.split("\n").slice(1); // Skip header
        const latestStock = rows[rows.length - 1].split(","); // Last row

        const date = latestStock[0];
        const price = parseFloat(latestStock[1]);

        if (!isNaN(price)) {
            document.getElementById("stockPrice").innerText = `Tesla closed at $${price.toFixed(2)} on ${date}`;
        } else {
            document.getElementById("stockPrice").innerText = "Stock data unavailable.";
        }
    } catch (error) {
        console.error("Error loading stock data:", error);
        document.getElementById("stockPrice").innerText = "Error fetching stock data.";
    }
}

// Set the date picker to the most recent trading day
document.getElementById("datePicker").value = getMostRecentTradingDay();

// Load stock data when the page loads
window.onload = loadStockData;
