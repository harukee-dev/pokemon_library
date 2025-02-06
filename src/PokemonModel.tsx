import { useLoader, Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from '@react-three/drei'

interface PokemonModelProps {
  modelUrl: string
}

export const PokemonModel = ({ modelUrl }: PokemonModelProps) => {
  // @ts-ignore
  const gltf = useLoader<GLTF, string>(GLTFLoader, modelUrl)

  return (
    <Canvas style={{ height: '800px', width: '800px' }}>
      {/* @ts-ignore */}
      <ambientLight intensity={0.5} />
      {/* @ts-ignore */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* @ts-ignore */}
      <directionalLight position={[-5, -5, -5]} intensity={1} />
      {/* @ts-ignore */}
      <directionalLight position={[5, -5, -5]} intensity={1} />
      {/* @ts-ignore */}
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      {/* @ts-ignore */}
      <primitive object={gltf.scene} scale={0.25} />
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}

export const PokemonModelWithSuspense = ({ modelUrl }: PokemonModelProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <PokemonModel modelUrl={modelUrl} />
  </Suspense>
)
