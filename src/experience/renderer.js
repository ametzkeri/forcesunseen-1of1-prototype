import * as THREE from 'three'

export function initRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  const isMobile = window.innerWidth < 768
  renderer.physicallyCorrectLights = true
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1

    renderer.physicallyCorrectLights = true
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.1

renderer.setPixelRatio(
  isMobile
    ? Math.min(window.devicePixelRatio, 1.5)
    : Math.min(window.devicePixelRatio, 2)
)

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  return renderer
}