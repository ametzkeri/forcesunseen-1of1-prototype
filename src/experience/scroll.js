export function initScroll(model, camera, initialZ) {

  let currentZ = initialZ
  let maxScroll = 1

  function calculateMaxScroll() {
    maxScroll = document.documentElement.scrollHeight - window.innerHeight
  }

  // Calcular al cargar
  window.addEventListener('load', calculateMaxScroll)

  // Recalcular solo si cambia tamaño real
  window.addEventListener('resize', calculateMaxScroll)

  // Scroll estable
  window.addEventListener('scroll', () => {

    const scrollY = window.scrollY
    const progress = scrollY / maxScroll

    const targetZ = 5 - progress * 3

    // Suavizado más fino aún
    currentZ += (targetZ - currentZ) * 0.06
    camera.position.z = currentZ

  })
}