import fitz
import os
import glob
import os
import openai
import ujson
import re

# load openai api key from env
openai.api_key = os.environ.get("OPENAI_API_KEY")
prompt = """I have text extracted from a pdf about a partner university for an exchange programme. It was originally in table format. 

I want you to extract key insights from the PDF and structure it as JSON.

Firstly, using only information in the PDFs, populate the JSON with these keys:
- university_name
- university_website (an array of websites if provided)
- university_country
- sem1_months (this information should be in a section called "Academic Calendar", and should be an array of the months which semester 1 covers)
- sem2_months (same as above, but for semester 2)
- faculties_accepted (list of departments where NUS students can or are recommended to go on exchange)
- module_restrictions (any restrictions on modules for exchange students)
- visa_info
- accommodations_info (housing info, especially if there are suggested on-campus and off-campus housing options)
- cost_of_living (cost of living, including possible breakdowns and final total cost)

Secondly, using any information you have from the internet or prior knowledge (no longer restricted to the text I gave you), populate the JSON with these keys:
- university_description (text describing the university)
- university_address
- location_cost_of_living (text on cost of living in the city the university is in)
- location_weather (text describing the weather of the city)
- location_description (text describing the city)
- location_crime (crime rate/situation of the city)
- location_transportation (transportation options in the city)
- location_halal (availability of halal food options in city)
- location_vegetarian (same as above, but for vegetarian food options)

"""

    


directory = '.'
file_extension = '*.pdf'
search_pattern = os.path.join(directory, file_extension)

ctr = 50
s = set()
for filepath in glob.glob(search_pattern):
    if filepath[:-4]+'.txt' in  glob.glob("./*.txt") or "zurich" in filepath:
        continue
    with fitz.open(filepath) as doc:  # open document
        text = chr(12).join([page.get_text() for page in doc])
        text = re.sub(r'\n+', '\n', text)
    
    print(filepath)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role":"user", "content": prompt+text}
        ]
    )
    print(response)
    res = response.choices[0].message.content
    print(res)
    # save res to a text file
    with open(filepath[:-4]+'.txt', 'w') as f:
        f.write(res)
    s.add(filepath)

print(s)