import * as THREE from 'three'
import { initScene } from './experience/scene'
import { initCamera } from './experience/camera'
import { initRenderer } from './experience/renderer'
import { initLights } from './experience/lights'
import { loadModel } from './experience/model'
import { initTextReveal } from './experience/scrollText'

/* -----------------------------
   RESET SCROLL EN REFRESH (móvil fix)
----------------------------- */
// 🔥 Evita que el navegador restaure scroll automáticamente
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0)
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0)

  const sections = document.querySelectorAll('.section')
  sections.forEach(section => {
    section.classList.remove('visible')
  })
})

initTextReveal()



/* -----------------------------
   SCENE SETUP
----------------------------- */

const canvas = document.querySelector('#webgl')

const scene = initScene()
const camera = initCamera()
const renderer = initRenderer(canvas, camera)
const lights = initLights(scene)

let introProgress = 0
let introFinished = false
let model
let scrollProgress = 0
const clock = new THREE.Clock()

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

/* -----------------------------
   LOAD MODEL + SHADER
----------------------------- */

loadModel(scene).then((loadedModel) => {

  model = loadedModel
  camera.position.set(0, 0, 10)

  // 🔥 Fade-in pantalla editorial
  setTimeout(() => {
    const fade = document.getElementById('screenFade')
    if (fade) fade.classList.add('fade-out')
  }, 300)

  // 🔥 Shader táctico discreto
  model.traverse((child) => {

    if (child.isMesh) {

      child.material.onBeforeCompile = (shader) => {

        shader.uniforms.uTime = { value: 0 }
        shader.uniforms.uProgress = { value: 0 }

        shader.fragmentShader =
          `
          uniform float uTime;
          uniform float uProgress;

          float hash(vec2 p){
              return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float noise(vec2 p){
              vec2 i = floor(p);
              vec2 f = fract(p);

              float a = hash(i);
              float b = hash(i + vec2(1.0, 0.0));
              float c = hash(i + vec2(0.0, 1.0));
              float d = hash(i + vec2(1.0, 1.0));

              vec2 u = f * f * (3.0 - 2.0 * f);

              return mix(a, b, u.x) +
                     (c - a) * u.y * (1.0 - u.x) +
                     (d - b) * u.x * u.y;
          }

          ` + shader.fragmentShader

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `
            vec3 tactical = vec3(0.35, 0.85, 0.5);

            float n = noise(vViewPosition.xy * 2.0 + uTime * 0.2);
            float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0,0.0,1.0)), 2.0);

            float gridX = abs(fract(vViewPosition.x * 6.0) - 0.5);
            float gridY = abs(fract(vViewPosition.y * 6.0) - 0.5);

            float gridLine = smoothstep(0.48, 0.5, gridX) +
                             smoothstep(0.48, 0.5, gridY);

            float microLines = smoothstep(0.49, 0.5, abs(fract(vViewPosition.y * 15.0) - 0.5));

            float dynamicLayer =
                n * 0.12 +
                fresnel * 0.10 +
                gridLine * 0.05 +
                microLines * 0.03;

            dynamicLayer *= (1.0 - uProgress);

            gl_FragColor.rgb = mix(gl_FragColor.rgb, tactical, dynamicLayer * 0.5);

            #include <dithering_fragment>
          `
        )

        child.userData.shader = shader
      }
    }
  })
})

/* -----------------------------
   SCROLL CONTROL
----------------------------- */

window.addEventListener('scroll', () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight
  scrollProgress = window.scrollY / maxScroll
})

/* -----------------------------
   ANIMATION LOOP
----------------------------- */

function animate() {
  requestAnimationFrame(animate)

  const elapsed = clock.getElapsedTime()

  if (model && !introFinished) {

    introProgress += 0.01
    const clamped = Math.min(introProgress, 1)
    const eased = easeOutCubic(clamped)

    camera.position.z = 10 - eased * 5

    lights.spotlight.intensity = eased * 6
    lights.fillLight.intensity = eased * 3
    lights.ambient.intensity = eased * 0.8

    model.traverse((child) => {
      if (child.isMesh && child.userData.shader) {
        child.userData.shader.uniforms.uTime.value = elapsed
        child.userData.shader.uniforms.uProgress.value = clamped
      }
    })

    if (clamped >= 1) {
      camera.position.z = 5
      introFinished = true
    }
  }

  if (model && introFinished) {
    const rotationStart = 0.15  // empieza a rotar después del 15% scroll
const rotationRange = 0.7   // rango donde rota

let adjustedProgress = 0

if (scrollProgress > rotationStart) {
  adjustedProgress = (scrollProgress - rotationStart) / rotationRange
  adjustedProgress = Math.min(Math.max(adjustedProgress, 0), 1)
}

const targetRotation = adjustedProgress * Math.PI * 2
model.rotation.y += (targetRotation - model.rotation.y) * 0.08
  }

  renderer.render(scene, camera)
}

animate()