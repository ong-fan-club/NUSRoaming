import fitz
import os
import glob

directory = '.'
file_extension = '*.pdf'
search_pattern = os.path.join(directory, file_extension)

for filepath in glob.glob(search_pattern):
    with fitz.open(filepath) as doc:  # open document
        text = chr(12).join([page.get_text() for page in doc])

# I was originally gonna do my own parsing stuff but 
# hell nah, we're usin LLM for this

# Look at this bruh: https://chat.openai.com/share/bfc62b22-cba1-4e82-8ff6-79be5c901b46