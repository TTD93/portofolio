Feature: Mobile menu
  As a visitor on a small screen
  I want to open and close the mobile menu
  So that I can navigate without a sidebar

  Background:
    Given I am on the portfolio homepage

  Scenario: The mobile drawer is hidden by default
    Then the mobile sheet should be hidden

  Scenario: Opening the mobile menu shows the nav links
    When I open the mobile menu
    Then the mobile sheet should be visible
    And I should see the mobile link "about"
    And I should see the mobile link "contact"

  Scenario: Closing the mobile menu hides the sheet
    When I open the mobile menu
    And I close the mobile menu
    Then the mobile sheet should be hidden
