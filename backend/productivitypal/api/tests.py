from django.test import TestCase
import requests

# Create your tests here.


url = 'http://127.0.0.1:8000/api/get-profile-info/'

data ={'username': 'Quest'}

refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MjI5MjI5MSwiaWF0IjoxNzQyMjA1ODkxLCJqdGkiOiJlMDYzYjhiMmVhZTU0YzdmYjU0MzQ0Yzc5YWU5NzRkZiIsInVzZXJfaWQiOjF9.eRDUcw4pzQPdIO_Si4UVYlSWYwdY1763GKfLQkcAtHM', 
access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyMjEzMDkxLCJpYXQiOjE3NDIyMDU4OTEsImp0aSI6IjkwMjAyNWE2MDAxNDRhMzU4ZDIwNTVmMzc2NmFkOGU0IiwidXNlcl9pZCI6MX0.wMISwCsS97-xEE0fQ8gkDLYVkrqV0tfveXpOAxvla5k'

headers = {
    'Authorization': f"Bearer {access_token}"
}
request = requests.get(url=url, headers=headers, json=data)


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
