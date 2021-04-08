# Hack The Interview Code Project

## Design doc

### Functional analysis

#### Users

- Admin
- User

#### Features

- As a user, I should be able to:
    - Contact admins and/or devs
    - Login/Logout using Oauth2
    - Consult profile page to see information and progress
    - List all topics, and chose anyone among them
    - See a brief description about the topic and its levels
    - Go through levels from easy to hard, without skipping intermediary levels
    - See a brief description about the level and its questions
    - Answer the question, and see the detailed correct answer
- As an admin, I should be able to:
    - Login/Logout 
    - Manage users
    - Manage topics (levels and questions included)
  
### Technical analysis

#### Database
Relational database : MySQL using JPA and Spring Data Rest

#### Security
Oauth2 (Google) for users and database for admins

#### API
Swagger (Spring boot dependency)

#### Front
ES6 (fetch API, Async await)

#### Unit testing
JUnit 5 (Mockito)

## Useful links

[Trello board](https://trello.com/b/dx0FSFri/hack-the-interview-core-project)