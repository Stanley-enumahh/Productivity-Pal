from django.test import TestCase
import requests

# Create your tests here.


url =  'http://127.0.0.1:8000/api/todoitems/?todo=16'

data = {
    'todo': 16,
    "title": "Buy coconut",
    'completed': False
}




refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MjQ4NjQxMywiaWF0IjoxNzQyNDAwMDEzLCJqdGkiOiIzZmJlNzkzYjAzYTk0YjZiOGNjYzE1ZWFjYmZlMjFiOSIsInVzZXJfaWQiOjF9.PkOydeo6H0rP7S6__V6ktcQygXPV3ugWYr0JVhLlyoc'
access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNDIzMDA5LCJpYXQiOjE3NDI0MTU4MDksImp0aSI6IjJkYTczY2FkZDllYTQyZDI4OThlZTA4MjBiNzI0ZDI2IiwidXNlcl9pZCI6MX0.3-puPPe-AHnXy_thCpJu-Kbsc_V3ixwp438OEHWrRoM'

headers = {
    'Authorization': f"Bearer {access_token}"
}
request = requests.post(url=url, headers=headers, json=data)


# url = 'http://127.0.0.1:8000/api/login/'

# data = {
#     'username': 'Quest',
#     'password': 'newone321'
# }
# request = requests.post(url=url, json=data)



if request.status_code == 200:
    print(request.json())
else:
    print(request.text)
