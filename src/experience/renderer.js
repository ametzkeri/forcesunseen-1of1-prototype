import * as THREE from 'three'

export function initRenderer(canvas) {

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  })

  // 🔥 Guardamos altura inicial real
  const initialWidth = window.innerWidth
  const initialHeight = window.innerHeight

  renderer.setSize(initialWidth, initialHeight)

  const isMobile = window.innerWidth < 768

  renderer.physicallyCorrectLights = true
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  renderer.setPixelRatio(
    isMobile
      ? Math.min(window.devicePixelRatio, 1.5)
      : Math.min(window.devicePixelRatio, 2)
  )

  // 🔥 SOLO recalcular si cambia el ancho (rotación real)
  window.addEventListener('resize', () => {

    if (window.innerWidth !== initialWidth) {
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

  })

  return renderer
}