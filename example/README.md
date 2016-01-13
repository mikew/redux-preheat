# redux-preheat example

## Getting Started

```bash
npm install
gulp parched-clean && gulp parched-watch
```

## Points of Interest

- `server/renderWithReact.js`

  The main Express view handler, uses `getPreheatPromise`.

- `app/scripts/components/Todos.js`

  Uses `@preheat` to fetch some data on the client or server.

- `server/todos/`

  Redux actions and reducer.

- `app/scripts/index.js`

  The entrypoint for the client app. Uses the initial state from
  `getPreheatPromise`.
