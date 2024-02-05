json-server data/db.json -p 3500

# AsyncThunk VS RTK-Query:

- AsyncThunk: is part of Redux Toolkit, which is a set of tools to simplify Redux development it provides a way to handle asynchronous actions in a Redux store by creating thunk functions.Thunks are functions that can be dispatched to the Redux store, and they can contain asynchronous logic before dispatching actions.AsyncThunk allows you to define asynchronous actions more easily and manage their state in your Redux store.

- RTK-Query: is also part of Redux Toolkit and is designed to streamline data fetching and caching it provides a set of APIs and utilities for defining and executing API requests, as well as caching and normalising the response data in the Redux store.RTK-Query aims to simplify the process of working with remote APIs, and it can automatically generate actions, reducers, and selectors for data fetching.
