import { useState } from 'react'
import { PokemonModelWithSuspense } from './PokemonModel'
import { TestFetch } from './TestFetch'
import { scales, positions } from './pokemonSettings'
import './Fetch.css';

function App() {
  const [pokename, setPokename] = useState('bulbasaur')
  return (
    <div className="App">
      <TestFetch setPokename={setPokename} />
      <PokemonModelWithSuspense
        modelUrl={`/models/${pokename}.glb`}
        scale={scales[pokename]}
        position={positions[pokename]}
      />
    </div>
  )
}

export default App
