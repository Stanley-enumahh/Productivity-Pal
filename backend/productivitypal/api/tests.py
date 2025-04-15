from django.test import TestCase
import requests

# Create your tests here.


url =  'http://127.0.0.1:8000/api/todos/'

data = {
    'title': 'first todo',
    "todoitems": [{"title": 'first todo'}, {'title': 'second todo'}],
    'due_date': "2025-04-15T13:45:30.000Z"
}




refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MjQ4NjQxMywiaWF0IjoxNzQyNDAwMDEzLCJqdGkiOiIzZmJlNzkzYjAzYTk0YjZiOGNjYzE1ZWFjYmZlMjFiOSIsInVzZXJfaWQiOjF9.PkOydeo6H0rP7S6__V6ktcQygXPV3ugWYr0JVhLlyoc'
access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NzI0MTY5LCJpYXQiOjE3NDQ3MTY5NjksImp0aSI6IjE1NWQyYzRkZmMzMTRkYjdhYmE4MGNmYjhiYWY4NDNkIiwidXNlcl9pZCI6MX0._BNcK5yjdrmuZiybYvfmWQw-dOoeYTbYYYMKKyDTb7g'

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
