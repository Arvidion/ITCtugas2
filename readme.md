## Setup Project

1. **Clone** repository ini 
2. Buka **xampp** kemudian jalankan **mysql** dan **apache**
3. Pastikan terdapat database dengan nama **data_itc** yang memiliki dua tabel yaitu **users** dan   **divisions**
4. Pada database **divisions** pastikan terdapat data divisi'' itc yaitu WEB DEV, MOBILE DEV, PM, INKADIV, dan UI/UX
5. Install dependency dengan cara mengetik `npm i` di terminal atau cmd, tunggu sampai selesai.
6. Jalankan service dengan cara mengetik `npx nodemon app`

## Dokumentasi

POST `/users`

Request Body :

```
{
    "fullName": "Dimas Pramantya",
    "nim": "123210069",
    "angkatan": 21,
    "email": "dimas@gmail.com",
    "password": "12345678",
    "division": "WEB DEV"
}
```

Response:

```
{
    "status": "success",
    "message": "Successfuly create User",
    "user": {
        "fullName": "Dimas Pramantya",
        "division": "WEB DEV"
    }
}
```

---

## Tugas

Lengkapi handler pada controller di user.js untuk menghandle dua endpoint dibawah

1. GET `/users`

Deskripsi: Endpoint ini untuk mengambil semua data user di database. 

Response:
```
{
  "status": "Success",
  "message": "Succesfully fetch all user data",
  "users": [
      {
          "id": 0,
          "fullName": "Dimas Pramantya",
          "angkatan": 2021,
          "divisionId": 1
      },
      {
          "id": 1,
          "fullName": "Yuda Saputra",
          "angkatan": 2021,
          "divisionId": 2
      },
      {
          "id": 2,
          "fullName": "Haikal Mumtaz",
          "angkatan": 2021,
          "divisionId": 1
      }
  ]
}
```

---

2. GET `/users/:userId`

Deskripsi: 
Endpoint ini untuk mengambil semua data user di database berdasarkan req.params yaitu userId

Response:
```
{
  "status": "Success",
  "message": "Succesfully fetch user data",
  "user": {
      "id": 0,
      "fullName": "Dimas Pramantya",
      "angkatan": 2021,
      "divisionId": 1
  }
}
```