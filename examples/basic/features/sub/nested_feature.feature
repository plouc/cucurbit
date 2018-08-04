@cucurbit @success @nested
Feature: Sub directories

    As a user of cucurbit
    I should be able to use sub directories

    Scenario: Running nested feature
        When I GET https://jsonplaceholder.typicode.com/todos/1
        Then response status code should be 200
