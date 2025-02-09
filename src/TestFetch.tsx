import React, { useState, useEffect, useRef } from 'react'
import './Fetch.css';

export const TestFetch = ({ setPokename }) => {
  const [pokemon, setPokemon] = useState<string | null>(null)
  const [sprite, setSprite] = useState<string | null>(null)
  const [id, setId] = useState<number>(1)
  const [query, setQuery] = useState<string>('')
  const [height, setHeight] = useState<number>(1)
  const [weight, setWeight] = useState<number>(1)
  const [hp, setHp] = useState<number>(1)
  const [attack, setAttack] = useState<number>(1)
  const [defense, setDefense] = useState<number>(1)
  const [speed, setSpeed] = useState<number>(1)
  const [sound, setSound] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()

        setPokemon(data.name)
        setPokename(data.name)
        setSprite(data.sprites.front_default)
        setHeight(data.height)
        setWeight(data.weight)
        setHp(data.stats[0].base_stat)
        setAttack(data.stats[1].base_stat)
        setDefense(data.stats[2].base_stat)
        setSpeed(data.stats[5].base_stat)
        setSound(data.cries?.latest || null)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [id])

  function handleNext() {
    setId(id >= 26 ? 1 : id + 1)
  }

  function handlePrev() {
    setId(id <= 1 ? 26 : id - 1)
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value.toLowerCase())
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && query.trim()) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then((response) => response.json())
        .then((data) => {
          setId(data.id)
          setQuery('')
        })
        .catch((error) => console.log('error'))

      setQuery('')
    }
  }

  function playSound() {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error('Playback failed', err))
    }
  }


  return (
    <div>
      <div className='card' id='card'>
        <h1 className='pokemon-title'>{pokemon}</h1>
        <img className='preview' src={sprite || ''} alt="pokemon-sprite" />
        <h2>Hp: {hp}</h2>
        <h2>Attack: {attack}</h2>
        <h2>Defense: {defense}</h2>
        <h2>Speed: {speed}</h2>
        <h2>Weight: {weight} Height: {height}</h2>
      </div>
      <audio ref={audioRef} src={sound || ''}></audio>
      <button onClick={playSound}>Sound of death</button>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Enter the Pokémon name"
        />
      </div>
    </div>
  )
}
