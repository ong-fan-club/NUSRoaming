import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

base_url = "https://www.nus.edu.sg/gro/global-programmes/student-exchange/partner-universities"

r = requests.get(base_url)
soup = BeautifulSoup(r.text, 'html.parser')

# Find all links on the page and download them
for link in soup.find_all('a'):
    href = link.get('href')
    if href is not None and '.pdf' in href and len(link.contents)>0 and len(link.contents[0])>0:
        full_url = urljoin(base_url, href)
        file_name = os.path.basename(full_url)

        # # Download the file and save it in the current working directory
        res = requests.get(full_url)
        res.raise_for_status()
        with open(file_name, 'wb') as f:
            f.write(res.content)
        print(f'Downloaded {file_name}')
