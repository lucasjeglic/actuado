const el = document.getElementById('notification') // Get the notification element

// Store the Module settting in JS
let startDelay = parseInt(el.getAttribute('data-start'))
let showTime = parseInt(el.getAttribute('data-show'))
let delay = parseInt(el.getAttribute('data-delay'))
let delayMin = parseInt(el.getAttribute('data-delaymin'))
let delayMax = parseInt(el.getAttribute('data-delaymax'))
let delayRand = el.getAttribute('data-random')

// Check the type and fire the appropriate function
// passing boolean delayRand to determine whether the delay is random or not
switch (el.getAttribute('data-type')) {
  case 'conversion':
  case 'review':
    build(delayRand)
    break
  case 'countdown':
    countdown(delayRand)
    break
  case 'email':
  case 'information':
  case 'social':
    show(delayRand)
    break
}

// Dynamically build the notification box
// for conversion and reviews options
function build (random) {
  var objArray = []
  var buildobjArray = (function () {
    for (key in objects) {
      if (objects.hasOwnProperty(key)) {
        objArray.push(objects[key])
      }
    }
  })()

  // Method to use to loop to get the next object
  var displayNotifications = {
    max: objArray.length,
    current: 0,
    timeout: null,
    go: function () {
      let rand = 0

      // if delayRand was true or not
      if (random == 'true') {
        rand = showTime + Math.floor(Math.random() * (delayMax - delayMin + 1) + delayMin) // Set rand to a random number between the min and max
      } else {
        rand = showTime + delay // Set rand to the showTime
      }

      this.current = Math.floor(Math.random() * objArray.length)

      update(objArray[this.current]) // update function used to update the HTML in the box

      showEl(el) // Show the notification box

      // Hide the notification box after the showTime has passede
      setTimeout(function () {
        hideEl(el) // Hide the notification box
      }, showTime * 1000)

      // Start displayNotifications with the set rand delay
      this.timeout = setTimeout(function () {
        displayNotifications.go()
      }, rand * 1000)
    }
  }

  // Start displayNotifications with the set delay
  setTimeout(function () {
    displayNotifications.go()
  }, startDelay * 1000)
}

// Show the notification box
// for email, information and social options
function show () {
  setTimeout(function () {
    showEl(el)

    if (showTime) {
      setTimeout(function () {
        hideEl(el)
      }, showTime * 1000)
    }
  }, startDelay * 1000)
}

// Start the countdown and show the notification box
// for the countdown option
function countdown (random) {
  // Set the date we're counting down to
  var countDownDate = new Date(document.getElementById('countdown-date').getAttribute('data-date')).getTime()

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Update the notification box countdown
    document.getElementById('d').innerHTML = days
    document.getElementById('hr').innerHTML = hours
    document.getElementById('min').innerHTML = minutes
    document.getElementById('sec').innerHTML = seconds
  }, 1000)

  show() // Show the notification box
}

// Function for updating the notification box HTML
function update (obj) {
  // Grab all the elements
  let title = el.querySelector('.notification-title')
  let description = el.querySelector('.notification-description')
  let image = el.querySelector('.notification-image')
  let time = el.querySelector('.notification-time')
  let client = el.querySelector('.notification-client')
  let stars = el.querySelector('#review-stars')
  let linked = el.querySelector('.linked')

  // Check whether the elements exsist or not
  // and update them accordingly

  if (title) {
    title.innerHTML = obj.title
  }
  if (description) {
    description.innerHTML = obj.description
  }
  if (image) {
    image.src = obj.image.src
    image.width = obj.image.width
  }
  if (time) {
    time.innerHTML = obj.time
  }
  if (client) {
    client.innerHTML = obj.client
  }
  if (stars) {
    stars.setAttribute('class', 'stars-' + obj.stars)
  }
  if (linked && obj.enable_link) {
    linked.href = obj.link.url.href
  }
  if (el.querySelector('.linked')) {
    if (el.querySelector('.linked').getAttribute('href')) {
      el.classList.add('linked')
    } else {
      el.classList.remove('linked')
    }
  }
}

// Function to show the notification box
function showEl (i) {
  i.classList.add('show')
  i.classList.remove('hide')
}

// Function to hide the notification box
function hideEl (i) {
  i.classList.add('hide')
  i.classList.remove('show')
}
