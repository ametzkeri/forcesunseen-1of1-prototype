import * as THREE from 'three'

export function initCamera() {
  const isMobile = window.innerWidth < 768

    const camera = new THREE.PerspectiveCamera(
  isMobile ? 50 : 35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
  

  camera.position.set(0, 0, 5)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  return camera
}