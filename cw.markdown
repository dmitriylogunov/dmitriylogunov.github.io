---
layout: main
title: Currency Watchlist
---

A full-stack app for tracking currency exchange rates. Create watchlists, add currency pairs, fetch live rates, and set alert rules. Built with a .NET Core API backend, React frontend, and SQLite database — all running in Docker.

The backend follows a layered architecture with thin controllers, a service layer for business logic, and DTOs for API contracts. Exchange rates are fetched from the Frankfurter API and cached locally. The frontend uses React with functional components and hooks, with Axios for API communication.

[View on GitHub](https://github.com/dmitriylogunov/currency-watchlist)

{% include gallery.html data=site.data.cw %}
