document.getElementById("datePicker").valueAsDate = new Date();

function updateChart() {
    let selectedDate = document.getElementById("datePicker").value;
    alert("Fetching data for: " + selectedDate);
    // This is where the API connection will go
}