import React, { useState, useEffect } from 'react'

export const TestFetch = () => {
  const [pokemon, setPokemon] = useState(null)
  const [sprite, setSprite] = useState(null)
  const [id, setId] = useState(1)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        const name = data.name
        const sprite = data.sprites.front_default
        setPokemon(() => name)
        setSprite(() => sprite)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [id])

  function handleNext() {
    if (id >= 1025) {
      setId(() => 1)
    } else {
      setId((id: number) => id + 1)
    }
  }

  function handlePrev() {
    if (id <= 1) {
      setId(() => 1025)
    } else {
      setId((id: number) => id - 1)
    }
  }

  return (
    <div>
      <h1>{pokemon}</h1>
      <img src={sprite} alt="pokemon-sprite" />
      <div>
        <button onClick={handlePrev}>previous</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  )
}
