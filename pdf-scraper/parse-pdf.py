import fitz
import os
import glob
import os
import openai
import ujson
import re

# load openai api key from env
openai.api_key = os.environ.get("OPENAI_API_KEY")
prompt = """I want to curate information about partner universities that are available to National University of Singapore students to go on exchange with.

I want you to produce a combined final JSON file with the key information requested. The JSON must be valid JSON.

I have text extracted from a pdf about a partner university for an exchange programme. It was originally in table format. Using only information in the PDF, populate the JSON with these keys:
- university_name
- university_website (an array of websites if provided)
- university_country
- sem1_months (this information should be in a section called "Academic Calendar", and should be an array of the months which semester 1 covers. Represent the months with 3-character short forms, eg. MAY, JUN, DEC, JAN). If the PDF says that Semester 1 spans from August to mid-December, output [AUG, SEP, OCT, NOV, DEC]
- sem2_months (same as above, but for semester 2)
- faculties_accepted (NUS students from this list of departments would be suitable to go to this university on exchange. This list must be a subset of all possible departments, which are: [College of Humanities and Sciences (CHS), Faculty of Science (FoS), Faculty of Arts and Social Sciences (FASS), NUS Business School (BIZ), School of Computing (SoC), Faculty of Dentistry (DENT), College of Design and Engineering (CDE or FoE),  Yong Loo Lin School of Medicine (YLLSOM), School of Law (LAW), School of Nursing, Yong Siew Toh Conservatory of Music (YSTCM)]. For example, the PDF might say "UT Austin is a comprehensive university which is suitable for FASS, FoS, FoE, SoC and Law (with effect AY2021/22) students.", and you should output the array [FASS, FoS, CDE, SoC, LAW])
- module_restrictions (any restrictions on modules for exchange students)
- visa_info (there should be a section in the PDF for visa info. Just copy that text here.)
- accommodations_info (there should be a section in the PDF with housing info especially if there are suggested on-campus and off-campus housing options. Just copy that text here.)
- cost_of_living (There may be a section in the PDF with a table describing cost of living, including possible breakdowns and final total cost. Re-write it in prose and put it here.)

THE PDF-SCRAPED TEXT STARTS NOW:
"""

"""    
SECOND PART: Using any information you have from the internet or prior knowledge, tell me information about the university that map with these keys:
- gpt_university_description (text describing the university)
- gpt_university_address (the address of the university)
- gpt_university_city (the city and/or state the university is located in)
- gpt_nearest_airport (what is the nearest international airport to the university?)
- gpt_location_cost_of_living (text on cost of living in the city the university is in)
- gpt_location_weather (text describing the weather of the city)
- gpt_location_description (text describing the city in between 50 to 100 words)
- gpt_location_crime (text describing crime rate/situation of the city)
- gpt_location_transportation (text describing public transportation options in the city)
- gpt_location_halal (availability of halal food options in city. Output a score between 1 to 3, where 1 means extremely limited or no vegetarian options, and 3 means an abundance of vegetarian options)
- gpt_location_vegetarian (availability of vegetarian food options in the city. Output a score between 1 to 3, where 1 means extremely limited or no vegetarian options, and 3 means an abundance of vegetarian options)

Remember to ensure that the final JSON output has all the keys in both the FIRST PART and SECOND PART of the task. I want a SINGULAR JSON object with all the keys from both first and second part.
"""


directory = './pdfs'
file_extension = '*.pdf'
search_pattern = os.path.join(directory, file_extension)

ctr = 50
s = set()
for filepath in glob.glob(search_pattern):
    if filepath[:-4]+'_scraped.txt' in  glob.glob("./pdfs/*.txt"):
        continue
    with fitz.open(filepath) as doc:  # open document
        text = chr(12).join([page.get_text() for page in doc])
        text = re.sub(r'\n+', '\n', text)
    
    print(filepath)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role":"user", "content": prompt+text}
        ]
    )
    print(response)
    res = response.choices[0].message.content
    print(res)
    # save res to a text file
    with open(filepath[:-4]+'_scraped.txt', 'w') as f:
        f.write(res)
    s.add(filepath)
    # break
print(s)