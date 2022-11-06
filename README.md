# Authenticate

**URL** : `/authenticate`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "name": "valid name ",
    "email": "valid email"
}
```

**Data example**

```json
{
    "name": "augusto",
    "email": "augusto@mail.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlOGZkMTU5Yi01NgM0LTRkMzYtOWJkNy1hNTljYTEzMDU3YmIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njc3NTg3OTF9.1S1ftTRab7AWQJqF9g4KUsgrhogGS-LVxtQXO5sxW7w"
}
```

## Error Response

**Condition** : If 'name' and 'email' combination not exist in data base.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Email or Name is incorrect"
}
```

# Get client by client id


**URL** : `/clients/clientId/:clientId`

**URL Parameters** : `clientId=[string] where clientId is the id`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID a0ece5db-cd14-4f21-812f-966633e7be86 on the local database.

```json
  {  
    "id":"a0ete7db-cd14-ef21-812f-930633e7de86",
    "name":"Britney",
    "email":"britney@mail.com",
    "role":"admin"
  },
```


# Get client by client name


**URL** : `/clients/clientName/:name`

**URL Parameters** : `name=[string] where name is the name`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with name Britney on the local database.

```json
  {  
    "id":"a0ete7db-cd14-ef21-812f-930633e7de86",
    "name":"Britney",
    "email":"britney@mail.com",
    "role":"admin"
  },
```

# Get policies associated to a client by client name


**URL** : `/policies/:clientName`

**URL Parameters** : `clientName=[string] where clientName is the name`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with name Britney on the local database.

```json
[
  {
    "id": "baa66e18-5358-4054-a4fh-51532f220b6e",
    "amountInsured": 2684.33,
    "email": "britney@mail.com",
    "inceptionDate": "2012-03-23T07:12:51Z",
    "installmentPayment": true,
    "clientId": "a0ede5db-cd1g-4fv1-812f-9b6633e7be86"
  },
  {
    "id": "baa66f18-h358-4054-asfh-5153gf2h0b6e",
    "amountInsured": 3687.33,
    "email": "britney@mail.com",
    "inceptionDate": "2018-09-13T09:02:11Z",
    "installmentPayment": true,
    "clientId": "a0ede5db-cd1g-4fv1-812f-9b6633e7be86"
  },
]
```

# Get policies associated to a client by client name


**URL** : `/policies/client/:policyNumber`

**URL Parameters** : `policyNumber=[string] where policyNumber is the id of policy`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a policy with id 92d15f67-h71b-44fd-95s1-eb1gfg19dsfce on the local database.

```json
[
  {  
    "id":"a0ete7db-cd14-ef21-812f-930633e7de86",
    "name":"Britney",
    "email":"britney@mail.com",
    "role":"admin"
  },
]
```
