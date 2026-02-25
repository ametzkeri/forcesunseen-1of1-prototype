import * as THREE from 'three'

export function initRenderer(canvas, camera) {

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  })

  function setSize() {
    const width = window.innerWidth
    const height = window.innerHeight

    renderer.setSize(width, height)

    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  setSize()

  window.addEventListener('resize', setSize)

  renderer.physicallyCorrectLights = true
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  )

  return renderer
}