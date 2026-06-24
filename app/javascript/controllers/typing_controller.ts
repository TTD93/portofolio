// Stimulus controller that drives the terminal-style typewriter effect in the hero section.
//
// HTML usage:
//   <span data-controller="typing"
//         data-typing-words-value='["Tin Trung Duong","a Software Engineer"]'>
//   </span>
//
// The element's text content is rewritten character by character. A blinking
// caret is rendered separately in CSS (sibling .caret element), so this
// controller only manages the visible text — no cursor injection needed here.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // "words" is declared as an Array value so Stimulus deserialises the JSON
  // string from data-typing-words-value automatically.
  static values = { words: Array }

  declare wordsValue: string[]

  // Cursor position within the current word (how many chars are shown).
  private charIndex = 0

  // Which word in the array we are currently typing.
  private wordIndex = 0

  // True while we are erasing the current word character by character.
  private deleting = false

  // Handle for the pending setTimeout so we can cancel it on disconnect.
  private timer: ReturnType<typeof setTimeout> | null = null

  // Stimulus lifecycle: called when the controller element appears in the DOM.
  // Kick off the animation loop immediately.
  connect() {
    this.tick()
  }

  // Stimulus lifecycle: called when the controller element is removed from the DOM
  // (e.g. Turbo replaces the page). Prevents the timer from firing into the void
  // and causing "can't set property of removed element" errors.
  disconnect() {
    if (this.timer) clearTimeout(this.timer)
  }

  // Core animation step. Called recursively via setTimeout.
  // Each call renders one character change (add or remove) then schedules
  // the next call with an appropriate delay to create the illusion of typing.
  private tick() {
    const word = this.wordsValue[this.wordIndex]

    // Write only the visible slice of the word into the element.
    this.element.textContent = word.slice(0, this.charIndex)

    if (!this.deleting) {
      // ── Typing phase ──────────────────────────────────────────────────────
      this.charIndex++

      if (this.charIndex > word.length) {
        // Whole word is now visible. Pause before starting to erase.
        this.deleting = true
        this.timer = setTimeout(() => this.tick(), 1400) // 1.4 s reading pause
        return
      }
    } else {
      // ── Erasing phase ─────────────────────────────────────────────────────
      this.charIndex--

      if (this.charIndex < 0) {
        // Word is fully erased. Advance to the next word and start typing again.
        this.deleting  = false
        this.wordIndex = (this.wordIndex + 1) % this.wordsValue.length
        this.charIndex = 0
      }
    }

    // Erasing is faster than typing to keep the animation snappy.
    this.timer = setTimeout(() => this.tick(), this.deleting ? 40 : 80)
  }
}
