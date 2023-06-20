import os
import json
import pandas as pd

directory = './jsons'
output_file = 'combined.json'
output_parquet_file = 'combined.parquet'

json_array = []

for file in os.listdir(directory):
    if file.endswith('.json'):
        print(file)
        with open(os.path.join(directory, file)) as f:
            try:
                data = json.load(f)
                json_array.append(data)
            except:
                print(f'Error parsing JSON file: {file}')
with open(output_file, 'w') as outfile:
    json.dump(json_array, outfile)

# df = pd.json_normalize(json_array)

# # Save DataFrame to Parquet
# df.to_parquet(output_parquet_file)
