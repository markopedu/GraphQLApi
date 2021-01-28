## Graphql API 

- http://localhost:4000/

###  query by room

```query {
  sessions(room: EUROPA) {
    id
    title
    favorite
    room
  }
}```

###  toggle Favorite Session

```mutation {
  toggleFavoriteSession(id:"84473") {
    id
    title
    favorite
  }
}```

###  add New Session

```mutation {
	addNewSession(session: {
    title:"a new title",
    description:"cool description"
  }) {
    id
    title
    description
  }
}```

### Union types 

```query {
 	sessionById(id: "84473") {
    ... on Session {
       id
       title
    }
    ... on Error {
       code 
       message
       token
    }
  }
}```



