import requests

# url = 'http://127.0.0.1:8000/api/password-reset/'

# data = {
#     'email': 'questcoding2001@gmail.com'
# }

url = "http://127.0.0.1:8000/api/confirm-password-reset/MQ/cmjubk-03f3049bcb47d8c79a515041d36a39b5/"
data = {
    "new_password": "newone321",
    "confirm_password": "newone321"
}


request = requests.post(url=url, json=data)

if request.status_code == 200:
    print(request.json())
else:
    print(request.text)