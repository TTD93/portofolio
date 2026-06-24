Feature: Terminal hero section
  As a visitor
  I want to see the terminal-style hero
  So that I get a memorable first impression

  Background:
    Given I am on the portfolio homepage

  Scenario: The terminal window chrome is visible
    Then I should see the terminal window
    And I should see the terminal title "tin-trung-duong"

  Scenario: The whoami command is displayed
    Then I should see the command "whoami"

  Scenario: The caret element is rendered for the typing effect
    Then I should see the typing caret

  Scenario: The CTA row contains the primary action
    Then I should see the link "view products"

  Scenario: The tagline is shown below the command
    Then I should see "from the data model to the pixels"
