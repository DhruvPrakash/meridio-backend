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
