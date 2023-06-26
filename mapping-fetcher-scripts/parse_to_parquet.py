import glob

import pandas as pd
from bs4 import BeautifulSoup

# iterate over all HTML files
for filepath in glob.glob("htmls/*"):
    with open(filepath, "r") as f:
        contents = f.read()

    soup = BeautifulSoup(contents, "lxml")

    table = soup.find_all("table")
    if table:
        df = pd.read_html(str(table[0]), header=0)[
            0
        ]  # header=0 means the first row will be treated as column names

        # Skip if DataFrame is empty
        if df.empty:
            continue

        # Save DataFrame to Parquet, removing the .html extension and adding .parq
        df.to_parquet("parqs/" + filepath)
    else:
        print(f"No table found in the HTML file: {filepath}")
