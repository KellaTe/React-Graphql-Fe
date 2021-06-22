import React from 'react';
import { useQuery, } from '@apollo/client';
import { ALL_PERSONS } from './queries';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';


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