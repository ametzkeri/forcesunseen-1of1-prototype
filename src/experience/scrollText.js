export function initTextReveal() {

  const sections = document.querySelectorAll('.section')

  function reveal() {
    const triggerBottom = window.innerHeight * 0.85

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top

      if (top < triggerBottom) {
        section.classList.add('visible')
      } else {
        section.classList.remove('visible')
      }
    })
  }

  window.addEventListener('scroll', reveal)
  reveal()
}