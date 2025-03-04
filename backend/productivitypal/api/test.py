import requests


data = {
    'username': 'EddiePanda',
    'password': 'newone321',
}


# url = "http://127.0.0.1:8000/api/register/"

url = "http://127.0.0.1:8000/api/login/"

login = requests.post(url=url, data=data)
result = login.json()
print(result)