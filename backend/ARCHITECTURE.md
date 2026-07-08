# Backend Architecture Rules

## Module Structure

Every module must follow this layout:

module/
├── __init__.py
├── router.py
├── service.py
├── repository.py
├── schemas.py
└── events.py

## Responsibilities

router.py
- HTTP endpoints only
- Request validation
- Response formatting
- No business logic

service.py
- Business logic
- Coordinates repositories
- Emits events
- No HTTP code
- No SQL

repository.py
- Data access contract only
- No business logic

schemas.py
- Data contracts
- Request/response models
- Domain DTOs

events.py
- Event definitions
- No event bus implementation

## Rules

- Modules must not directly import other modules.
- Cross-module communication happens through services or events.
- Every business entity is tenant-scoped.
- Business logic never belongs in routers.
- Repositories define contracts only until the Database phase.
