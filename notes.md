Hexagonal Architecture:

- Separate the application into different domains.
- Have a single directory for each core domain model.

eg:

## User domain

- This is where we will have any user based functionality that acts on user entity
- 4 key components:

1. Application

- This will keep underlying `ports` and `use cases`
  - `ports`
    are the abstract interfaces that defines how the outside world will interact with the domain
    these are just going to interfaces
  - `use cases`
    really just an orchestration layer to actually make use of a given `port` through an `adapter` and execute the functionality on that as well as creating and managing domain models

2. Domain

- This is where we keep underlying domain models
- These are gonna be classes that make up the domain which includes:
  - `entities`
    Has an identity that persisted over time regardless of changes to their attributes
    These are mutable, there attribute can change during the life cycle. eg: a user, a user always going to be the same user even if there underlying properties change (name, email, etc). They gonna have a core identity that persists over time.
    These are gonna be classes where business logic of the domain is actually implemented. So these classes will have functions that represent the business logic and the data around it.
  - `value objects`
    They don't have and identity that persists over time, they are immutable

3. Infrastructure

This is where we keep `adapters` that actually implement the `ports`

- `adapters`
  These are the concrete implementations of the `ports`

4. Presentation

This is where we keep the `controllers` that actually handle the requests from the client and return the responses

---

## Process

Normally Starts with defining the `entity` and `value objects`

### `value objects` creation

They are classes that represent a value that is not an entity and does not have an identity that persists over time.

eg: Email, UserId

These can have there own validation logic and business logic. inside the class itself.

### `entity` creation

They are classes that represent an entity that has an identity that persists over time.

eg: User

Starts with constructor which got `private` (can be `readonly` or not depending on the use case) properties as the attributes of the entity.
These can be `value objects` or `other entities` or `primitives` or `other objects`
A static method for creating the entity. eg: `create`
Getters for the attributes. eg: `getId`, `getName`, `getEmail`, `getCreatedAt`, `getUpdatedAt`
Update methods for the attributes with validation logic. eg: `updateName`, `updateEmail`
Business logic methods. eg: `getAccountAge`

Now that we encapsulated the business logic inside the entity, we can now start creating the `ports`

### `ports` creation

Here we define all of the methods that we need exists in this external dependency. eg: `save`, `findById`, `findByEmail`, `findAll`, `delete`
These are just going to interfaces
Add a token value using `Symbol` so that we can inject the `port` into the `use case`

### `adapters` creation

This will be any implementation of the `ports` that actually implements the functionality. This is mostly going to be interacting with the database/ORMs.
These are `@Injectable` classes

### `module` creation for the domain

This will be a `@Module` class
Have to link the `ports` and `adapters` with using `token` and wire up to the nestjs application

### `use cases` creation

These will use the `ports` to call the functionality from the `adapters` and execute the business logic

### `controllers` creation

These will use the `use cases` to call the functionality from the `application` and execute the business logic
These will be `@Controller` classes
