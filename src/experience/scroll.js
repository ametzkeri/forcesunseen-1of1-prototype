export function initScroll(model, camera, initialZ) {

  let maxScroll = 1

  function calculateMaxScroll() {
    maxScroll = document.documentElement.scrollHeight - window.innerHeight
  }

  window.addEventListener('load', calculateMaxScroll)
  window.addEventListener('resize', calculateMaxScroll)

  window.addEventListener('scroll', () => {

    const scrollY = window.scrollY
    const progress = scrollY / maxScroll

    // 🔥 SIN easing acumulativo
    camera.position.z = 5 - progress * 3

  })
}