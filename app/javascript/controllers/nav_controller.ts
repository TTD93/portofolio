// Stimulus controller that keeps the sidebar navigation in sync with the
// section the user is currently reading.
//
// HTML usage:
//   <nav data-controller="nav"
//        data-nav-sections-value='["about","cv","work","stack","contact"]'>
//     <a href="#about" data-nav-target="link">about</a>
//     ...
//   </nav>
//
// An IntersectionObserver watches each section. When a section crosses the
// "active band" (the vertical middle of the viewport) its matching nav link
// receives the "active" CSS class; all others lose it.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // "link" targets are all <a> elements inside the nav that should receive the
  // "active" class when their destination section is in view.
  static targets = ["link"]

  // "sections" is an ordered list of section IDs that correspond 1-to-1 with
  // the nav links (by href="#id" convention).
  static values  = { sections: Array }

  declare linkTargets: HTMLAnchorElement[]
  declare sectionsValue: string[]

  // Kept as an instance variable so we can disconnect() it cleanly.
  private observer: IntersectionObserver | null = null

  // Stimulus lifecycle: called once the nav element is in the DOM.
  connect() {
    // Resolve IDs to actual DOM elements, silently skipping any that don't
    // exist yet (defensive — all sections should be present on page load).
    const sections = this.sectionsValue
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // rootMargin shrinks the "intersection zone" so only the section that
    // occupies the middle band of the viewport counts as active.
    //   -40% from the top  → section must be below the top 40% of the viewport
    //   -55% from the bottom → section must be above the bottom 55%
    // This leaves a 5% band roughly centred on the screen, preventing two
    // sections from being "active" at the same time during slow scrolls.
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id

            // Toggle "active" on every link: on for the matching one, off for the rest.
            this.linkTargets.forEach(a => {
              a.classList.toggle("active", a.getAttribute("href") === `#${id}`)
            })
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    sections.forEach(s => this.observer!.observe(s))
  }

  // Stimulus lifecycle: called when the nav is removed from the DOM.
  // Disconnecting the observer prevents memory leaks and stale callbacks
  // if Turbo replaces the page without a full reload.
  disconnect() {
    this.observer?.disconnect()
  }
}
