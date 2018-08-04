@cucurbit @success
Feature: Passing feature

    As a user of cucurbit
    I should be able to run passing tests :)

    Scenario: Fetching todo 1
        When I GET https://jsonplaceholder.typicode.com/todos/1
        Then response status code should be 200

    Scenario: Fetching todo 2
        When I GET https://jsonplaceholder.typicode.com/todos/2
        Then response status code should be 200

    Scenario: Fetching todo 3
        When I GET https://jsonplaceholder.typicode.com/todos/3
        Then response status code should be 200

    Scenario: Fetching todo 4
        When I GET https://jsonplaceholder.typicode.com/todos/4
        Then response status code should be 200

    Scenario: Fetching todo 5
        When I GET https://jsonplaceholder.typicode.com/todos/5
        Then response status code should be 200
