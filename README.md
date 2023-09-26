# Feed Me Tech Test

## Technology Choices

* Typescript - Typescript is my current working language so I wanted to show the skills I have developed in learning this language over the last year and a half
* Jest - I used Jest to write my unit tests as I am familiar with its mocking capabilities which really helped when writing tests involving MongoDb Collections  
* MongoDb - MongoDb is completely new to me so I took this opportunity to learn how to use it and what capabilities it has
* I included a Makefile to consolidate the steps to run the application into a single command. This is something I have not used before but wanted to make the user experience as easy as possible

## Completed Tasks

### Basic Tasks

* Create an app that connects the provider service on the exposed TCP port
* Transform the proprietary data format into JSON using the field names and data types defined in the provider /types endpoint
* Write unit tests

### Intermediate Tasks

* Save the JSON into a NoSQL store with a document per fixture. Each document should contain the event data and the child markets and outcomes for the fixture

## Pre-requisites

* Docker
* Docker Compose
* Node

## Running Instructions

To start the app:

* Run docker-compose up -d
* Run Make run

To stop the app:

* CTRL + C
* Run docker-compose down

Email as an attachment or a link the git bundled repository showing your commit history with all your commits on the master branch:

        git bundle create <anything>.bundle --all --branches
