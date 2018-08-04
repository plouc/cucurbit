@cucurbit @failure
Feature: Failing feature

  As a user of cucurbit
  I should be able to run failing tests :)

  Scenario: Running failing test
    When I GET https://jsonplaceholder.typicode.com/crap
    Then response status code should be 200
