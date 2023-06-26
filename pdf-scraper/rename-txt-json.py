import os

directory = "./"

for filename in os.listdir(directory):
    if filename.endswith(".txt"):
        base = os.path.splitext(filename)[0]
        print(base)
        os.rename(
            os.path.join(directory, filename),
            os.path.join("./gpt-info-jsons", base + ".json"),
        )
