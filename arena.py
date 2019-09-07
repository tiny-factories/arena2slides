import requests
from pprint import pprint
import json


# data = requests.get("http://api.are.na/v2/channels?page=2&amp;per=15")

# http://api.are.na/v2/blocks/8693
data = requests.get("http://api.are.na/v2/blocks/8693")



byte_data = data.content

string_data = byte_data.decode("utf-8")

json_data = json.load(string_data)

pprint(json_data)
print(type(json_data))