---
layout: main
title: Currency Watchlist & Alert Service
---

# Currency Watchlist & Alert Service

A system that allows users to create currency watchlists, add currency pairs, fetch latest exchange rates from a public external API, store rate snapshots, create alert rules, evaluate alerts, and view this information in a simple React frontend. Built with .NET Core Web API, SQLite with EF Core, and React - containerised with Docker Compose.

#### Architectural Decisions

**Backend**
- Layered Architecture (Controller → Service → EF Core)
- DTOs for API Contracts
- Rate Provider Abstraction (`IExchangeRateService`)
- Input Validation via Data Annotations on DTOs
- Async/Await Throughout

**Frontend**
- React Functional Components + Hooks
- Axios for API Communication
- Client-Side Validation Before API Calls
- Dropdown Selector for Alert Currency Pairs
- Recharts for Chart Visualisation

**Infrastructure & Testing**
- Docker Compose with Multi-Stage Builds
- Backend Tests: xUnit + Moq + EF Core InMemory
- Frontend Tests: Vitest + React Testing Library

**Production Considerations**
- Implement a background job that refreshes rates on a schedule (e.g. every minute), keeping data fresh so the UI can query rates directly without triggering its own external API call
- Implement authentication and user isolation on API endpoints - currently any user can edit any watchlists
- SQLite would be replaced with PostgreSQL or similar for concurrency and scalability
- Implement rate limiting on incoming requests or outgoing external API calls
- Implement stricter CORS policy
- Implement logging or error monitoring
- Handle external API call rejections
- Remove database migrations from startup and implement rollback strategy
- Add managed configuration
- Add pagination to list endpoints
- Validate currency codes against the ISO codes list

[View on GitHub](https://github.com/dmitriylogunov/currency-watchlist)

[View online](https://currency-watchlist.onrender.com)

{% include gallery.html data=site.data.cw %}
