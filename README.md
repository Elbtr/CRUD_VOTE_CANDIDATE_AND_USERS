# Create a Candidate Selection API using TypeScript, TypeORM, and Express.js

## Steps to run this project:

1. install my project with the command :

- `npm install ` for npm
- `yarn install` for yarn
- `pnpm install` for pnpm

2. Run `nodemon` command

## A brief explanation of why I use the `nodemon` command:

1. I use the `nodemon` command because there is an error in my `npm run dev` command that I can't resolve.
2. I obtain the `nodemon` command from `nodemon.json` and the nodemon package that I have downloaded.
3. When I use the `nodemon` command directly in my terminal, it works fine.

## Documentation of what's in my API:

### A. USERS

#### REGISTER

```http
  POST localhost:8000/api/register
```

`Send Request` :

```json
{
  "user_name": "bella ss",
  "email": "bella@status.net",
  "password": "bella123"
}
```

`Result` :

```json
{
  "status": 200,
  "message": "success",
  "data": {
    "createData": {
      "user_name": "bella ss",
      "email": "bella@status.net",
      "password": "$2a$10$EffV.6QiG/VCjlMKkMBOSOxlu2oWHuOG8aIsW4oZo/v8AsnZnftKG",
      "id": 3,
      "createdAt": "2023-10-09T07:25:37.465Z",
      "updatedAt": "2023-10-09T07:25:37.465Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJiZWxsYSBzcyIsImlhdCI6MTY5NjgzNjMzNywiZXhwIjoxNjk2ODQzNTM3fQ.z3-RJvKk-HPMmhy0n1oxly-u2diCWTIKf8KLK6HnSjc"
  }
}
```

#### LOGIN

```http
POST localhost:8000/api/v1/login
```

`Send Request` :

```json
{
  "email": "bella@status.net",
  "password": "bella123"
}
```

`Result` :

```json
{
  "status": 200,
  "message": "success to login",
  "user": {
    "email": "bella@status.net",
    "user_name": "bella ss"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJiZWxsYSBzcyIsImlhdCI6MTY5NjgzODk5NCwiZXhwIjoxNjk2ODQ2MTk0fQ.L7ZXszllgTZrRbrNDwGMMRtUABVP6m2WyplhnkDibZA"
}
```

#### LOGOUT

```http
POST localhost:8000/api/v1/logout
```

`Send Request` :

`~ in "endpoint" logout does not send request body.`

`Result` :

```json
{
  "status": 200,
  "message": "succes log out"
}
```

`NOTE` : `If the user has not logged in you will not be able to access the voting, candidate pair and parties api`

### B. VOTE

#### GET ALL VOTE

```http
GET localhost:8000/api/votes
```

`Send Request` :

`~ for the GET "endpoint" no data needs to be sent to the body.`

