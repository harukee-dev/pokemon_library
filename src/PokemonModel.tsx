import { useLoader, Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from '@react-three/drei'

import './PokemonModel.css'

const Load = `${process.env.PUBLIC_URL}/picture/png.png`

interface PokemonModelProps {
  modelUrl: string
  scale: number
  position: number[]
}

export const PokemonModel = ({
  modelUrl,
  scale,
  position,
}: PokemonModelProps) => {
  // @ts-ignore
  const gltf = useLoader<GLTF, string>(GLTFLoader, modelUrl)
  
  return (
    <div className='pokemon-container'>
    <Canvas className='pokemon-canvas'>
      
      {/* @ts-ignore */}
      <ambientLight intensity={0.5} />
      {/* @ts-ignore */}
      <directionalLight position={[5, 5, 5]} intensty={1} />
      {/* @ts-ignore */}
      <directionalLight position={[-5, -5, -5]} intensity={1} />
      {/* @ts-ignore */}
      <directionalLight position={[5, -5, -5]} intensity={1} />
      {/* @ts-ignore */}
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      {/* @ts-ignore */}
      <primitive object={gltf.scene} scale={scale} position={position} />
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        target={[0, 0, -1]}
      />
    </Canvas>
    </div>
  )
}

export const PokemonModelWithSuspense = ({
  modelUrl,
  scale,
  position,
}: PokemonModelProps) => (
  <Suspense fallback={<div className='loading'><img className='LoadPicture' src={Load} alt="load" /></div>}>
    <PokemonModel modelUrl={modelUrl} scale={scale} position={position} />
  </Suspense>
)
