# Raw nodejs api
A fully featured nodejs api

## Features:
- dynamic routes
- params option like /:id
- middleware
- validations


## Endpoints

### [GET]
Get all users
- URL: `http://domain.com/users`

### [POST]
create a new user

- URL: `http://domain.com/users`
- Body:

```json
{
  "name": "muhibullah",
  "phone": "0191145204",
  "email": "muhibullah@gmail.com"
}
```

### [PUT]
update user

- URL: `http://domain.com/users/:id`
- params: 
/users/1
- Body:

```json
{
  "name": "muhibullah",
  "phone": "0191145204",
  "email": "muhibullah@gmail.com"
}
```

### [DELETE]
delete user

- URL: `http://domain.com/users/:id`
- params: 
/users/1
