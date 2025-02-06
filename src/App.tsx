import React from 'react'
import { TestFetch } from './TestFetch'
import { PokemonModel, PokemonModelWithSuspense } from './PokemonModel'

function App() {
  return (
    <div className="App">
      <h1>hello world!</h1>
      <TestFetch />
      <PokemonModelWithSuspense modelUrl="/models/pikachu.glb" />
    </div>
  )
}

export default App
