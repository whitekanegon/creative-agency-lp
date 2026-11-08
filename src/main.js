import './scss/main.scss'

const header = document.querySelector('.header')
const menuToggle = document.querySelector('.header__menu-toggle')
const menuLabel = document.querySelector('.header__menu-toggle-label')

function setMenuOpen(isOpen) {
  if (!header || !menuToggle || !menuLabel) return

  header.classList.toggle('header--menu-open', isOpen)
  menuToggle.setAttribute('aria-expanded', String(isOpen))
  menuLabel.textContent = isOpen ? 'Close menu' : 'Open menu'
  document.body.style.overflow = isOpen ? 'hidden' : ''
}

function closeMenu() {
  if (!header?.classList.contains('header--menu-open')) return
  setMenuOpen(false)
}

if (header && menuToggle && menuLabel) {
  menuToggle.addEventListener('click', () => {
    setMenuOpen(!header.classList.contains('header--menu-open'))
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu()
    }
  })
}

const servicesAccordion = document.querySelector('.services__accordion')

function setServicesItemOpen(item, isOpen) {
  if (!item) return

  const trigger = item.querySelector('.services__trigger')
  const panel = item.querySelector('.services__panel')

  if (!trigger || !panel) return

  item.classList.toggle('services__item--open', isOpen)
  trigger.setAttribute('aria-expanded', String(isOpen))
  panel.toggleAttribute('hidden', !isOpen)
}

function closeAllServicesItems() {
  if (!servicesAccordion) return

  servicesAccordion.querySelectorAll('.services__item').forEach((item) => {
    setServicesItemOpen(item, false)
  })
}

if (servicesAccordion) {
  const triggers = servicesAccordion.querySelectorAll('.services__trigger')

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.services__item')
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true'

      closeAllServicesItems()

      if (!isExpanded) {
        setServicesItemOpen(item, true)
      }
    })
  })

  servicesAccordion.querySelectorAll('.services__item').forEach((item) => {
    const trigger = item.querySelector('.services__trigger')
    const isOpen = trigger?.getAttribute('aria-expanded') === 'true'
    setServicesItemOpen(item, isOpen)
  })
}
