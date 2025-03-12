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

        const rows = data.split("\n").slice(1); // Skip header row
      const latestStock = rows.find(row => row.trim() !== "").split(","); // Correctly grab first row of actual data

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

// Load stock data when the page loads
window.onload = loadStockData;

// Set the date picker to the most recent trading day
document.getElementById("datePicker").value = getMostRecentTradingDay();
