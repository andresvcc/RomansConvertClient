import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import LogRocket from 'logrocket';
import initialStateJson from './initalState';

let store;

const exampleInitialState = initialStateJson;

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  const temp = state;
  if (action.state && action.value) {
    temp[`${action.state}`] = action.value;
  }
  return {
    ...temp
  };
};

function makeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    // composeWithDevTools(applyMiddleware(LogRocket.reduxMiddleware()))
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let xStore = store ?? makeStore(preloadedState);
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    xStore = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return xStore;
  // Create the store once in the client
  if (!store) store = xStore;

  return xStore;
};

export function useStore(initialState) {
  return initializeStore(initialState);
}
