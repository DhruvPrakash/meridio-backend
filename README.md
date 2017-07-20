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

Provide the userId of person this book belongs to (your user id which you got after creating a session), isbn of book, your current latitude and longitude, the url of the book's image, the book's title, its genre and description.

```json
{
    "userId": [Integer],
    "isbn": "[unicode 250 chars max]",
    "lat": "[unicode 64 chars max]",
    "long": "[unicode 64 chars max]",
    "imageUrl": "[unicode 250 chars max]",
    "title": "[unicode 100 chars max]",
    "genre": "[unicode 20 chars max]",
    "desc" : "[unicode 1000 chars max]"
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
# Delete a book

Remove a book from the user's library. You do this if you no longer what to keep a book up for trade.

**URL** : `/deleteBook`

**Method** : `POST`

**Data constraints**

Provide the bookId of the book to be removed. You can get the bookId as part of the body of the getMyBooks service.

```json
{
    "bookId": [Integer]
}
```

**Data example** All fields must be sent.

```json
{
    "bookId": 32
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

# Get my books

Get all the books which belong to me.

**URL** : `/getMyBooks`

**Method** : `POST`

**Data constraints**

Provide the userId of the person who's books are to be fetched.

```json
{
    "userId": [Integer]
}
```

**Data example** All fields must be sent.

```json
{
    "userId": 123
}
```

## Success Response

**Condition** : If everything is OK then success status is returned along with a list of books (array) belonging to the user.

**Content example**

```json
{
    "status": "success",
    "books": [{
        "bookId": 32
        "isbn": "9785845105127", 
        "imageUrl": "https://books.google.com/books?id=ezqe1hh91q4C&pg=PR3&img=1&zoom=5&sig=bBmzIAIiCtMcM7Ii7TUHycqqEWg",             "title": "Freakanomics", 
        "genre": "Economics",
        "description": "What do school teachers and sumo wrestlers have in common?"
    }]
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

# Create a trade request

Request for a book which you would like.

**URL** : `/createTradeRequest`

**Method** : `POST`

**Data constraints**

Provide your userId and the id of the book you want.

```json
{
    "fromUserId": [Integer],
    "requestorWantsBookId": [Integer]
}
```

**Data example** All fields must be sent.

```json
{
    "fromUserId": 123,
    "requestorWantsBookId" : 32
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


# Get trade requests

Get the trade requests directed to you or directed by you.

**URL** : `/getTradeRequests`

**Method** : `POST`

**Data constraints**

Provide your user ID as a fromUserId *OR* a toUserId. Do not send both. If it is sent as fromUserId then you will get trade requests you have sent out. If it is sent as toUserId then you will get trade requests directed to you.

```json
{
    "fromUserId": [Integer]
}
```
OR
```json
{
    "toUserId": [Integer]
}
```
**Data example** All fields must be sent.

```json
{
    "fromUserId": 123
}
```
OR
```json
{
    "toUserId": 123
}
```
## Success Response

**Condition** : If everything is OK then success status is returned along with the trade requests sent by you or sent to you depending on what parameter was passed in the body of the request.

**Content example**
from me to somebody else
```json
{
    "status": "success",
    "tradeRequests": [{
        "id": 4,
        "fromUserId": 123,
        "toUserId": 321,
        "status" : "approved"
        "bookTradeDetails": {
            "bookTraded": "A clash of crows?",
            "forBook" : "The winds of winter"
        }
    },{
        "id": 5,
        "fromUserId": 123,
        "toUserId": 543,
        "status": "pending"
        "bookTradeDetails": {
            "bookTraded": null,
            "forBook": "Darkness of dragons"
        }
    },{
        "id": 6,
        "fromUserId": 123,
        "toUserId": 326,
        "status": "declined",
        "bookTradeDetails": {
            "bookTraded": null,
            "forBook": "Barney the purple dinosaur: Origin"
        }
    }]
}
```
OR
from somebody else to me
```json
{
    "status": "success",
    "tradeRequests": [{
        "id": 1,
        "fromUserId": 789,
        "toUserId": 123,
        "status": "pending",
        "bookTradeDetails": {
            "bookTraded": null,
            "forBook": "Battlefield of the Mind",
        }
        
    },{
        "id": 2,
        "fromUserId": 432,
        "toUserId": 123,
        "status": "approved",
        "bookTradeDetails": {
            "bookTraded": "Naruto, the backstory"
            "forBook": "The Harbringer"
        }
        
    },{
        "id": 3,
        "fromUserId": 412,
        "toUserId": 123,
        "status": "declined",
        "bookTradeDetails": {
            "bookTraded": null,
            "forBook": "The Hobbit",
        }
    }]
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
