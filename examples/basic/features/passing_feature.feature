@cucurbit @success
Feature: Passing feature

    As a user of cucurbit
    I should be able to run passing tests :)

    Scenario: Running passing test
        When I GET https://jsonplaceholder.typicode.com/todos/1
        Then response status code should be 200
