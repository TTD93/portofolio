// Entry point for the JavaScript bundle (compiled by esbuild via jsbundling-rails).
// Imported by the <script> tag in app/views/layouts/application.html.erb.

// Turbo intercepts link clicks and form submissions, swapping only the <body>
// instead of doing a full page load — gives SPA-like speed with zero client router.
import "@hotwired/turbo-rails"

// Stimulus is a lightweight framework that wires JS behaviour to HTML via
// data-controller / data-action / data-target attributes.
// Application.start() scans the document for data-controller attributes and
// instantiates the matching controller class automatically.
import { Application } from "@hotwired/stimulus"

import TypingController     from "./controllers/typing_controller"
import NavController        from "./controllers/nav_controller"
import MobileMenuController from "./controllers/mobile_menu_controller"

const app = Application.start()

// Register each controller under the identifier used in HTML data-controller
// attributes. The string here must match exactly.
app.register("typing",      TypingController)   // hero typewriter effect
app.register("nav",         NavController)      // sidebar active-link tracking
app.register("mobile-menu", MobileMenuController) // mobile drawer open/close
