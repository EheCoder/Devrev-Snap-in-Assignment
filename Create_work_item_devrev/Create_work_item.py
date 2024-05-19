import requests
import json
import os
import toml

# Access the variables
config = toml.load('secret.toml')
PAT = config['PAT']

#Api end point for creating work
url = 'https://api.devrev.ai/works.create'

headers = {
    "Authorization": PAT,
    "Content-Type": "application/json"
}

data = {
    "type": "issue",
    "applies_to_part": "PROD-1",
    "owned_by":["don:identity:dvrv-in-1:devo/2hN3Bj3CHH:devu/1"],
    "title": "Work Item Cretion 1"}

# Make the POST request to create a new work item
response = requests.post(url, headers=headers, json=data)

if response.status_code == 201:
  response_content = response.content.decode('utf-8')
  response_json = json.loads(response_content)
  print("\nWork item created successfully:", json.dumps(response_json, indent=4))