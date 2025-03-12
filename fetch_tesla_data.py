import yfinance as yf
import csv

# Fetch Tesla historical stock data from Jan 1, 2017, to today
tsla = yf.Ticker("TSLA")
history = tsla.history(start="2017-01-01")

# Save historical data to CSV file
csv_filename = "tesla_stock_data.csv"
history["Close"].to_csv(csv_filename, header=["Close Price"], date_format='%Y-%m-%d')

print(f"Historical Tesla stock data saved to '{csv_filename}'")
