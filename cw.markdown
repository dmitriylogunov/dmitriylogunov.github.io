---
layout: main
title: Currency Watchlist
---

A system that allows users to create currency watchlists, add currency pairs, fetch latest exchange rates from a public external API, store rate snapshots, create alert rules, evaluate alerts, and view this information in a simple React frontend. Built with .NET Core Web API, SQLite with EF Core, and React - containerised with Docker Compose.

#### Architectural Decisions

**Backend**
- Layered Architecture (Controller → Service → EF Core)
- DTOs for API Contracts
- Rate Provider Abstraction (`IExchangeRateService`)
- `AlertEvent` Entity for Evaluation History
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

[View on GitHub](https://github.com/dmitriylogunov/currency-watchlist)
[View online](https://currency-watchlist.onrender.com)

{% include gallery.html data=site.data.cw %}
