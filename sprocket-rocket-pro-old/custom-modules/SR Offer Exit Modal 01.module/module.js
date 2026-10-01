
const exit = document.querySelector('#exit-popup')
if (exit && !exit.hasAttribute('data-preview')) {
  const once = exit.dataset.once == 'true'
  const timer = exit.dataset.timer
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // Adding 60 minutes to current time
  let shown = false

  document.addEventListener('mousemove', function (e) {
    const mousePos = e.pageY - window.pageYOffset
    if (mousePos <= 7) {
      if ((!once || !Cookie.get('exitIntentShown')) && !shown) {
        showModal(exit.id)
        shown = true
        if (once) Cookie.set('exitIntentShown', true, expirationDate)
      }
    }
  })

  if (timer) {
    setTimeout(function () {
      if ((!once || !Cookie.get('exitIntentShown')) && !shown) {
        showModal(exit.id)
        shown = true
        if (once) Cookie.set('exitIntentShown', true, expirationDate)
      }
    }, +timer * 1000)
  }
}
