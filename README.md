# BASKETBALL API

## REGISTER
### POST
```
/api/v1/users/register
```
```
{
    "name":"example",
    "email":"example@gmail.com",
    "password":"(password)",
    "passwordConfirm":"(password)"
}
```

## LOGIN
### POST
```
/api/v1/users/login
```
```
{
    "name":"example",
    "email":"example@gmail.com",
    "password":"(password)",
    "passwordConfirm":"(password)"
}
```
## LOGOUT
### GET
```
/api/v1/users/logout
```
```
/api/v1/users/logout
```

## CREATE USER
### POST
```
/api/v1/basketball/participants
```
```
{
    "name":"(example)",
	"surname":"(example)",
	"age":(from 18 to 40),
	"team_name":"(example)",
	"rating":(example)
}
```

## GET PARTICIPANTS BY FIELDS
### GET
```
fields: sort,fields,limit,page
```

## GET BY ID
### GET
```
/api/v1/basketball/participant/{participant_id}/card
```

## PARTICIPANTS BY TEAM
### GET
```
/api/v1/basketball/team/{team_name}/members
```

## GET YOUNGEST
### GET
```
/api/v1/basketball/team/youngest
```

## TOP FROM ALL TEAMS
### GET
```
/api/v1/basketball/top
```

## TOP BY TEAM
### GET
```
/v1/basketball/top/{team_name}
```