Feature: Weather App example

  Background:
    Given I visit path "https://e2e-test-quest.github.io/weather-app/"

  Scenario: Homepage
    # Verify elements on landing page
    Then I should see a title named "Weather App"
    And I should see a button named "Get started"

  Scenario: Weather - "Nothing to display" must be displayed
    # Click on <Get started> button
    When I click on button named "Get started"
    # Check that there's nothing to display because there is no town selected.
    Then I should see a title named "Nothing to display"

  Scenario: Weather - Town List must be ok
    # Click on <Get started> button
    When I click on button named "Get started"
    # Checks the list of available towns.
    Then I should see elements of the list with name "Available Towns"
      | Douala  |
      | Tunis   |
      | Limoges |

  Scenario: TownSelection - Douala
    # Click on <Get started> button
    When I click on button named "Get started"
    # Select Douala town
    And Within a list named "Available Towns"
    And I click on element with role "listitem" and name "Douala"
    # Check the weather details for Douala town
    Then Within the element with aria-label "Weather of Douala"
    And I should see a title named "Douala"
    And I should see an element with content "min: 10.8 °c"

  Scenario: TownResearch
    # Click on <Get started> button
    When I click on button named "Get started"
    # Type sentence "i" on input field
    And Within an text box named "Search for a town"
    And I type the sentence "i"
    And I reset context
    # Click on <Filter> button
    And I click on button named "Filter"
    # Checks the list of available towns.
    Then I should see elements of the list with name "Available Towns"
      | Tunis   |
      | Limoges |