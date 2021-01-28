## Graphql API 


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


