export function initScroll(model, camera) {

  let maxScroll = 1

  function calculateMaxScroll() {
    maxScroll = document.documentElement.scrollHeight - window.innerHeight
  }

  window.addEventListener('load', calculateMaxScroll)
  window.addEventListener('resize', calculateMaxScroll)

  window.addEventListener('scroll', () => {

    const scrollY = window.scrollY
    const progress = scrollY / maxScroll

    // 🔥 Sin offset extraño
    const baseZ = 5   // EXACTAMENTE el valor donde termina la intro
    const scrollRange = 3

    camera.position.z = baseZ - progress * scrollRange
  })
}