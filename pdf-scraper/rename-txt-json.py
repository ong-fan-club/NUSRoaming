import os

directory = '.'

for filename in os.listdir(directory):
    print(filename)
    if filename.endswith('.txt'):
        base = os.path.splitext(filename)[0]
        os.rename(os.path.join(directory, filename), os.path.join(directory, base + '.json'))
