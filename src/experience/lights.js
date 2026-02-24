import * as THREE from 'three'

export function initLights(scene) {

  // 🔥 Spotlight principal fuerte
  const spotlight = new THREE.SpotLight(0xffffff, 0)
  spotlight.position.set(2, 5, 5)
  spotlight.angle = 0.4
  spotlight.penumbra = 1
  spotlight.decay = 2
  spotlight.distance = 30

  scene.add(spotlight)
  scene.add(spotlight.target)

  // 🔥 Luz de relleno suave
  const fillLight = new THREE.DirectionalLight(0xffffff, 0)
  fillLight.position.set(-3, 2, 4)
  scene.add(fillLight)

  // 🔥 Ambient suave
  const ambient = new THREE.AmbientLight(0xffffff, 0)
  scene.add(ambient)

  return { spotlight, fillLight, ambient }
}