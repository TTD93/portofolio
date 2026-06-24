Feature: Portfolio navigation
  As a visitor
  I want to navigate the portfolio sections
  So that I can learn about the developer

  Background:
    Given I am on the portfolio homepage

  Scenario: Sidebar shows the developer identity
    Then I should see "Tin Trung Duong"
    And I should see "available for work"

  Scenario: All five sidebar nav links are present
    Then I should see the sidebar link "about"
    And I should see the sidebar link "experience"
    And I should see the sidebar link "products"
    And I should see the sidebar link "stack"
    And I should see the sidebar link "contact"

  Scenario: Clicking a nav link scrolls to that section
    When I click the sidebar link "contact"
    Then the URL anchor should be "#contact"

  Scenario: The about section has the stats grid
    Then I should see the stat "5+"
    And I should see the stat "12"

  Scenario: The contact section shows the email CTA
    Then I should see the link "tin@costtracker.no"
