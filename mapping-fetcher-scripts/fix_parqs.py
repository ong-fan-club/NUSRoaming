import os

import pandas as pd

dir_path = "parqs"

all_data = pd.DataFrame()

for filename in os.listdir(dir_path):
    file_path = os.path.join(dir_path, filename)

    df = pd.read_parquet(file_path)
    df = df.iloc[2:]

    df.columns = list("ABCDEFGHIJLMNOP")  # 15 cols
    all_data = pd.concat([all_data, df])

print(all_data)

all_data.to_parquet("mappings.parquet")
