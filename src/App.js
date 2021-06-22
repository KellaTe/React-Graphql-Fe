import React, { useEffect, useState } from 'react';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`
const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`
const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`
const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)
  const showPerson = (name) => {
    getPerson({
      variables: {
        nameToSearch: name
      }
    })
  }
  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result.data])
  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}
          {person.address.city}
        </div>
        <div>
          {person.phone}
        </div>
        <button onClick={() => setPerson(null)}>
          close
        </button>
      </div>
    )
  }
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>show address</button>
        </div>
      )}
    </div>
  )
}
const PersonForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  // const [createPerson] = useMutation(CREATE_PERSON)
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }]
  })
  const submit = (event) => {
    event.preventDefault()

    createPerson({ variables: { name, phone, street, city } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value)}></input>
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>Add!</button>
      </form>
    </div>
  )
}
const App = () => {
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // })
  const result = useQuery(ALL_PERSONS)
  if (result.loading) {
    return <div>
      loading...
    </div>
  }
  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  )

}
export default App