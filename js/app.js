/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/*

PERSONAL NOTES

Usability: All features are usable across modern desktop, tablet, and phone browsers. - DONE
Styling: Styling has been added for active states.  - DONE
HTML Structure: There are at least 4 sections that have been added to the page.  - DONE

LANDING PAGE BEHAVIOUR
Navigation: Navigation is built dynamically as an unordered list. - DONE
Section Active State: It should be clear which section is being viewed while scrolling through the page  - DONE
Scroll to Anchor: When clicking an item from the navigation menu, the link should scroll to the appropriate section.   - DONE

DOCUMENTATION
README: The ReadMe file should have non-default text in it that is specific to this project. It doesn’t have to be thorough, but should have some basic information, and use correct markdown. 
Comments: Comments are present and effectively explain longer code procedure when necessary.   - DONE
Code Quality: Code is formatted with consistent, logical, and easy-to-read formatting as described in the Udacity JavaScript Style Guide. http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html

SUGGESTIONS TO N+MAKE YOUR PROJECT STAND OUT
1. Add an active state to your navigation items when a section is in the viewport.   - DONE
2. Hide fixed navigation bar while not scrolling (it should still be present on page load). - DONE
        Hint: setTimeout can be used to check when the user is no longer scrolling.
3.Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page. - DONE
4. Update/change the design/content.  - DONE
5. Make sections collapsible.

*/

/**
 * Define Global Variables
 *
 */

const navbar = document.getElementById('navbar__list')
let sections = document.querySelectorAll('section')
const button = document.createElement('button')

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getActiveElem () {
  let sections = document.querySelectorAll('section')

  maxSection = sections[0]
  minVal = document.documentElement.clientHeight

  for (item of sections) {
    let bounding = item.getBoundingClientRect()

    if ((bounding.top > -300) & (bounding.top < minVal)) {
      minVal = bounding.top
      // set section in view
      maxSection = item

      // toggle 'go to top' button
      if (maxSection !== sections[0]) {
        // show
        button.style.display = 'block'
      } else {
        // hide
        button.style.display = 'none'
      }
    }
  }
  return maxSection
}

function showToggle () {
  navbar.style.display = 'block'
}

function stopToggle () {
  navbar.style.display = 'none'
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function addSection () {
  // Count current sections
  let sectionLength = sections.length

  // Get first Section
  const newSection = document.getElementsByTagName('section')[sectionLength - 1]

  // Duplicate section
  const newNode = newSection.cloneNode(true)

  // Change inner header
  newNode.id = `section${sectionLength + 1}`
  newNode.dataset.nav = `Section ${sectionLength + 1}`

  // Change header text
  let innerNewNode = newNode.firstElementChild.firstElementChild
  innerNewNode.textContent = newNode.dataset.nav

  // Get the reference node
  const referenceNode = document.querySelector('#section3')

  // Insert the new node before the reference node
  referenceNode.after(newNode)

  addTopBtn()
}

function addTopBtn () {
  // Create the button
  button.innerHTML = 'Scroll to top'
  button.id = 'myBtn'

  // Append to page
  const body = document.getElementsByTagName('body')[0]
  body.appendChild(button)

  // Add event handler
  button.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })

  buildNav()
}

function buildNav () {
  sections = document.querySelectorAll('section')

  // loop through sections and add navbar items
  for (let item of sections) {
    let section = document.createElement('li')
    section.textContent = item.dataset.nav
    section.dataset.nav = item.id
    section.classList.add('menu__link')
    navbar.appendChild(section)
  }
}

// Add class 'active' to section

let ticking = false

function setActive () {
  window.addEventListener('scroll', function () {
    let section = getActiveElem()
    section.classList.add('active-section')

    // clear all navbar
    for (let item of sections) {
      if ((item.id != section.id) & item.classList.contains('active-section')) {
        item.classList.remove('active-section')
      }
    }

    // set nabar active style
    const active = document.querySelector(`li[data-nav="${section.id}"]`)
    active.classList.add('active__link')

    // clear navbar
    const headers = document.querySelectorAll('.menu__link')
    for (let item of headers) {
      if (
        (item.dataset.nav != active.dataset.nav) &
        item.classList.contains('active__link')
      ) {
        item.classList.remove('active__link')
      }
    }
  })
}

// Scroll to anchor ID using scrollTO event

function respondToClick () {
  // add scrollto function to nav item with smooth transition
  navbar.addEventListener('click', function (event) {
    const clicked = document.querySelector(`#${event.target.dataset.nav}`)
    clicked.scrollIntoView({
      behavior: 'smooth'
    })
  })
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
addSection()

// Scroll to section on link click
respondToClick()

// Set sections as active
setActive()
