// Stimulus controller for the mobile navigation drawer.
//
// HTML usage:
//   <!-- Controller lives on the topbar wrapper so it can reach both the
//        burger button and the off-canvas sheet as siblings. -->
//   <div data-controller="mobile-menu">
//
//     <!-- Burger button — triggers open() -->
//     <button data-action="click->mobile-menu#open">☰</button>
//
//     <!-- Sliding drawer — identified as the "sheet" target -->
//     <div data-mobile-menu-target="sheet">
//       <button data-action="click->mobile-menu#close">✕</button>
//       <nav>...</nav>
//     </div>
//   </div>
//
// Opening adds the "open" CSS class to the sheet (which slides it into view
// via a CSS transform transition) and locks the page scroll so the background
// content doesn't drift while the drawer is visible.
// Closing reverses both changes.
// Nav links inside the drawer call close() directly via data-action so the
// drawer dismisses itself when the user taps a destination.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // The off-canvas drawer element. Stimulus resolves this from the DOM
  // via the data-mobile-menu-target="sheet" attribute.
  static targets = ["sheet"]

  declare sheetTarget: HTMLElement

  // Slide the drawer into view and prevent the page from scrolling behind it.
  open() {
    this.sheetTarget.classList.add("open")
    document.body.style.overflow = "hidden"
  }

  // Slide the drawer back out and restore normal page scrolling.
  close() {
    this.sheetTarget.classList.remove("open")
    document.body.style.overflow = "" // reset to stylesheet default
  }
}