`Result` :

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "allVote": [
            {
                "id": 2,
                "user_name": "hasael",
                "createdAt": "2023-10-06T07:35:38.217Z",
                "updatedAt": "2023-10-06T07:35:38.217Z",
                "selected": {
                    "id": 1,
                    "name": "HASAEL UPDATE NAME UNTUK ID 3",
                    "visi": "selagi masih ada aset jangan takut miskin",
                    "image": "https://res.cloudinary.com/djqewrri3/image/upload/v1696577716/file-upload/l0vehsazyz5ytb6zpuft.jpg",
                    "createdAt": "2023-10-06T07:35:17.290Z",
                    "updatedAt": "2023-10-06T07:35:17.290Z"
                }
            },
            {
                "id": 3,
                "user_name": "bob marley",
                "createdAt": "2023-10-06T07:36:37.017Z",
                "updatedAt": "2023-10-06T07:36:37.017Z",
                "selected": {
                    "id": 2,
                    "name": "HASAEL BUTAR BUTAR",
                    "visi": "selagi masih ada aset jangan takut miskin",
                    "image": "https://res.cloudinary.com/djqewrri3/image/upload/v1696577733/file-upload/d1wgsfnpzs59brmurjr2.jpg",
                    "createdAt": "2023-10-06T07:35:33.755Z",
                    "updatedAt": "2023-10-06T07:35:33.755Z"
                }
            },

            .............
            ..............
        ]
    }
}
```

`NOTE` : `see with this endpoint you can retrieve all voice data.`

#### POST VOTE

`NOTE` : `with this "POST" vote, users can choose which candidate they want to vote for.`

```http
POST localhost/8000/api/v1/vote
```

`Send Request` :

```json
{
  "paslonId": 2
}
```

`NOTE` : `"paslonId" is obtained from the ID of the candidate pair who is running as a candidate, so if we want to choose a candidate we just enter that ID where req.body receives "paslonId"`,

### C. PASLONS

#### GET ALL PASLON

```http
GET localhost:8000/api/votes
```

`Send Request` :

`~ for the GET "endpoint" no data needs to be sent to the body.`

`Result` :

```json
{
  "allData": [
    {
      "id": 1,
      "name": "HASAEL UPDATE NAME UNTUK ID 3",
      "visi": "selagi masih ada aset jangan takut miskin",
      "image": "https://res.cloudinary.com/djqewrri3/image/upload/v1696577716/file-upload/l0vehsazyz5ytb6zpuft.jpg",
      "createdAt": "2023-10-06T07:35:17.290Z",
      "updatedAt": "2023-10-06T07:35:17.290Z",
      "vote": [
        {
          "id": 4,
          "user_name": "BOB BOR",
          "createdAt": "2023-10-06T07:42:13.948Z",
          "updatedAt": "2023-10-06T07:42:13.948Z"
        },
        {
          "id": 2,
          "user_name": "hasael",
          "createdAt": "2023-10-06T07:35:38.217Z",
          "updatedAt": "2023-10-06T07:35:38.217Z"
        }
      ],
      "party": [
        {
          "id": 1,
          "party_name": "partai nasional negara",
          "createdAt": "2023-10-06T07:35:45.582Z",
          "updatedAt": "2023-10-06T07:35:45.582Z"
        },
        {
          "id": 2,
          "party_name": "BANGSAWAN MEGAH",
          "createdAt": "2023-10-06T07:44:10.509Z",
          "updatedAt": "2023-10-06T07:44:10.509Z"
        }
      ]
    },
    {
      "id": 2,
      "name": "HASAEL BUTAR BUTAR",
      "visi": "selagi masih ada aset jangan takut miskin",
      "image": "https://res.cloudinary.com/djqewrri3/image/upload/v1696577733/file-upload/d1wgsfnpzs59brmurjr2.jpg",
      "createdAt": "2023-10-06T07:35:33.755Z",
      "updatedAt": "2023-10-06T07:35:33.755Z",
      "vote": [
        {
          "id": 6,
          "user_name": "KAMSUDIN",
          "createdAt": "2023-10-09T05:37:25.821Z",
          "updatedAt": "2023-10-09T05:37:25.821Z"
        },
        {
          "id": 5,
          "user_name": "BELLA SS",
          "createdAt": "2023-10-09T05:36:55.934Z",
          "updatedAt": "2023-10-09T05:36:55.934Z"
        },
        {
          "id": 3,
          "user_name": "bob marley",
          "createdAt": "2023-10-06T07:36:37.017Z",
          "updatedAt": "2023-10-06T07:36:37.017Z"
        }
      ],
      "party": []
    }
  ]
}
```

`NOTE` :`Now you can see that if the user votes, the vote data will be automatically sent to the "paslon" table.`

#### CREATE NEW PASLON

```http
POST localhost:8000/api/v1/paslon
```

`Send Request` :

```json
{
  "name": "Hasael butar butar",
  "visi": "menjadi yang terbaik dari yang terbaik",
  "image": "http:image/url/buffer231image/image.jpg"
}
```

`NOTE` : `send new candidate pairs "FORM"`

`Result` :

```json
{
  "data": {
    "name": "Hasael butar butar",
    "visi": "selagi masih ada aset jangan takut miskin",
    "image": "https://res.cloudinary.com/djqewrri3/image/upload/v1696841731/file-upload/qfqorxcwurrna1uqqpyo.jpg",
    "id": 3,
    "createdAt": "2023-10-09T08:55:31.914Z",
    "updatedAt": "2023-10-09T08:55:31.914Z"
  }
}
```

#### UPDATE PASLON

`NOTE` : `For candidate pairs, we can only update vision and name data, for pictures I will develop it again`

```http
PATCH localhost:8000/api/v1/paslon/:id
```

`Send Request`

```json
{
  "name": "user update name for id 3"
}
```

`Result` :

```json
{
  "data": {
    "id": 1,
    "name": "HASAEL UPDATE NAME UNTUK ID 3",
    "image": "https://res.cloudinary.com/djqewrri3/image/upload/v1696577716/file-upload/l0vehsazyz5ytb6zpuft.jpg",
    "createdAt": "2023-10-06T07:35:17.290Z",
    "updatedAt": "2023-10-06T07:35:17.290Z"
  }
}
```

#### DELETE PASLON

```http
DELETE localhost:8000/api/v1/paslon/:id
```

`Send Request` :

`~ for the DELETE "endpoint" no data needs to be sent to the body.`

`Result` :

```json
{
  "message": "success to delete data"
}
```

### PARTIES

#### GET ALL PARTIES

```http
GET  localhost:8000/api/v1/parties
```

`Send Request` :

`~ for the GET "endpoint" no data needs to be sent to the body.`

`Result` :

```json
{
  "status": 200,
  "message": "success",
  "data": {
    "data": [
      {
        "id": 3,
        "party_name": "BANGSAWAN MEGAH",
        "createdAt": "2023-10-09T09:08:07.534Z",
        "updatedAt": "2023-10-09T09:08:07.534Z",
        "paslon": {
          "id": 2,
          "name": "HASAEL BUTAR BUTAR",
          "visi": "selagi masih ada aset jangan takut miskin",
          "image": "https://res.cloudinary.com/djqewrri3/image/upload/v1696577733/file-upload/d1wgsfnpzs59brmurjr2.jpg",
          "createdAt": "2023-10-06T07:35:33.755Z",
          "updatedAt": "2023-10-06T07:35:33.755Z"
        }
      }
    ]
  }
}
```

#### D. CREATE A PARTY TO SUPPORT THE CANDIDATE

```http
POST localhost:8000/api/v1/party
```

`Send Request` :

```json
{
  "party_name": "bangsawan megah",
  "paslon": 2
}
```

`Result` :

```json
{
  "status": 200,
  "message": "success",
  "data": {
    "newData": {
      "party_name": "BANGSAWAN MEGAH",
      "paslon": 2,
      "id": 3,
      "createdAt": "2023-10-09T09:08:07.534Z",
      "updatedAt": "2023-10-09T09:08:07.534Z"
    }
  }
}
```

`NOTE` : `"endpoint parties" only records parties that support candidate pairs.`

`NOTE` : `If you are confused, look at how to create party data, in the "create" and "post method" endpoints there we will see that the client only sends the party name and candidate ID.`

## In my API there are still many shortcomings, on users and other data.However, I will improve it so that this API is suitable for use.

## THANK YOU
