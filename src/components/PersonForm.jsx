import React, { useState } from 'react'
import { CREATE_PERSON, ALL_PERSONS } from '../queries';
import { useMutation } from '@apollo/client';
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
export default PersonForm