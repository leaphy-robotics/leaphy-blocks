# automatically translate msg/messages.js to english and dutch so output files
# msg/js/en.js and msg/js/nl.js are created
# Usage: python translate.py

import os
import json
import googletrans
from googletrans import Translator

# get the current working directory
cwd = os.getcwd()

# open the file msg/messages.js
with open(cwd + '/msg/messages.json', 'r') as file:
    data = file.read()

# parse the file as json
data = json.loads(data)

# create a translator object
translator = Translator()

base = """
const Blockly = Blockly || { Msg: Object.create(null) };
"""

end = """
export default Blockly.Msg;
"""
# the raw data is in english, so we can use it as the base for the translation
# translate the messages to english
en = base
for key in data:
    en += f'Blockly.Msg["{key}"] = `{data[key]}`;\n'

# translate the messages to dutch
nl = base
for key in data:
    if data[key] == "":
        continue
    trans = translator.translate(data[key], src='en', dest='nl').text
    nl += f'Blockly.Msg["{key}"] = `{trans}`;\n'

# write the translated messages to msg/js/en.js
with open(cwd + '/msg/js/en.js', 'w') as file:
    file.write(en + end)

# write the translated messages to msg/js/nl.js
with open(cwd + '/msg/js/nl.js', 'w') as file:
    file.write(nl + end)
