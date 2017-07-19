# Meridio Backend : API Documentation
# Create User's Session

Updates the user's session with the session token given by facebook. If this is the first time the user is setting a session, then the user's account will be created and the session will be set.

**URL** : `/setUserSession`

**Method** : `POST`

**Data constraints**

Provide name of person, session token given by facebook and emailId of person.

```json
{
    "name": "[unicode 64 chars max]",
    "sessionToken": "[unicode 250 chars max]",
    "emailId": "[unicode 64 chars max]"
}
```

**Data example** All fields must be sent.

```json
{
    "name": "Majin Buu",
    "sessionToken": "z74OipJzJ5DDjjBL5peK8rrhRXTDHKzBe65ayOl6iizdVF4u2G",
    "emailId": "chocolate_beam@gmail.com"
}
```

## Success Response

**Condition** : If everything is OK then the user id of the user will be returned.

**Content example**

```json
{
    "status": "success",
    "userId": 123
}
```

## Error Responses

**Condition** : If something goes wrong internally or if fields are missing

**Content example**

```json
{
    "status": "failure"
}
```
# Post a book

Add a book to the user's library. The added book is now up for trade.

**URL** : `/postBook`

**Method** : `POST`

**Data constraints**
req.userId, req.isbn, req.lat, req.long, req.imageUrl, req.title, req.genre, req.desc
Provide the userId of person this book belongs to (your user id which you got after creating a session), isbn of book, your current latitude and longitude, the url of the book's image, the book's title, its genre and description.

```json
{
    "userId": [An integer],
    "isbn": "[unicode 250 chars max]",
    "lat": "[unicode 64 chars max]",
    "long": "[unicode 64 chars max]",
    "imageUrl": "[unicode 250 chars max]",
    "title": "[unicode 100 chars max]",
    "genre": "[unicode 20 chars max]",
    "desc" : "[unicode 250 chars max]"
}
```

**Data example** All fields must be sent.

```json
{
    "userId": 123,
    "isbn": "9785845105127",
    "lat": "40.689249",
    "long": "-74.044500",
    "imageUrl": "https://books.google.com/books?id=ezqe1hh91q4C&pg=PR3&img=1&zoom=5&sig=bBmzIAIiCtMcM7Ii7TUHycqqEWg",
    "title": "Freakanomics",
    "genre": "Economics",
    "desc" : "What do schoolteachers and sumo wrestlers have in common?"
}
```

## Success Response

**Condition** : If everything is OK then success status is returned.

**Content example**

```json
{
    "status": "success"
}
```

## Error Responses

**Condition** : If something goes wrong internally or if fields are missing

**Content example**

```json
{
    "status": "failure"
}
```
