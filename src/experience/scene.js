import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export function initScene() {
  const scene = new THREE.Scene()

  // 🔥 Fondo negro limpio
  scene.background = new THREE.Color(0x000000)

  // 🔥 HDRI para reflejos realistas
  const loader = new RGBELoader()

  loader.load('/hdri/studio.hdr', (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = hdrTexture
  })

  return scene
}