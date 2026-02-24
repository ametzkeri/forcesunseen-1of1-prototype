export function initScroll(model, camera, initialZ) {

  let currentZ = initialZ

  window.addEventListener('scroll', () => {

    const scrollY = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const progress = scrollY / maxScroll

    const targetZ = 5 - progress * 3

    // 🔥 Suavizado real (evita bote)
    currentZ += (targetZ - currentZ) * 0.08
    camera.position.z = currentZ

  })
}