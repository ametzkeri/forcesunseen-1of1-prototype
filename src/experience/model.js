import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export function loadModel(scene) {
  return new Promise((resolve, reject) => {

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      '/models/balaclava.glb',
      (gltf) => {

        const model = gltf.scene

        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        model.position.set(
          -center.x,
          -(box.min.y + size.y / 2),
          -center.z
        )

        model.scale.set(1, 1, 1)

        model.traverse((child) => {
          if (child.isMesh) {
            child.material.metalness = 1
            child.material.roughness = 1
            child.material.envMapIntensity = 0.5
          }
        })

        scene.add(model)
        resolve(model)
      },
      undefined,
      (error) => {
        console.error(error)
        reject(error)
      }
    )
  })
}